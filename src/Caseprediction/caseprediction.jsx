// App.jsx
import React from "react";
import Logo from "../assets/Vector.png";
import Header from "../Header/Header";

const CasePrediction = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-700 to-gray-900 text-white">
      <header className="py-4">
        <div className="max-w-5xl mx-auto px-8 sm:px-6 lg:px-8">
          <Header />
        </div>
      </header>
      <main className="flex flex-col items-center text-center py-16">
        <h1 className="text-4xl font-bold mb-6">Case Prediction</h1>
        <p className="text-sm max-w-3xl mb-12">
          Combined graph = bar chart or pie chart 2. Win Probability, vertical
          Bar Chart/column chart 3. Evidence Analysis Strength, Pie Chart 4.
          Procedural Viability Compliance, stacked column chart 5. Legal
          Complexity Factors, Stacked bar chart 6.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12  text-teal-900 rounded-full flex justify-center items-center mb-4">
              <img src={Logo} alt="Icon" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Header Title</h3>
            <p className="text-xs">
              Dummy test oh no sorry dummy text
              <br /> goes here
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12  text-teal-900 rounded-full flex justify-center items-center mb-4">
              <img src={Logo} alt="Icon" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Header Title</h3>
            <p className="text-xs">
              Dummy test oh no sorry dummy text
              <br /> goes here
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12  text-teal-900 rounded-full flex justify-center items-center mb-4">
              <img src={Logo} alt="Icon" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Header Title</h3>
            <p className="text-xs">
              Dummy test oh no sorry dummy text
              <br /> goes here
            </p>
          </div>
        </div>

        <button className="bg-teal-700 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-bold">
          Analyze Your Legal Case
        </button>
      </main>
    </div>
  );
};

export default CasePrediction;
