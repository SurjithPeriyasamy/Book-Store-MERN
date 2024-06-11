import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./booksSlice";
import searchSlice from "./searchSlice";
import userSlice from "./userSlice";

const appStore = configureStore({
  reducer: {
    books: booksSlice,
    search: searchSlice,
    user: userSlice,
  },
});

export default appStore;
