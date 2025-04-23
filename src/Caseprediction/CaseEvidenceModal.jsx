import React, { useState } from "react";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { Close } from "@mui/icons-material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeEvidence } from "../features/EvidenceDetails";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; //left
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; //right

const CaseEvidenceModal = ({ evidenceObj, setOpenEditDialog }) => {
  const [evidenceType, setEvidenceType] = useState(evidenceObj.type);
  const [evidenceDetails, setEvidenceDetails] = useState(evidenceObj.details);
  const [loading, setLoading] = useState(false);

  const userid = useSelector((state) => state.auth.userId);

  const dispatch = useDispatch();

  const handleFileChange = async (e) => {
    e.preventDefault();
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
      // setSelectedFile(renamedFile);
      // console.log("File renamed to:", renamedFile);

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

  const handleEditEvidence = () => {
    dispatch(
      changeEvidence({
        evidenceDetails: {
          type: evidenceType,
          details: evidenceDetails,
        },
        index: evidenceObj.index,
      })
    );
    setOpenEditDialog(false);
  };

  return (
    <div className="border border-teal-500 rounded-lg p-6 space-y-6 bg-teal-900">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">
          Edit Evidence Details
        </h2>
        <Close
          className="cursor-pointer"
          sx={{ color: "white" }}
          onClick={() => setOpenEditDialog(false)}
        />
      </div>

      <form className="space-y-6">
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
            required
            className="w-full px-4 py-3 min-h-20 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            style={{
              background: "rgba(217, 217, 217, 0.2)",
            }}
            rows="5"
            placeholder="Enter Detailed Evidence"
            value={evidenceDetails}
            onChange={(e) => setEvidenceDetails(e.target.value)}
          ></textarea>
          {/* <DriveFolderUploadIcon
            sx={{ color: "white" }}
            className="absolute right-3 top-3 cursor-pointer"
          /> */}
          <div className="flex items-center my-1">
            <hr className="flex-grow border-white" />
            <span className="mx-2 text-white">OR</span>
            <hr className="flex-grow border-white" />
          </div>
          <div className="flex justify-center items-center">
            <div className="w-1/3 bg-teal-600 hover:bg-teal-500 py-2 rounded-lg font-medium transition text-white">
              <label
                className="flex justify-center items-center"
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
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex w-full justify-end space-x-4">
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition text-white"
              onClick={handleEditEvidence}
            >
              Save Evidence
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CaseEvidenceModal;
