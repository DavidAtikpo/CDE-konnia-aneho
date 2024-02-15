import Enter from "../models/suEnModel.js";
import Out from "../models/suOuModel.js";
import User from "../models/userModel.js";
import validateMongoDbId from "../utils/validateMongodbid.js";
// User will create the time he comes to service for the objective of the day
const incoming = async (req, res) => {
  const user = req.user; // Assuming the user object is available in the request

  try {
    if (!user) {
      return res.status(401).json({ message: "Please log in before filling this form" });
    }

    const fieldBody = {
      ...req.body,
      postedBy: user._id,  // Save the user's ID as a reference in the "Enter" model
      //firstName: user.firstName 
    };

    const newEntry = await Enter.create(fieldBody);
    res.json({ entry: newEntry, user: user.firstName });
  } catch (error) {
    console.error("Error creating new entry:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// User will create the time he leaves the service and adds a comment
// User will create the time he leaves the service and adds a comment
const userOut = async (req, res) => {
    const user = req.user;
    try {
      const findUser = await User.findById(user.id);
      if (!findUser) {
        res.json({ message: "Please log in before filling this form" });
      } else {
        const { objectivesDone } = req.body;
        if (objectivesDone) {
          findUser.objectivesDone = true;
        } else {
          findUser.objectivesDone = false;
        }
        await findUser.save();
        const fieldBody = await Out.create(req.body);
        res.json(fieldBody);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  

// the user will get recently objective he posted 
const getObjectives = async (req, res) => {
    const user = req.user;
    try {
      const getObjective = await Enter.findOne({ userId: user.id }).sort({ createdAt: -1 });
      res.json(getObjective);
    } catch (error) {
      throw new Error(error);
    }
  };
  
// admin will get all the incoming and out for all the user was posted
const getUserIcoming = async(req,res)=>{
    try {
        const getincome = await Enter.find()
        console.log("####",getincome);
        res.json(getincome)
    } catch (error) {
       throw new Error(error) 
    }
}

export default {incoming,userOut,getObjectives,getUserIcoming}