import { Book } from "../models/bookModel.js";

export const getAllBooks = async (req, res) => {
  try {
    const { skip, limit } = req.query;

    const ans = await Book.find().skip(skip).limit(limit);
    // console.log(skip, limit);
    const books = await Book.find();
    res.status(200).json({ count: books.length, data: ans });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const searchBook = async (req, res) => {
  const text = req.query.query;
  try {
    const data = await Book.find({ author: new RegExp(text, "i") });
    // const ans = await Book.find({ author: new RegExp(text, "i") }).explain(
    //   "executionStats"
    // );
    // console.log(ans);
    if (!data.length) {
      return res.status(404).json({ message: "Book was not found" });
    }
    res.status(200).json({ count: data.length, data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getBook = async (req, res) => {
  try {
    // const book = await Book.findOne().where("_id").equals(req.params.id);
    const book = await Book.findById(req.params.id);
    res.status(200).json({ data: book });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).send("send the all required fileds");
    }
    const book = await Book.create({
      title,
      author,
      publishYear,
    });
    res.status(201).send({ message: "Book Created Successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).send("send the all required fileds");
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    // console.log(result);
    // if (!result) {
    //   return res.status(404).json({ message: "Book was not found" });
    // }
    const data = await Book.find();
    res.status(200).json({ count: data.length, data });
  } catch (error) {
    res.status(500).send({ message: "Book was not found" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    const data = await Book.find();
    res.status(200).json({ count: data.length, data });
  } catch (error) {
    res.status(500).send({ message: "Book was not found" });
  }
};
