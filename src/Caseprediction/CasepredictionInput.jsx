import React from "react";
import Header from "../Header/Header";

const CasePredictionInput = () => {
  return (
    <div className="bg-gradient-to-b from-teal-900 to-teal-700 min-h-screen text-white font-['Plus Jakarta Sans']">
      {/* Fixed Header */}
      <header className="">
        <div className="max-w-5xl mx-auto px-8 py-4 sm:px-6 lg:px-8">
          <Header />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center  justify-center pt-12">
        <div className="bg-teal-800 rounded-xl p-8 w-11/12 max-w-2xl shadow-lg">
          {/* Title */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-center">Case Prediction</h1>
            <p className="text-sm cursor-pointer hover:underline">Go Back</p>
          </div>
          <p className="text-md text-center mb-6">Enter Your Case Details</p>

          {/* Form */}
          <form>
            {/* Dropdowns */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              <select
                className="bg-teal-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                defaultValue="">
                <option value="" disabled>
                  Select Your Case Type
                </option>
                <option>Criminal</option>
                <option>Civil</option>
                <option>Family</option>
              </select>
            </div>

            {/* Radio Buttons and Dropdown */}
            <div className="flex justify-between mb-4 gap-4">
              <div className="flex-1 flex justify-between">
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
                  className="bg-teal-700 text-white px-4 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  defaultValue="">
                  <option value="" disabled>
                    Select Your Court
                  </option>
                  <option>District Court</option>
                  <option>State Court</option>
                  <option>Supreme Court</option>
                </select>
              </div>
            </div>

            {/* Text Area */}
            <textarea
              className="bg-teal-700 text-white px-4 py-2 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="4"
              placeholder="Enter Your Detailed Case Overview"></textarea>

            {/* Action Buttons */}
            <div className="flex justify-between mb-6">
              <button
                type="button"
                className="bg-teal-600 px-4 py-2 rounded hover:bg-teal-500 transition">
                + Add Evidence
              </button>
              <button
                type="button"
                className="bg-teal-600 px-4 py-2 rounded hover:bg-teal-500 transition">
                + Add Testimony
              </button>
            </div>

            {/* Analyze Case Button */}
            <button
              type="submit"
              className="bg-gray-600 w-full py-3 rounded hover:bg-gray-500 transition">
              Analyze Case
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CasePredictionInput;
