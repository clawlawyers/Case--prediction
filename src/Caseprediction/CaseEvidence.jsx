import React from "react";
import Delete from "../assets/delete.png";
function CaseEvidence() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-800 to-gray-900 text-white font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4"></header>

      {/* Case Prediction Section */}
      <main className="mx-auto max-w-4xl p-8 rounded-lg bg-gradient-to-b from-teal-900 to-teal-700 shadow-lg">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold mb-4">Case Prediction</h1>
          <p>Go Back</p>
        </div>
        <div className="border border-gray-600 rounded-lg p-6 space-y-4">
          <div className="flex justify-between">
            <h2 className="font-medium">Case Evidence Details</h2>
            <span className="text-green-400">&lt; Evidence No: 01 &gt;</span>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <select
              className="w-full px-4 py-2 bg-[rgba(217,217,217,0.2)] text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              defaultValue="">
              <option value="" disabled>
                Select Type Of Evidence Document
              </option>
              <option value="Document 1">Document 1</option>
              <option value="Document 2">Document 2</option>
            </select>

            <textarea
              className="w-full px-4 py-2 bg-[rgba(217,217,217,0.2)] text-gray-300 placeholder- rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="4"
              placeholder="Enter Detailed Evidence"></textarea>
          </form>

          {/* Buttons */}
          <div className="flex justify-between ">
            <div className="text-white text-sm">
              Evidence Count: <span className="font-medium">03</span>
            </div>
            <div className="flex space-x-2">
              <button className="h-10 px-4 rounded hover:text-gray-300 flex items-center justify-center">
                <img src={Delete} alt="delete img" className="h-6 w-4" />
              </button>
              <button className="bg-teal-600 h-10 px-4 rounded hover:bg-teal-500">
                Upload Evidence
              </button>
              <button className="bg-teal-600 h-10 px-4 rounded hover:bg-teal-500">
                Save & Add Evidence
              </button>
              <button className="bg-teal-600 h-10 px-4 rounded hover:bg-teal-500">
                Continue
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CaseEvidence;
