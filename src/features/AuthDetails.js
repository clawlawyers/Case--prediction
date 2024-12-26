import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
  },
  reducers: {
    setuserId(state) {
      state.userId = true;
    },
  },
});

export const { setuserId } = userSlice.actions;

export default userSlice.reducer;
