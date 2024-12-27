import React, { useState } from "react";
import Delete from "../assets/delete.png";
import Header from "../Header/Header";
import UploadIcon from "../assets/upload.png";
import { useDispatch, useSelector } from "react-redux";
import { setEvidence } from "../features/EvidenceDetails";
import { openDialog } from "../features/Casedetails";
import { useNavigate } from "react-router-dom";
import { NODE_API_ENDPOINT } from "../utils/utils";

import { CircularProgress } from "@mui/material";

function CaseEvidence() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const userid = useSelector((state) => state.auth.userId);
  const FinalEvidence = useSelector((state) => state.evidence.EvidenceDetail);

  const [evidenceType, setEvidenceType] = useState("");
  const [evidenceDetails, setEvidenceDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveAndAddEvidence = async () => {
    const newEvidence = `${evidenceType} : \n ${evidenceDetails}`;
    dispatch(setEvidence([...FinalEvidence, newEvidence]));
    alert("Evidence saved and added successfully!");
    setEvidenceType("");
    setEvidenceDetails("");
  };
  console.log("Final Evidence:", FinalEvidence);

  const handleContinue = () => {
    // Add your code here to navigate to the next page or perform necessary actions
    // Example: history.push("/next-page");
    dispatch(openDialog(true));
    navigate("/input");
  };

  const handleFileChange = async (e) => {
    // Get the selected file
    console.log("File selected:");
    const file = e.target.files[0];

    if (file) {
      // Extract file extension (e.g., ".pdf", ".docx", ".jpg")
      const fileExtension = file.name.split(".").pop();
      const renamedFile = new File([file], userid + "." + fileExtension, {
        type: file.type,
      });

      // Update the state to store the renamed file
      setSelectedFile(renamedFile);
      console.log("File renamed to:", renamedFile);

      try {
        // Create FormData instance to handle file and other fields
        const formData = new FormData();
        formData.append("file", renamedFile); // Append the file
        formData.append("type", evidenceType); // Append the evidence type

        console.log("File:", formData);

        setLoading(true);
        // Perform the API request to upload the evidence
        const uploadedData = await fetch(
          `${NODE_API_ENDPOINT}/casePrediction/api/evidence_document`,
          {
            method: "POST",
            body: formData, // FormData as the body (do not set Content-Type)
            // No need to set "Content-Type" header manually
          }
        );

        if (!uploadedData.ok) {
          setLoading(false);
          alert("Failed to upload evidence. Please try again.");
          return;
        }
        setLoading(false);
        const data = await uploadedData.json();
        // console.log("Evidence uploaded successfully:", data.data);
        // let resultString = data.data.replace(/^"[^"]*"\s*/, "");
        let inputString = data.data;
        let resultString = inputString.replace(/^\S+\s+\S+\s*/, "");
        console.log("Evidence uploaded successfully:", resultString);
        setEvidenceDetails(resultString);
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
        alert("Failed to upload evidence. Please try again.");
        return;
      }
    }
  };

  const handleClickTOFileUpload = (event) => {
    if (evidenceType === "") {
      alert("Please enter evidence type!");
      event.preventDefault();
      return;
    }
  };

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
              {/* <span className="cursor-pointer font-extrabold text-xl">
                {"< "}
              </span> */}
              Evidence No: {FinalEvidence?.length + 1}
              {/* <span className="cursor-pointer font-extrabold text-xl">
                {" >"}
              </span> */}
            </span>
          </div>

          <form className="space-y-6">
            {/* Select Dropdown */}
            <select
              className="w-full px-4 py-2 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              style={{
                background: "rgba(217, 217, 217, 0.2)",
              }}
              value={evidenceType}
              onChange={(e) =>
                setEvidenceType(e.target.value === "" ? null : e.target.value)
              }
            >
              <option value="" disabled>
                Select Type Of Evidence Document
              </option>

              <option
                className="bg-teal-600 text-white hover:bg-teal-700 hover:text-gray-200"
                value="circumstantial evidence"
              >
                Circumstantial Evidence
              </option>
              <option
                className="bg-teal-600 text-white hover:bg-teal-700 hover:text-gray-200"
                value="documentary evidence"
              >
                Documentary Evidence
              </option>
              <option
                className="bg-teal-600 text-white hover:bg-teal-700 hover:text-gray-200"
                value="physical evidence"
              >
                Physical Evidence
              </option>
            </select>

            <div className="relative">
              <textarea
                className="w-full px-4 py-3 min-h-4 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                style={{
                  background: "rgba(217, 217, 217, 0.2)",
                }}
                rows="5"
                placeholder="Enter Detailed Evidence"
                value={evidenceDetails}
                onChange={(e) => setEvidenceDetails(e.target.value)}
              ></textarea>
              {/* <button
                type="button"
                className="absolute top-2 right-3 bg-teal-600 p-2 rounded-full hover:bg-teal-500 focus:outline-none transition"
                title="Upload Document"
              >
                <img src={UploadIcon} alt="Upload" className="h-4 w-4" />
              </button> */}
            </div>
          </form>

          <div className="flex justify-between items-center">
            <div className="text-sm">
              Evidence Count:{" "}
              <span className="font-bold text-teal-300">
                {FinalEvidence?.length}
              </span>
            </div>
            <div className="flex space-x-4">
              {/* <button
                className="flex items-center justify-center  text-white rounded-full h-10 w-10"
                title="Delete Evidence"
              >
                <img src={Delete} alt="Delete Evidence" className="h-6 w-6" />
              </button> */}
              <button className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition">
                <label
                  htmlFor="fileUpload"
                  // className="w-full text-center bg-teal-800 hover:bg-teal-700 border-green-500 border-[1px] py-2 rounded-lg cursor-pointer text-white"
                >
                  {loading ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    "Upload Evidence"
                  )}
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  onClick={handleClickTOFileUpload}
                />
                {/* Upload Evidence */}
              </button>
              <button
                className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition"
                onClick={handleSaveAndAddEvidence}
              >
                Save & Add Evidence
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

export default CaseEvidence;
