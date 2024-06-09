import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./booksSlice";
import searchSlice from "./searchSlice";

const appStore = configureStore({
  reducer: {
    books: booksSlice,
    search: searchSlice,
  },
});

export default appStore;
