import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    TimeRanges:{
        
    },
    setTimeout:{

    },
    objectif :{
        type:String,
        require:true,
    },
    Comment:{
        type:String,
        require:true
    },
    doneAndNotDone:{
        type:Boolean,
        require:false
    },
    user_i:{
        
    }
});

export default mongoose.model("post",userSchema)