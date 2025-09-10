import { hashConverter } from "../lib/bcrypt.js";
import database from "../lib/database.js";
import { getJWT } from "../lib/jwt.js";
import { otpGen } from "../lib/otp-gen.js";
import User from "../models/User.js";

export const register = async (req, res) => {
  database();
  const { name, email, password, hostel, number } = req.body;
  const isProd = process.env.NODE_ENV === "production";
  // checking for user(email) is already in db;

  const alreadyUser = await User.findOne({
    email: email,
  });
  if (alreadyUser) {
    // sending error
    res.json({
      status: 404,
      message: "Email is already registered , Go to login page",
    });
  } else {
    // then send otp to email
    const OTP = otpGen();
    const OTPEXP = Date.now() + 5 * 60 * 1000;
    const hash = await hashConverter(password);

    // store otp in db
    const newUser = new User({
      name: name,
      email: email,
      number: number,
      hash: hash,
      hostel: hostel,
      otp: OTP,
      otpExp: OTPEXP,
    });
    // new user save to db
    await newUser.save();
    const token = getJWT({
      _id: newUser._id,
      name: name,
      email: email,
      hostel: hostel,
    });

    res.cookie("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      domain: ".vercel.app",
    });
    res.json({ status: 200, message: "Welcome" });
  }
};
