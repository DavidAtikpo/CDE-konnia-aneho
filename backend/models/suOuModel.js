import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    setTimeout:{
        type:Date,
        required:true
    },
    Objectif:{
        type:Boolean,
        require:false
    },
    Comment:{
        type:String,
        require:true
    },
    fieldBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
})
export default mongoose.model("Out", userSchema)