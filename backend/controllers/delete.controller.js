import database from "../lib/database.js"
import Items from "../models/Items.js";

export const deleteProduct = async(req , res) => {
  database()
  
  const {productId} = req.body;
  const deletedProduct = await Items.deleteOne({_id:productId});  
  res.send({status:200 , message:"Product deleted"})
}
