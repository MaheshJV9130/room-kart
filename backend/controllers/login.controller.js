import database from "../lib/database.js";
import { getJWT } from "../lib/jwt.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const isProd = process.env.NODE_ENV === "production";
  database();
  const user = await User.findOne({
    email: email,
  });

  if (user) {
    const correct = await bcrypt.compare(password, user.hash);
    if (correct) {
      const token = getJWT({
        _id: user._id,
        name: user.name,
        email: email,
        hostel: user.hostel,
      });
      res.cookie("session", token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      res.json({ status: 200, message: "Welcome" });
    } else {
      res.json({ status: 404, message: "Password is incorrect" });
    }
  } else {
    res.json({ status: 404, message: "User not found" });
  }
};
