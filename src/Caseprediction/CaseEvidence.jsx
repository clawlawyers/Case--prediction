import React from "react";
import Delete from "../assets/delete.png";
import Header from "../Header/Header";
import UploadIcon from "../assets/upload.png";
function CaseEvidence() {
  const [evidence, setEvidence] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-700 to-gray-800 text-white font-sans">
      <header className="py-4">
        <div className="max-w-5xl mx-auto px-8 sm:px-6 lg:px-8">
          <Header />
        </div>
      </header>
      <main className="mx-auto max-w-4xl p-8 rounded-lg bg-gradient-to-b from-teal-800 to-teal-600 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-100">Case Prediction</h1>
          <button className="text-teal-300 hover:text-white font-medium transition">
            Go Back
          </button>
        </div>

        {/* Case Evidence Details */}
        <div className="border border-teal-500 rounded-lg p-6 space-y-6 bg-teal-900">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Case Evidence Details</h2>
            <span className="text-teal-300 text-sm">
              &lt; Evidence No: 01 &gt;
            </span>
          </div>

          <form className="space-y-6">
            {/* Select Dropdown */}
            <select
              className="w-full px-4 py-2 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              style={{
                background: "rgba(217, 217, 217, 0.2)",
              }}
              defaultValue="">
              <option value="" disabled>
                Select Type Of Evidence Document
              </option>

              <option
                className="bg-teal-600 text-white hover:bg-teal-700 hover:text-gray-200"
                value="Document 1">
                Document 1
              </option>
              <option
                className="bg-teal-600 text-white hover:bg-teal-700 hover:text-gray-200"
                value="Document 2">
                Document 2
              </option>
            </select>

            <div className="relative">
              <textarea
                className="w-full px-4 py-3 min-h-4 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                style={{
                  background: "rgba(217, 217, 217, 0.2)",
                }}
                rows="5"
                placeholder="Enter Detailed Evidence"></textarea>
              <button
                type="button"
                className="absolute top-2 right-3 bg-teal-600 p-2 rounded-full hover:bg-teal-500 focus:outline-none transition"
                title="Upload Document">
                <img src={UploadIcon} alt="Upload" className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="flex justify-between items-center">
            <div className="text-sm">
              Evidence Count:{" "}
              <span className="font-bold text-teal-300">03</span>
            </div>
            <div className="flex space-x-4">
              <button
                className="flex items-center justify-center  text-white rounded-full h-10 w-10"
                title="Delete Evidence">
                <img src={Delete} alt="Delete Evidence" className="h-6 w-6" />
              </button>
              <button className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition">
                Upload Evidence
              </button>
              <button className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition">
                Save & Add Evidence
              </button>
              <button className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition">
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
