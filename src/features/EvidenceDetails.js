import { createSlice } from "@reduxjs/toolkit";

export const evidenceDetailSlice = createSlice({
  name: "evidence",
  initialState: {
    EvidenceDetail: [],
  },

  reducers: {
    setEvidence(state, action) {
      console.log(action.payload);
      state.EvidenceDetail = action.payload;
    },
    resetEvidence(state, action) {
      state.EvidenceDetail = null;
    },
  },
});

export const { setEvidence, resetEvidence } = evidenceDetailSlice.actions;

export default evidenceDetailSlice.reducer;
