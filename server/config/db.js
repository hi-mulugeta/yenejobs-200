import mongoose from "mongoose";

//function to connect to mongoDb database
const connectDB = async () => {
  mongoose.connection.on("connected", () =>
    console.log("MongoDB connected successfully")
  );
  await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`);
};

export default connectDB;
