import { Schema , mongoose} from "mongoose";

const itemSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  freshness:String,
  category: String,
  images: [{ type: String }],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Item || mongoose.model("Item", itemSchema);
