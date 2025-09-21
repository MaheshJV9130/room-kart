import database from "../lib/database.js";
import Items from "../models/Items.js";

export const search = async (req, res) => {
  const searchTerm = req.query.q;
  database();
  
  try {
    const products = await Items.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } }
      ]
    });
    res.send({ data: products });
  } catch (error) {
    res.status(500).send({ message: "An error occurred during the search." });
  }
};
