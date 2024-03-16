import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI + process.env.DATABASE_NAME)
      .then(() => console.log("Database connected"))
      .catch((err) => console.log(err.message));
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export default connectDB;
