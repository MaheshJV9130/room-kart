import express from 'express';
import { sellItem } from '../controllers/sell-items.controller.js';
import multer from "multer";
import { fetchItems } from '../controllers/fetch-items.controller.js';
import { fetchProduct } from '../controllers/fetch-product.controller.js';
import { fetchSeller } from '../controllers/fetch-seller.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
const upload = multer()
const router = express.Router()

router.post("/sell-item",verifyJWT,upload.array("productImages",3),sellItem)
router.get("/fetch-items",fetchItems)
router.get("/product/:id",fetchProduct)
router.post("/seller",fetchSeller)
export default router