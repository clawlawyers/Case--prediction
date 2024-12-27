import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/AuthDetails";
import evidenceDetailSlice from "./features/EvidenceDetails";
import caseDetailSlice from "./features/Casedetails";
import testimonyDetailSlice from "./features/Testimony";

export default configureStore({
  reducer: {
    auth: userSlice,
    evidence: evidenceDetailSlice,
    case: caseDetailSlice,
    testimony: testimonyDetailSlice,
  },
});
