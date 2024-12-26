import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/AuthDetails";
import evidenceDetailSlice from "./features/EvidenceDetails";
import caseDetailSlice from "./features/Casedetails";

export default configureStore({
  reducer: {
    auth: userSlice,
    evidence: evidenceDetailSlice,
    case: caseDetailSlice,
  },
});
