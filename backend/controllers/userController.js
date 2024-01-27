import User from "../models/userModel.js";
import twilio from 'twilio';

const accountSid = 'ACf39b0bd09ff2cc10d9ef8d97bfffb4cb';
const authToken = 'f6af17d14ee5aca48c8ea3a2fa8609e4';
const twilioPhoneNumber = '+1 510 454 8964 ';

const twilioClient = twilio(accountSid, authToken);

const register = async (req, res) => {
console.log(register);
  try {
    const user = req.body;
    const mobile = user.mobile;

    // Check if user already exists with the provided mobile number
    const findByMobile = await User.findOne({ where: { mobile: mobile } });

    if (findByMobile) {
      return res.status(400).json("User with this mobile number already exists.");
    }

    // Generate a random verification code (you may want to implement your own logic)
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Save the verification code in the user document
    user.verificationCode = verificationCode;

    // Save the user in the database
    const addUser = await User.create(user);

    // Send the verification code via SMS
    await twilioClient.messages.create({
      body: `Your verification code is: ${verificationCode}`,
      from: twilioPhoneNumber,
      to: `+${mobile}`
    });

    return res.status(200).json(`Registration successful. Verification code sent to ${mobile}.`);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
};

const loginUser = async (req, res) => {
  try {
    const { code, mobile } = req.body;

    // Retrieve the user from the database based on the mobile number
    const user = await User.find({ where: { mobile: mobile } });

    if (!user) {
      return res.status(400).json("User not found. Please register first.");
    }

    // Check if the provided code matches the stored verification code
    if (user.verificationCode !== code) {
      return res.status(400).json("Invalid verification code.");
    }

    // Code is valid, proceed with your login logic here

    return res.status(200).json("Login successful");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
};

export default { register, loginUser };
