import React from "react";
import LoadingImg from "../assets/Analysisdigitalmarketing.png";
import Header from "../Header/Header";

const CaseLoading = () => {
  return (
    <div className="bg-gradient-to-b from-teal-900 to-teal-700 min-h-screen text-white font-['Plus Jakarta Sans']">
      {/* Fixed Header */}
      <header className="">
        <div className="max-w-5xl mx-auto px-8 py-4 sm:px-6 lg:px-8">
          <Header />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center ">
        {/* Illustration */}
        <div className="mb-8">
          <img src={LoadingImg} alt="Illustration" className="h-52 w-52" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">Case Prediction Loading</h1>

        {/* Subtitle */}
        <p className="text-sm max-w-lg">
          Oh yes, the tips go here one by one. We have a set of 5 tips with us
          currently.
        </p>
      </main>
    </div>
  );
};

export default CaseLoading;
