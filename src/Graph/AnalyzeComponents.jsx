import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import PieChart from "./PieChart";
import WinBarChart from "./BarCharts/WinBarChart";
import HorizontalBarChart from "./HorizontalBarChart";
import CombinedGraph from "./CombinedGraph";
import LegalBarChart from "./BarCharts/LegalBarChart";
import ProceduralBarChart from "./BarCharts/ProceduralBarChart";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const AnalyzeComponents = () => {
  const userid = useSelector((state) => state.auth.userId);

  const [evidenceAnalysis, setEvidenceAnalysis] = useState([]);
  const [proceduralCompliance, setProceduralCompliance] = useState([]);
  const [legalFactors, setLegalFactors] = useState([]);
  const [cost, setCost] = useState([]);
  const [winProbability, setWinProbability] = useState([]);
  const [overallScore, setOverallScore] = useState([]);

  const extractDataFromObject = (data) => {
    const arrData = [];
    for (let key in data) {
      arrData.push(data[key]);
    }
    return arrData;
  };

  function convertToNumbers(stringArray) {
    return stringArray.map((item) => parseInt(item.replace(",", ""), 10));
  }

  const getGraphData = async (apiRoute, settingFunction) => {
    try {
      const response = await fetch(
        `${NODE_API_ENDPOINT}/casePrediction/api/${apiRoute}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userid,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      console.log(data);
      const ProbabilityData = extractDataFromObject(data.data);
      console.log(ProbabilityData);
      if (apiRoute === "cost") {
        const respo = convertToNumbers(ProbabilityData);
        settingFunction(respo);
      } else {
        settingFunction(ProbabilityData);
      }
      return ProbabilityData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const getAlldata = async () => {
      await getGraphData("evidence_analysis", setEvidenceAnalysis);
      await getGraphData("procedural_compliance", setProceduralCompliance);
      await getGraphData("legal_factors", setLegalFactors);
      await getGraphData("cost", setCost);
      await getGraphData("win_probability", setWinProbability);
      await getGraphData("overall_score", setOverallScore);
    };
    if (userid !== null) {
      getAlldata();
    }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-700 to-gray-900 text-white">
      <header className="py-4">
        <div className="max-w-5xl mx-auto px-8 sm:px-6 lg:px-8">
          <Header />
        </div>
      </header>
      <div className="w-[80%] m-auto flex flex-col gap-3">
        <div className="w-full bg-white bg-opacity-25 p-3 rounded-lg border">
          <h1 style={{ color: "#fff", textAlign: "center" }}>
            Average Score For Each Category
          </h1>

          <HorizontalBarChart Value={overallScore} />
        </div>
        <div className="w-full grid md:grid-cols-2 gap-3">
          <div className="w-full bg-white bg-opacity-25 p-3 rounded-lg border flex flex-col items-center justify-between">
            <h1 style={{ color: "#fff", textAlign: "center" }}>
              Win Probability (Factor Wise)
            </h1>
            <div className="w-full h-full flex-1">
              <WinBarChart Value={winProbability} />
            </div>
          </div>
          <div className="w-full h-full  bg-white bg-opacity-25 p-3 rounded-lg border flex flex-col items-center justify-between">
            <h1 style={{ color: "#fff", textAlign: "center" }}>
              Evidence Analysis Strength
            </h1>
            <PieChart Value={evidenceAnalysis} />
          </div>
        </div>
        <div className="w-full grid md:grid-cols-2 gap-3">
          <div className="w-full bg-white bg-opacity-25 p-3 rounded-lg border flex flex-col items-center justify-between">
            <h1 style={{ color: "#fff", textAlign: "center" }}>
              Legal Complexity Factors
            </h1>
            <div className="w-full h-full flex-1">
              <LegalBarChart Value={legalFactors} />
            </div>
          </div>
          <div className="w-full bg-white bg-opacity-25 p-3 rounded-lg border flex flex-col items-center justify-between">
            <h1 style={{ color: "#fff", textAlign: "center" }}>
              Procedural Viability Compliance
            </h1>
            <div className="w-full h-full flex-1">
              <ProceduralBarChart Value={proceduralCompliance} />
            </div>
          </div>
        </div>
        <div className="bg-white bg-opacity-25 rounded-lg border pt-10 px-5">
          <CombinedGraph Value={cost} />
        </div>
      </div>
    </div>
  );
};

export default AnalyzeComponents;
