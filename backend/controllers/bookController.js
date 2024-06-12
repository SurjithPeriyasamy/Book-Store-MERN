import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";
import { catchError } from "../utils/catchError.js";

export const getAllBooks = async (req, res) => {
  try {
    const { skip, limit } = req.query;

    const ans = await Book.find().skip(skip).limit(limit);
    // console.log(skip, limit);
    const books = await Book.find();
    res.status(200).json({ count: books.length, data: ans });
  } catch (error) {
    next(catchError(error.message));
    // res.status(500).send({ message: error.message });
  }
};

export const searchBook = async (req, res, next) => {
  const text = req.query.query;
  try {
    if (!text) {
      const allBooks = await Book.find({});
      return res.status(200).json({ count: allBooks.length, data: allBooks });
    }
    const data = await Book.find({ author: new RegExp(text, "i") });
    // const ans = await Book.find({ author: new RegExp(text, "i") }).explain(
    //   "executionStats"
    // );
    // console.log(ans);
    if (!data.length) {
      return next(catchError("Book was not found", 404));
      // res.status(404).json({ message: "Book was not found" });
    }
    res.status(200).json({ count: data.length, data });
  } catch (error) {
    next(catchError(error.message));
    // res.status(500).send({ message: error.message });
  }
};

export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json({ data: book });
  } catch (error) {
    next(catchError(error.message));
    // res.status(500).send({ message: error.message });
  }
};

export const createBook = async (req, res, next) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).send("send the all required fileds");
    }

    const book = await Book.create({
      user_id: req.user.id,
      title,
      author,
      publishYear,
    });
    res.status(201).json({ message: "Book Created Successfully", data: book });
  } catch (error) {
    next(catchError(error.message));
    // res.status(500).send({ message: error.message });
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return next(catchError("Book was not found", 400));
      // res.status(400).send("send the all required fileds");
    }
    const { id } = req.params;
    const book = await Book.findOne({ _id: id });
    if (book.user_id.toString() !== req.user.id) {
      return next(
        catchError(
          "user doesn't have permission to update the other's Books",
          403
        )
      );
    }
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // console.log(result);
    // if (!result) {
    //   return res.status(404).json({ message: "Book was not found" });
    // }
    res
      .status(200)
      .json({ message: "Book was updated successfully ", data: updatedBook });
  } catch (error) {
    next(catchError("Book was not found"));

    // res.status(500).send({ message: "Book was not found" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ _id: id });
    if (book.user_id.toString() !== req.user.id) {
      return next(
        catchError(
          "user doesn't have permission to Delete the other's Books",
          403
        )
      );
    }
    const data = await Book.findByIdAndDelete(id);
    res.status(200).json({ message: "Book deleted successfully", data });
  } catch (error) {
    next(catchError("Book was not found"));
    // res.status(500).send({ message: "Book was not found" });
  }
};
