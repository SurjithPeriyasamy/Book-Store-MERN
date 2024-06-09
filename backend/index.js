import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import { getAllBooks } from "./controllers/bookController.js";
import userRoute from "./routes/userRoutes.js";
const app = express();

//Middleware for parsing request body
app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:5713",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin"],
//   })
// );

main().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to my book Store");
});
app.use("/user/", userRoute);
app.get("/books", getAllBooks);
app.use("/books", booksRoute);

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/BookStore");
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
