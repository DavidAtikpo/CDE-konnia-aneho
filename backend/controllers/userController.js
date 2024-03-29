import User from "../models/userModel.js";
import generateRefreshToken from "../dbConfig/refreshToken.js";
import generateToken from "../dbConfig/jwtToken.js"
import nodemailer from "nodemailer"
import jwt  from "jsonwebtoken";

const register = async (req, res) => {
  const { email } = req.body;
  const findexisting = await User.findOne({ email });

  if (findexisting) {
    return res.json({ message: "email already existing" });
  }

  if (req.body.role === "admin") {
    const { password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);
    await User.create(req.body);
    SendEmailOnRegister(email);
    return res.json({ message: "admin created successfully" });
  }

  const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });
  req.body.verificationToken = verificationToken;
  const newUser = await User.create(req.body);
  const VerificationEmail = `http://localhost:8000/user/verify-email/${verificationToken}`;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
    secureConnection: "false",
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Account Verification Link",
    html: `Hello, ${newUser.firstName} Please verify your email by clicking this link :<p><a href="${VerificationEmail}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px;">Email Verification</a></p>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(500).json({ error: true, message: "Failed to send verification email,provide correct email" });
    }
    return res.status(201).json({ message: `${req.body.firstName} created successfully` });
  });
};


const reVerifyUser = async (req, res) => {
  try {
    const { email } = req.body;
    // Create a JWT token for email verification with expiration (1 hour in this example)
    const verificationToken = jwt.sign({ email },process.env. JWT_SECRET, {
      expiresIn: "72h"
    });

    // Save the verificationToken in the database (you might want to store it along with the user record)
    await User.create({
      email,
      verificationToken
    });

    body.verificationToken = verificationToken;
    const newUser = await User.create(body);
    const VerificationEmail = `http://localhost:8000/user/verify-email/${verificationToken}`;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      },
      secureConnection: "false",
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false
      }
    });
    const mailOptions = {
      from: "your email",
      to: email,
      subject: "Account Verification Link",
      html: `Hello, ${newUser.firstName} Please verify your email by clicking this link :<p><a href="${VerificationEmail}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px;">Email Verification</a></p>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.send({ error: false, data: info, message: "OK" });
      }
    });

    res.send("Verification email sent");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending verification email");
  }
};

function SendEmailOnRegister(email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Registration Notice",
    text: "Congratulations on your Registration,"
  };
  try {
    transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    const decode = jwt.verify(token,process.env. JWT_SECRET);

    const founduser = await User.findOne(
       {
        email: decode.email,
        verificationToken: token,
        isVerified: false
      }
    );

    if (!founduser) {
      return res.status(401).json({
        message: "invalid or expired verification token"
      });
    }

    if (founduser.isVerified) {
      return res
        .status(200)
        .json({ message: "User has been already verified. Please Login" });
    }
    const updated = await User.updateOne(
      { 
        isVerified: true, 
        verificationToken: null,
        email: decode.email,
        verificationToken: token
      },
      { 
        $set: { isVerified: true } // Update the isVerified field to true
      }
    );
    if (!updated) {
      return res.status(500).json({ msg: "Unable to verify the account." });
    }
    SendEmailOnRegister(decode.email);
    return res.redirect("http://localhost:5173/login");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};


const loginAdmin = async(req,res)=>{
  const {email,password}= req.body;
  const findAdmin = await User.findOne({email});
  if(findAdmin.role !== "admin") throw new Error("not authoresed")
  if(findAdmin && await findAdmin.isPasswordMatched(password)){
    const refreshToken = await generateRefreshToken(findAdmin?.id)
    const updateuser = await User.findByIdAndUpdate(findAdmin?.id, {refreshToken:refreshToken},{new:true})
    res.cookie('refreshToken',refreshToken,{
      httpOnly:true,
      maxAge:72*60*60*1000,
    })
  res.json({
    _id:findAdmin?._id,
    firstName:findAdmin?.firstName,
    lastName:findAdmin?.lastName,
    mobile:findAdmin?.mobile,
    token:generateToken(findAdmin?._id)

  })
  }else{
    throw new Error("Invalid credentials")
  }
};
const loginUser = async(req,res)=>{
  const {email,password}= req.body;
  const findUser = await User.findOne({email});

  if(findUser && await findUser.isPasswordMatched(password)){
    const refreshToken = await generateRefreshToken(findUser?.id)
    const updateuser = await User.findByIdAndUpdate(findUser?.id, {refreshToken:refreshToken},{new:true})
    res.cookie('refreshToken',refreshToken,{
      httpOnly:true,
      maxAge:72*60*60*1000,
    })
  res.json({
    _id:findUser?._id,
    firstName:findUser?.firstName,
    lastName:findUser?.lastName,
    token:generateToken(findUser?._id)

  })
  }else{
    throw new Error("Invalid credentials")
  }
};
// admin will get all users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}, 'firstName profilePicture'); // Retrieve only the firstName and profilePicture fields
    res.json(allUsers);
  } catch (error) {
    throw new Error(error);
  }
};

//user can update 

const updateUser = async(req,res)=>{
const userId=req.user.id;
try {
  const updateuser = await User.findByIdAndUpdate(userId,req.body,{new:true})
  res.json(updateuser)

} catch (error) {
  throw new Error(error)
}
};




export default { register, loginUser,verifyEmail,reVerifyUser,loginAdmin,getAllUsers,updateUser };
