import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  searchBook,
  updateBook,
} from "../controllers/bookController.js";
const router = Router();

router.get("/search", searchBook);
//get all books
// router.get("", getAllBooks);

// get a book with specific id
router.get("/:id", getBook);

// Create a book
router.post("/", createBook);

//Update a book
router.put("/:id", updateBook);

//delete a Book
router.delete("/:id", deleteBook);

export default router;
