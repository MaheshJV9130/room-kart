import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  number:{type:String},
  hash : {type : String},
  hostel: String, 
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  otp: {type:Number , default:null},
  otpExp : {type:Date , default:null}
});

export default mongoose.models.User || model("User", userSchema);
