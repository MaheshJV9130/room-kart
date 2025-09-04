import mongoose from "mongoose";
import colors from "@colors/colors";
const database = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connected".green);
  } catch (error) {
    console.log(colors.red(error));
  }
};

export default database;
