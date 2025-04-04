// App.jsx
import React from "react";
import Logo from "../assets/Vector.png";
import Detective from "../assets/Detective.png";
import Cost from "../assets/Cost.png";
import Growth from "../assets/Growth.png";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

const CasePrediction = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-700 to-gray-900 text-white">
      <header className="py-4">
        <div className="w-full sm:w-[90%] mx-auto px-8 sm:px-6 lg:px-8">
          <Header />
        </div>
      </header>
      <main className="flex flex-col items-center text-center pt-16">
        <h1 className="text-5xl font-bold mb-6 mx-2 ">Case Prediction</h1>
        <p className="text-[16px] max-w-3xl sm:mx-6 mx-4">
          Analyze the strength of your case before stepping into the courtroom.
        </p>
        <p className="font-sans text-[16px] max-w-3xl mb-12 font-normal sm:mx-6  mx-4">
          The Case Prediction uses advanced AI to evaluate your evidence,
          witnesses, and legal scenario, providing a detailed analysis of your
          case's probability of success. Make informed decisions with clarity
          and confidence.
        </p>

        <div className="w-[80%] grid grid-cols-1 sm:grid-cols-3 gap-12 mb-12 pt-8">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14  text-teal-900 rounded-full flex justify-center items-center mb-2">
              <img src={Detective} alt="Icon" className="w-12 h-12" />
            </div>
            <h3 className="text-[18px] font-bold">
              Evidence & Witness Analysis
            </h3>
<div style={{width:"70%",paddingTop:"10px"}}>


            <p className="text-[14px]">
              Our AI reviews your evidence and witnesses, based on the court
              where your case is filed, to show how strong they are
            </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14  text-teal-900 rounded-full flex justify-center items-center mb-2">
              <img src={Cost} alt="Icon" className="w-12 h-12" />
            </div>
            <h3 className="text-[18px] font-bold">Cost Estimation</h3>
<div style={{width:"70%",paddingTop:"10px"}}>
            <p className="text-[14px]">
              Find out the expected costs for your case, including filing fees,
              lawyer charges, possible compensation & case complexity.
            </p>
            </div>

          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14  text-teal-900 rounded-full flex justify-center items-center mb-2">
              <img src={Growth} alt="Icon" className="w-12 h-12" />
            </div>
            <h3 className="text-[18px] font-bold">Know Winning Possibility</h3>

<div style={{width:"70%",paddingTop:"10px"}}>

            <p className="text-[14px]">
              See a simple graph that shows how strong your case by analyzing
              all the factors and get tips on whether you should proceed.
            </p>
            </div>

          </div>
        </div>

        {/* <button className="border hover:opacity-95 border-white text-white px-8 py-2 rounded-lg"  style={{ borderImage: "linear-gradient(90deg, #00DDE5 0%, #00C37B 100%) 1" }}>
          <Link to="/input">Analyze Your Legal Case</Link>
        </button> */}

<Link to="/input">
<button 
  className="w-full max-w-[250px] sm:max-w-[280px] md:max-w-[400px] hover:opacity-95 border-2 border-transparent text-white px-4 py-2 sm:px-6 sm:py-3 rounded-[10px] mx-auto my-6"
  style={{ borderImage: "linear-gradient(90deg, #00DDE5 0%, #00C37B 100%) 1" }}
>
  Analyze Your Legal Case
</button>
</Link>
      </main>
    </div>
  );
};

export default CasePrediction;
