import { createSlice } from "@reduxjs/toolkit";

export const testimonyDetailSlice = createSlice({
  name: "testimony",
  initialState: {
    TestimonyDetail: [],
  },

  reducers: {
    setTestimony(state, action) {
      state.TestimonyDetail = action.payload;
    },
    resetTestimony(state, action) {
      state.TestimonyDetail = null;
    },
  },
});

export const { setTestimony, resetTestimony } = testimonyDetailSlice.actions;

export default testimonyDetailSlice.reducer;
