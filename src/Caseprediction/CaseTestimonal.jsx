import React, { useState } from "react";
import Delete from "../assets/delete.png";
import UploadIcon from "../assets/upload.png"; // Add your upload icon path here
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTestimony } from "../features/Testimony";
import { openDialog } from "../features/Casedetails";

function CaseTestimonal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const FinalTestimony = useSelector(
    (state) => state.testimony.TestimonyDetail
  );
  // const [evidenceType, setEvidenceType] = useState("");
  const [testimonyDetails, setTestimonyDetails] = useState("");

  const handleSaveAndAddTestimony = () => {
    const newTestimony = `Witness ${
      FinalTestimony?.length + 1
    }:\n ${testimonyDetails}`;
    dispatch(setTestimony([...FinalTestimony, newTestimony]));
    setTestimonyDetails("");
  };
  console.log(FinalTestimony);

  const handleContinue = () => {
    dispatch(openDialog(true));
    navigate("/input");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-700 to-gray-800 text-white font-sans">
      {/* Navbar */}
      <header className="py-4">
        <div className="max-w-5xl mx-auto px-8 sm:px-6 lg:px-8">
          <Header />
        </div>
      </header>

      {/* Case Prediction Section */}
      <main className="mx-auto max-w-4xl p-8 rounded-lg bg-gradient-to-b from-teal-800 to-teal-600 shadow-2xl">
        {/* Title and Go Back */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-100">Case Prediction</h1>
          <button className="text-teal-300 hover:text-white font-medium transition">
            Go Back
          </button>
        </div>

        {/* Case Evidence Details */}
        <div className="border border-teal-500 rounded-lg p-6 space-y-6 bg-teal-900">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Case Testimony Details</h2>
            <span className="text-teal-300 text-sm">
              Testimony No: {FinalTestimony?.length + 1}
            </span>
          </div>

          {/* Form */}
          <form className="relative space-y-6">
            <textarea
              className="w-full px-4 py-3 min-h-4 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              style={{
                background: "rgba(217, 217, 217, 0.2)",
              }}
              rows="5"
              placeholder="Enter Detailed Testimony"
              value={testimonyDetails}
              onChange={(e) => setTestimonyDetails(e.target.value)}
            ></textarea>
            {/* Upload Icon */}
            {/* <button
              type="button"
              className="absolute top-[-20px] right-2 bg-teal-600 p-2 rounded-full hover:bg-teal-500 focus:outline-none transition"
              title="Upload Document"
            >
              <img src={UploadIcon} alt="Upload" className="h-4 w-4" />
            </button> */}
          </form>

          {/* Buttons and Evidence Count */}
          <div className="flex justify-between items-center">
            <div className="text-sm">
              Testimony Count:{" "}
              <span className="font-bold text-teal-300">
                {FinalTestimony?.length}
              </span>
            </div>
            <div className="flex space-x-4">
              {/* <button
                className="flex items-center justify-center text-white rounded-full h-10 w-10"
                title="Delete Evidence"
              >
                <img src={Delete} alt="Delete Evidence" className="h-6 w-6" />
              </button> */}
              {/* <button className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition">
                Upload Testimony
              </button> */}
              <button
                className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition"
                onClick={handleSaveAndAddTestimony}
              >
                Save & Add Testimony
              </button>
              <button
                className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CaseTestimonal;
