import React from "react";
import Header from "../Header/Header";

const CasePredictionInput = () => {
  return (
    <div className="bg-gradient-to-b from-teal-900 to-teal-700 min-h-screen  text-white font-['Plus Jakarta Sans']">
      {/* Fixed Header */}
      <header className="">
        <div className="max-w-5xl mx-auto px-8 py-4 sm:px-6 lg:px-8">
          <Header />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center w-80% justify-center pt-4">
        <div className="bg-teal-800 rounded-xl p-8 w-11/12 max-w-4xl shadow-lg">
          {/* Title */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-center">Case Prediction</h1>
            <p className="text-sm cursor-pointer hover:underline">Go Back</p>
          </div>
          <div className="border border-teal-500 rounded-lg p-6 space-y-6 bg-teal-900">
            <p className="text-xl font-bold text-center mb-6">
              Enter Your Case Details
            </p>

            {/* Form */}
            <form>
              {/* Dropdowns */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                <select
                  className="text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  style={{
                    background: "rgba(217, 217, 217, 0.2)",
                  }}
                  defaultValue="">
                  <option
                    className="bg-white text-white hover:bg-teal-700 hover:text-gray-200"
                    value=""
                    disabled>
                    Select Your Case Type
                  </option>
                  <option className="bg-teal-600 text-white hover:bg-teal-700 hover:text-gray-200">
                    Criminal
                  </option>
                  <option className="bg-teal-600 text-white hover:bg-teal-700 hover:text-gray-200">
                    Civil
                  </option>
                  <option className="bg-teal-600 text-white hover:bg-teal-700 hover:text-gray-200">
                    Family
                  </option>
                </select>
              </div>

              {/* Radio Buttons and Dropdown */}
              <div className="flex justify-between mb-4 gap-4">
                <div className="flex-1 flex justify-between">
                  <p className="mt-1 font-bold">Jurisdiction :</p>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="jurisdiction"
                      value="District Court"
                      className="text-teal-600 focus:ring-teal-500"
                    />
                    <span className="ml-2 text-xs">District Court</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="jurisdiction"
                      value="State Court"
                      className="text-teal-600 focus:ring-teal-500"
                    />
                    <span className="ml-2 text-xs">State Court</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="jurisdiction"
                      value="Supreme Court"
                      className="text-teal-600 focus:ring-teal-500"
                    />
                    <span className="ml-2 text-xs">Supreme Court</span>
                  </label>
                </div>

                <div className="flex-1">
                  <select
                    className=" text-white px-4 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    style={{
                      background: "rgba(217, 217, 217, 0.2)",
                    }}
                    defaultValue="">
                    <option value="" disabled>
                      Select Your Court
                    </option>
                    <option className="bg-teal-600 text-white hover:bg-teal-700 hover:text-gray-200">
                      District Court
                    </option>
                    <option className="bg-teal-600 text-white hover:bg-teal-700 hover:text-gray-200">
                      State Court
                    </option>
                    <option className="bg-teal-600 text-white hover:bg-teal-700 hover:text-gray-200">
                      Supreme Court
                    </option>
                  </select>
                </div>
              </div>

              {/* Text Area */}
              <textarea
                className="text-white min-h-4 px-4 py-2 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-teal-500"
                style={{
                  background: "rgba(217, 217, 217, 0.2)",
                }}
                rows="4"
                placeholder="Enter Your Detailed Case Overview"></textarea>

              {/* Action Buttons */}
              <div className="flex w-full justify-between mb-6">
                <button
                  type="button"
                  className="flex-1 px-4 py-2 rounded text-white hover:opacity-90 transition mr-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #417476 0%, #66b799 100%)",
                    border: "none",
                  }}>
                  + Add Evidence
                </button>

                <button
                  type="button"
                  className="flex-1 px-4 py-2 rounded text-white hover:opacity-90 transition mr-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #417476 0%, #66b799 100%)",
                    border: "none",
                  }}>
                  + Add Testimony
                </button>
              </div>

              {/* Analyze Case Button */}
              <button
                type="submit"
                className=" w-full hover:text-black py-3 rounded hover:bg-gray-300 hover:opacity-90 transition relative overflow-hidden"
                style={{
                  border: "1px solid transparent",
                  borderImageSource:
                    "linear-gradient(90deg, #00DDE5 0%, #00C37B 100%)",
                  borderImageSlice: 1,
                }}>
                Analyze Case
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasePredictionInput;
