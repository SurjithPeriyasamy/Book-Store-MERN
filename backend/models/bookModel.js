import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
bookSchema.index({ author: 1 });
// animalSchema.index({ name: 1, type: -1 });
export const Book = mongoose.model("Book", bookSchema);
