import { createSlice } from "@reduxjs/toolkit";
const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    count: 0,
  },
  reducers: {
    addBooks: (state, action) => {
      const { count, data } = action.payload;
      state.books = data;
      state.count = count;
    },
  },
});

export const { addBooks } = booksSlice.actions;
export default booksSlice.reducer;
