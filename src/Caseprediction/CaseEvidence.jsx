import React, { useState } from "react";
import Delete from "../assets/delete.png";
import Header from "../Header/Header";
import UploadIcon from "../assets/upload.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvidence, setEvidence } from "../features/EvidenceDetails";
import { openDialog } from "../features/Casedetails";
import { useNavigate } from "react-router-dom";
import { NODE_API_ENDPOINT } from "../utils/utils";

import { CircularProgress, Modal } from "@mui/material";
import toast from "react-hot-toast";
import CaseEvidenceModal from "./CaseEvidenceModal";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';//left

import ChevronRightIcon from '@mui/icons-material/ChevronRight';//right

function CaseEvidence() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const userid = useSelector((state) => state.auth.userId);
  const FinalEvidence = useSelector((state) => state.evidence.EvidenceDetail);

  const [evidenceType, setEvidenceType] = useState("");
  const [evidenceDetails, setEvidenceDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [addNewEvidence, setAddNewEvidence] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editDialogDetails, setEditDialogDetails] = useState("");
  const [showEvidence, setShowEvidence] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextEvidence = () => {
    setCurrentIndex(prev => Math.min(prev + 1, FinalEvidence.length - 1));
  };

  const handlePrevEvidence = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleSaveAndAddEvidence = (e) => {
    e.preventDefault();
    // const newEvidence = `${evidenceType} : \n ${evidenceDetails}`;
    const newEvidence = {
      type: evidenceType,
      details: evidenceDetails,
    };
    dispatch(setEvidence([...FinalEvidence, newEvidence]));
    // alert("Evidence saved and added successfully!");
    toast.success("Evidence saved successfully!");

    setEvidenceType("");
    setEvidenceDetails("");
    setAddNewEvidence(false);
    handleContinue(e);
  };
  console.log("Final Evidence:", FinalEvidence);

  const handleContinue = (e) => {
    e.preventDefault();
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

  const handleAddEvidence = () => {
    // if (addNewEvidence) {
    //   toast.error("Save the current evidence first!");
    // } else {
    //   setAddNewEvidence(true);
    // }
    setShowEvidence(!showEvidence)
  };

  const handleEditEvidence = (index) => {
    setOpenEditDialog(true);
    setEditDialogDetails({ ...FinalEvidence[index], index });
  };

  const handleDeleteEvidence = (index) => {
    dispatch(deleteEvidence({ index }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-700 to-gray-800 text-white font-sans">
      <header className="py-4">

        <div className="w-full sm:w-[90%] mx-auto px-8 sm:px-6 lg:px-8 py-4">
          <Header />
        </div>

      </header>
      <main className="mx-auto w-[calc(100%-40px)] max-w-7xl px-5 py-5 rounded-lg bg-gradient-to-b from-teal-800 to-teal-600 shadow-2xl">  
              <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl  font-bold text-gray-100">Case Prediction</h1>
          <div className="flex gap-2">

            {FinalEvidence.length > 0 &&


              <button
                onClick={handleAddEvidence}
                className="bg-teal-600 hover:bg-teal-500 
          px-1 py-1.5 text-xs          // Extra small text on mobile
          sm:text-sm                   // Small tablets
          md:px-4 md:py-2 md:text-base // Tablets
          lg:px-5                      // Desktop
          rounded-lg font-medium transition whitespace-nowra"
              >
                {showEvidence ? "Hide Evidence" : "Show Evidence"} {/* Shortened text */}
              </button>


            }

            <button
              onClick={handleContinue}
              className="bg-teal-600 hover:bg-teal-500 
              px-1 py-1.5 text-xs          // Extra small text on mobile
              sm:text-sm                   // Small tablets
              md:px-4 md:py-2 md:text-base // Tablets
              lg:px-5                      // Desktop
              rounded-lg font-medium transition whitespace-nowra"
            >
              Go Back
            </button>
          </div>
        </div>



        {/* Case Evidence Details */}
        <div className="flex flex-col gap-2">
          {/* Single Evidence Display (replaces the map) */}
          {showEvidence && <>
            {FinalEvidence.length > 0 ? (
              <div
                key={currentIndex}
                className="border border-teal-500 rounded-lg p-6 space-y-6 bg-teal-900 mt-[8px]"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">Case Evidence Details </h2>
                  <span className="text-teal-300 text-sm  whitespace-nowrap">
                    <button
                      onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
                      className="p-1 hover:bg-teal-800 rounded-full"
                      disabled={currentIndex === 0}
                    >
                      <KeyboardArrowLeftIcon />
                    </button>
                    {currentIndex + 1} of {FinalEvidence.length}
                    <button
                      onClick={() => setCurrentIndex(prev => Math.min(prev + 1, FinalEvidence.length - 1))}
                      className="p-1 hover:bg-teal-800 rounded-full"
                      disabled={currentIndex === FinalEvidence.length - 1}
                    >
                      <ChevronRightIcon />
                    </button>
                  </span>
                </div>

                <form className="space-y-6">
                  <input
                    readOnly
                    className="w-full px-4 py-2 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    style={{ background: "rgba(217, 217, 217, 0.2)" }}
                    value={FinalEvidence[currentIndex]?.type}
                  />

                  <div className="relative">
                    <textarea
                      readOnly
                      className="w-full px-4 py-3 min-h-4 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      style={{ background: "rgba(217, 217, 217, 0.2)" }}
                      rows="5"
                      value={FinalEvidence[currentIndex]?.details}
                    />
                  </div>
                </form>

                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition"
                    onClick={() => handleEditEvidence(currentIndex)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition"
                    onClick={() => handleDeleteEvidence(currentIndex)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}  </>}
        </div>

         {!showEvidence && addNewEvidence ? (
          <div className="border border-teal-500 rounded-lg p-6 space-y-6 bg-teal-900 mt-[8px]">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Add Evidence Details</h2>
              <span className="text-teal-300 text-xs sm:text-sm whitespace-nowrap">
                {/* <span className="cursor-pointer font-extrabold text-xl">
                      {"< "}
                    </span> */}
                Evidence No: {FinalEvidence?.length + 1}
                {/* <span className="cursor-pointer font-extrabold text-xl">
                      {" >"}
                    </span> */}
              </span>
            </div>

            <form onSubmit={handleSaveAndAddEvidence} className="space-y-6">
              {/* Select Dropdown */}
              <select
                required
                className="w-full px-4 py-2 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                style={{
                  background: "rgba(217, 217, 217, 0.2)",
                }}
                value={evidenceType}
                onChange={(e) =>
                  setEvidenceType(e.target.value === "" ? null : e.target.value)
                }
              >
                <option value="" disabled >
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
                  required
                  className="w-full px-4 py-3 min-h-20 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none "
                  style={{
                    background: "rgba(217, 217, 217, 0.2)",
                     
                  }}
                  rows="5"
                  placeholder="Enter Detailed Evidence"
                  value={evidenceDetails}
                  onChange={(e) => setEvidenceDetails(e.target.value)}
                ></textarea>
                <style>
  {`
    textarea::-webkit-scrollbar {
      width: 6px;
    }

    textarea::-webkit-scrollbar-track {
      background: transparent;
    }

    textarea::-webkit-scrollbar-thumb {
      background-color: #14b8a6;
      border-radius: 10px;
    }

    textarea::-webkit-scrollbar-button {
      display: none;
      height: 0;
    }

    textarea {
      scrollbar-width: thin;
      scrollbar-color: #14b8a6 transparent;
    }
  `}
</style>


              </div>


              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                {/* Text element */}
                <div className="text-sm whitespace-nowrap mb-2 md:mb-0">
                  Total Evidence Added:{" "}
                  <span className="font-bold text-teal-300">
                    {FinalEvidence?.length}
                  </span>
                </div>

                {/* Button group */}
                <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-2">
                  {/* Upload Evidence Button */}
                  <button
                    className="relative lg:w-[200px] bg-transparent px-3 py-1.5 text-sm md:px-4 lg:px-4 md:py-1 lg:text-base rounded-lg font-medium transition text-white group"
                    style={{
                      border: "2px solid transparent",
                      background: "transparent",
                      backgroundClip: "padding-box"
                    }}
                  >
                    <span
                      className="absolute inset-0 rounded-lg p-[2px]"
                      style={{
                        background: "linear-gradient(90deg, #00DDE5 0%, #00C37B 100%)",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        pointerEvents: "none"
                      }}
                    ></span>
                    <label className="flex justify-center items-center relative z-10" htmlFor="fileUpload">
                      {loading ? (
                        <CircularProgress size={16} sx={{ color: "white" }} />
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
                  </button>

                  {/* Save & Continue Button */}
                  <button
                    className="relative lg:w-[200px] bg-transparent px-3 py-1.5 text-sm md:px-4 lg:px-4 md:py-1 lg:text-base rounded-lg font-medium transition text-white group"
                    style={{
                      border: "2px solid transparent",
                      background: "transparent"
                    }}
                    type="submit"
                  >
                    <span
                      className="absolute inset-0 rounded-lg p-[2px]"
                      style={{
                        background: "linear-gradient(90deg, #00DDE5 0%, #00C37B 100%)",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        pointerEvents: "none"
                      }}
                    ></span>
                    <span className="relative z-10">
                      Save & Continue
                    </span>
                  </button>

                  {/* Skip & Continue Button */}
                  <button
                    className="relative lg:w-[200px] md:w-[150px] bg-transparent px-3 py-1.5 text-sm md:px-4 lg:px-4 md:py-1 lg:text-base rounded-lg font-medium transition text-white group"
                    style={{
                      border: "2px solid transparent",
                      background: "transparent"
                    }}
                    onClick={handleContinue}
                  >
                    <span
                      className="absolute inset-0 rounded-lg p-[2px]"
                      style={{
                        background: "linear-gradient(90deg, #00DDE5 0%, #00C37B 100%)",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        pointerEvents: "none"
                      }}
                    ></span>
                    <span className="relative z-10">
                       Continue
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : null}
        {!addNewEvidence && FinalEvidence.length !== 0 ? (
          <div className="w-full flex justify-center items-center py-2">
            <button
              className="bg-red hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition border"
              onClick={handleContinue}
            >
              Save & Continue
            </button>
          </div>
        ) : null}
      </main>
      <Modal open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <div
          // className={Styles.scrollable}
          className="w-[80%] md:w-[60%]"
          style={{
            // backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            color: "black",
            borderRadius: 10,
            padding: 10,
            transform: "translate(-50%, -50%)",
            boxShadow: 24,
          }}
        >
          <CaseEvidenceModal
            evidenceObj={editDialogDetails}
            setOpenEditDialog={setOpenEditDialog}
          />
        </div>
      </Modal>
    </div>
  );
}

export default CaseEvidence;
