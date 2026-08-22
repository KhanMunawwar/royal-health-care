import mongoose from "mongoose";

export const connectDatabase = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
};

export const disconnectDatabase = async () => {
  await mongoose.connection.close();
};
