import database from "../lib/database.js";
import Items from "../models/Items.js";

export const fetchProduct = async (req, res) => {
  database()

  const productId = req.params.id;
  const product = await Items.findOne({ _id: productId });
  //if seller try to buy own product
  
  res.send(product);
};
