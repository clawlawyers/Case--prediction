import React from "react";

const App = () => {
  return (
    <div className="bg-gradient-to-b from-teal-900 to-teal-700 h-screen flex items-center justify-center font-['Plus Jakarta Sans'] text-white">
      {/* Form Section */}
      <div className="bg-teal-800 rounded-xl p-8 w-11/12 max-w-2xl shadow-lg">
        {/* Title */}
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Case Prediction
          </h1>
          <p>Go Back</p>
        </div>
        <p className="text-md text-center ">Enter Your Case Details</p>

        {/* Form */}
        <form>
          {/* Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-6">
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

          {/* Radio Buttons */}
          <div className="flex justify-between mb-2 gap-4">
            {/* Left Section (Radio Buttons) */}
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

            {/* Right Section (Select Dropdown) */}
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
              className="bg-teal-600 px-4 py-2 rounded hover:bg-teal-500">
              + Add Evidence
            </button>
            <button
              type="button"
              className="bg-teal-600 px-4 py-2 rounded hover:bg-teal-500">
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
  );
};

export default App;
