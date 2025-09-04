import bufferToUrl from "../lib/cloudinary.js";
import database from "../lib/database.js";
import Items from "../models/Items.js";

export const sellItem = async (req, res) => {
  const {
    "product-name": productName,
    "product-category": productCategory,
    "product-freshness": productFreshness,
    "product-desc": productDesc,
    "product-price": productPrice,
  } = req.body;
  const files = req.files;
   const images = await Promise.all(
    files.map((file) => bufferToUrl(file))
  );
  database();
  const newProduct = new Items({
    title:productName,
    description:productDesc,
    price:productPrice,
    freshness:productFreshness,
    category:productCategory,
    images:images,
    seller:req.user._id,

  })
  await newProduct.save()
  res.send({ status:200 ,message:"Product successfully listed for sell." });
};
