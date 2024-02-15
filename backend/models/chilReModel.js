import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:tue
    },
    lastName:{
        type:String,
        required:true
    },
    nativeDate:{
         type:Date,
         required:true,
    },
    lieuDeNaissance:{
        type:String,
        required:true,
    },
    classe:{
        type:String,
        required:true,
    },
    nomDuPere:{
        type:String,
        required:true,
    },
    nomDeLaMere:{
        type:String,
        required:true,
    },
    telephone:{
       type:Number,
       required:true,
    },
    dateentree:{
        type:Date,
        required:true,
    }


},{timestamps:true})

export default mongoose.model('Child',userSchema)