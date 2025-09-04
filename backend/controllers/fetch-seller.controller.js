import database from "../lib/database.js";
import User from "../models/User.js";


export const fetchSeller = async (req , res) => {
  const {sellerId} = req.body;
  database()
  const seller = await User.findById(sellerId).select("name number hostel");
  
  res.send(seller)
  
}
