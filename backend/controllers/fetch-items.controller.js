import database from "../lib/database.js"
import Items from "../models/Items.js"

export const fetchItems = async (req , res) => {
  database()
  const items = await Items.find({})
  if(items){
    res.send({status:200 ,data:items})
  }else{
    res.send({status:404 , message:"No products found"})
  }
}
