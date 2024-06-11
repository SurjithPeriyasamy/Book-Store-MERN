import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import { getAllBooks } from "./controllers/bookController.js";
import userRoute from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";

const app = express();
configDotenv();
const port = process.env.PORT;
//Middleware for parsing request body
app.use(express.json());
app.use(cors());
app.use(cookieParser());
main().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to my book Store");
});

app.use("/api/users", userRoute);
app.use("/api/books", booksRoute);
app.use(errorHandler);
async function main() {
  await mongoose.connect(process.env.CONNECTION_STRING);
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
