import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to database: ", con.connection.host);
  } catch (error) {
    console.error("Error connecting to database: ", error.message);
  }
};
