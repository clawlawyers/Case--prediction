import React from "react";
import LoadingImg from "../assets/Analysisdigitalmarketing.png";
const CaseLoading = () => {
  return (
    <div className="bg-gradient-to-b from-teal-900 to-teal-700 h-screen text-white font-['Plus Jakarta Sans']">
      <header className="flex justify-between items-center px-8 py-4"></header>
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center mt-20">
        {/* Illustration */}
        <div className="mb-8">
          <img src={LoadingImg} alt="Illustration" className="h-40" />
        </div>
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">Case Prediction Loading</h1>
        {/* Subtitle */}
        <p className="text-sm max-w-lg">
          Oh Yes The Tips Goes here one by one, we have set of 5 tips with us
          currently
        </p>
      </main>
    </div>
  );
};

export default CaseLoading;
