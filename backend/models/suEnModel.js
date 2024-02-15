
import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    TimeRanges:{
        type:Date,
        required:true
    },
    objectif :{
        type:String,
        require:true,
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
});

export default mongoose.model("Enter",userSchema)