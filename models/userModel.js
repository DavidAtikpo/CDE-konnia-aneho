import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
firstname :{
  type:String,
  require:true,
},
lastname:{
  type:String,
  require:true,
},
mobile:{
  type:String,
  require:true,
}
},{timestamps:true})

export default mongoose.model("User", userSchema)