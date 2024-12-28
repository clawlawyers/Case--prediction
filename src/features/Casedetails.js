import { createSlice } from "@reduxjs/toolkit";

export const caseDetailSlice = createSlice({
  name: "case",
  initialState: {
    caseType: null,
    Jurisdiction: null,
    caseOverview: null,
    isDialogOpen: false,
  },

  reducers: {
    setCase(state, action) {
      state.caseType = action.payload.caseType;
      state.Jurisdiction = action.payload.Jurisdiction;
      state.caseOverview = action.payload.caseOverview;
    },
    resetCase(state, action) {
      state.caseType = null;
      state.Jurisdiction = null;
      state.caseOverview = null;
    },
    openDialog(state, action) {
      state.isDialogOpen = true;
    },
    closeDialog(state, action) {
      state.isDialogOpen = false;
    },
  },
});

export const { setCase, resetCase, openDialog, closeDialog } =
  caseDetailSlice.actions;

export default caseDetailSlice.reducer;
