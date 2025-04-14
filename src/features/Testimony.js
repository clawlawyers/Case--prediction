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
    changeTestimony(state, action) {
      const { testimonyDetails, index } = action.payload;
      // Replace the element at the given index with the new evidenceDetails
      if (index >= 0 && index < state.TestimonyDetail.length) {
        state.TestimonyDetail[index] = testimonyDetails;
      }
    },
    deleteTestimony(state, action) {
      const { index } = action.payload;
      // Delete the element at the given index
      if (index >= 0 && index < state.TestimonyDetail.length) {
        state.TestimonyDetail.splice(index, 1); // Remove 1 element at the specified index
      }
    },
    resetTestimony(state, action) {
      state.TestimonyDetail = [];
    },
  },
});

export const { setTestimony, resetTestimony ,changeTestimony,deleteTestimony } = testimonyDetailSlice.actions;

export default testimonyDetailSlice.reducer;
