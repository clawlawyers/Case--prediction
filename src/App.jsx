import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Caseprediction from "./Caseprediction/caseprediction";
import CasepredictionLoading from "./Caseprediction/CasepredictionLoading";
import CasepredictionInput from "./Caseprediction/CasepredictionInput";
import CaseEvidence from "./Caseprediction/CaseEvidence";
import CaseTestimonal from "./Caseprediction/CaseTestimonal";
import AnalyzeComponents from "./Graph/AnalyzeComponents";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Caseprediction />} />
          <Route path="/loading" element={<CasepredictionLoading />} />
          <Route path="/input" element={<CasepredictionInput />} />
          <Route path="/evidence" element={<CaseEvidence />} />
          <Route path="/testimonial" element={<CaseTestimonal />} />
          <Route path="/analyze" element={<AnalyzeComponents />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
