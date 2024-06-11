import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: {},
  },
  reducers: {
    addLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
});

export const { addLoggedInUser } = userSlice.actions;
export default userSlice.reducer;
