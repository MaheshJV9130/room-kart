import express from "express";
import { register } from "../controllers/register.controller.js";
import { logout } from "../controllers/logout.controller.js";
import { me } from "../controllers/me.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { login } from "../controllers/login.controller.js";
import { sellItem } from "../controllers/sell-items.controller.js";

const router = express.Router();
router.post('/login',login)
router.post("/register", register);
router.get("/me",verifyJWT,me)
router.get("/logout",logout)

export default router;
