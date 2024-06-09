import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    authorResults: {},
    titleResults: {},
  },
  reducers: {
    addResults: (state, action) => {
      const { searchBy, data } = action.payload;
      state[searchBy] = { ...state[searchBy], ...data };
    },
  },
});

export const { addResults } = searchSlice.actions;
export default searchSlice.reducer;
