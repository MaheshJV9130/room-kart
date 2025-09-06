import database from "../lib/database.js"
import Items from "../models/Items.js"

export const fetchListings = async(req , res) => {
  database()
  const listing = await Items.find({seller : req.user._id})
  res.send(listing)
}
