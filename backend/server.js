import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import auth from "./routes/User.js";
import items from "./routes/Items.js";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { verifyJWT } from "./middleware/verifyJWT.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, "/.env");

configDotenv({
  path: envPath,
});
const app = express();
cloudinary.config({
  cloud_name: process.env.CLD_NAME,
  api_key: process.env.CLD_API_KEY,
  api_secret: process.env.CLD_API_SECRET,
});
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  "http://localhost:3000",
  "https://roomkart.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const cleanOrigin = origin.replace(/\/$/, "");
      if (allowedOrigins.includes(cleanOrigin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World...!");
});
app.get("/test-cookie", (req, res) => {
  res.cookie("session", "TEST123", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  res.send("cookie set");
});
app.use("/auth", auth);
app.use("/item", items);
app.listen(8080, () => {
  console.log("Server Started");
});
