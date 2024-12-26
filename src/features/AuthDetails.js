import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
  },
  reducers: {
    setuserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const { setuserId } = userSlice.actions;

export default userSlice.reducer;
