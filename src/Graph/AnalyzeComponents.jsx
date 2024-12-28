import React from "react";
import Header from "../Header/Header";
import PieChart from "./PieChart";
import WinBarChart from "./BarCharts/WinBarChart";
import HorizontalBarChart from "./HorizontalBarChart";
import CombinedGraph from "./CombinedGraph";
import LegalBarChart from "./BarCharts/LegalBarChart";
import ProceduralBarChart from "./BarCharts/ProceduralBarChart";

const AnalyzeComponents = () => {
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
          <HorizontalBarChart />
        </div>
        <div className="w-full grid md:grid-cols-2 gap-3">
          <div className="w-full bg-white bg-opacity-25 p-3 rounded-lg border flex flex-col items-center justify-between">
            <h1 style={{ color: "#fff", textAlign: "center" }}>
              Win Probability (Factor Wise)
            </h1>
            <div className="w-full h-full flex-1">
              <WinBarChart />
            </div>
          </div>
          <div className="w-full h-full  bg-white bg-opacity-25 p-3 rounded-lg border flex flex-col items-center justify-between">
            <h1 style={{ color: "#fff", textAlign: "center" }}>
              Evidence Analysis Strength
            </h1>
            <PieChart />
          </div>
        </div>
        <div className="w-full grid md:grid-cols-2 gap-3">
          <div className="w-full bg-white bg-opacity-25 p-3 rounded-lg border flex flex-col items-center justify-between">
            <h1 style={{ color: "#fff", textAlign: "center" }}>
              Legal Complexity Factors
            </h1>
            <div className="w-full h-full flex-1">
              <LegalBarChart />
            </div>
          </div>
          <div className="w-full bg-white bg-opacity-25 p-3 rounded-lg border flex flex-col items-center justify-between">
            <h1 style={{ color: "#fff", textAlign: "center" }}>
              Procedural Viability Compliance
            </h1>
            <div className="w-full h-full flex-1">
              <ProceduralBarChart />
            </div>
          </div>
        </div>
        <div className="bg-white bg-opacity-25 rounded-lg border pt-10 px-5">
          <CombinedGraph />
        </div>
      </div>
    </div>
  );
};

export default AnalyzeComponents;
