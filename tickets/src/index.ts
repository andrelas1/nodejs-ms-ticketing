import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is not defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO URI must be provided");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("CONNECTED TO MONGODB");
  } catch (e) {
    console.error("Can not connect to mongodb");
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();
