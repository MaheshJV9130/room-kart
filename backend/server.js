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
app.use('/auth', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store'); // Disable caching
  next();
});
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: 'https://roomkart.vercel.app',  
    credentials: true 
  })
);

app.get("/", (req, res) => {
  res.send("Hello World...!");
});
app.use("/auth", auth);
app.use("/item", items);
app.listen(8080, () => {
  console.log("Server Started");
});
