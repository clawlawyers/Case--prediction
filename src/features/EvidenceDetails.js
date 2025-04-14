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
    changeEvidence(state, action) {
      const { evidenceDetails, index } = action.payload;
      // Replace the element at the given index with the new evidenceDetails
      if (index >= 0 && index < state.EvidenceDetail.length) {
        state.EvidenceDetail[index] = evidenceDetails;
      }
    },
    deleteEvidence(state, action) {
      const { index } = action.payload;
      // Delete the element at the given index
      if (index >= 0 && index < state.EvidenceDetail.length) {
        state.EvidenceDetail.splice(index, 1); // Remove 1 element at the specified index
      }
    },
    resetEvidence(state, action) {
      state.EvidenceDetail = [];
    },
  },
});

export const { setEvidence, resetEvidence, changeEvidence, deleteEvidence } =
  evidenceDetailSlice.actions;

export default evidenceDetailSlice.reducer;
