// import React, { useState } from "react";
// import Delete from "../assets/delete.png";
// import UploadIcon from "../assets/upload.png"; // Add your upload icon path here
// import Header from "../Header/Header";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setTestimony } from "../features/Testimony";
// import { openDialog } from "../features/Casedetails";

// function CaseTestimonal() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const FinalTestimony = useSelector(
//     (state) => state.testimony.TestimonyDetail
//   );
//   // const [evidenceType, setEvidenceType] = useState("");
//   const [testimonyDetails, setTestimonyDetails] = useState("");

//   const handleSaveAndAddTestimony = () => {
//     const newTestimony = `Witness ${
//       FinalTestimony?.length + 1
//     }:\n ${testimonyDetails}`;
//     dispatch(setTestimony([...FinalTestimony, newTestimony]));
//     setTestimonyDetails("");
//   };
//   console.log(FinalTestimony);

//   const handleContinue = () => {
//     dispatch(openDialog(true));
//     navigate("/input");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-teal-700 to-gray-800 text-white font-sans">
//       {/* Navbar */}
//       <header className="py-4">
        
        
//         <div className="w-full sm:w-[90%] mx-auto px-8 sm:px-6 lg:px-8 py-4">
//           <Header />
//         </div>
//       </header>

//       {/* Case Prediction Section */}
//       <main className="mx-auto max-w-7xl p-8 rounded-lg bg-gradient-to-b from-teal-800 to-teal-600 shadow-2xl">
//         {/* Title and Go Back */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-100">Case Prediction</h1>
//           <button className="text-teal-300 hover:text-white font-medium transition"onClick={handleContinue}>
//             Go Back
//           </button>
//         </div>

//         {/* Case Evidence Details */}
//         <div className="border border-teal-500 rounded-lg p-6 space-y-6 bg-teal-900">
//           <div className="flex justify-between items-center">
//             <h2 className="text-lg font-medium">Case Testimony Details</h2>
//             <span className="text-teal-300 text-sm">
//               Testimony No: {FinalTestimony?.length + 1}
//             </span>
//           </div>

//           {/* Form */}
//           <form className="relative space-y-6">
//             <textarea
//               className="w-full px-4 py-3 min-h-4 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//               style={{
//                 background: "rgba(217, 217, 217, 0.2)",
//               }}
//               rows="5"
//               placeholder="Enter Detailed Testimony"
//               value={testimonyDetails}
//               onChange={(e) => setTestimonyDetails(e.target.value)}
//             ></textarea>
//             {/* Upload Icon */}
//             {/* <button
//               type="button"
//               className="absolute top-[-20px] right-2 bg-teal-600 p-2 rounded-full hover:bg-teal-500 focus:outline-none transition"
//               title="Upload Document"
//             >
//               <img src={UploadIcon} alt="Upload" className="h-4 w-4" />
//             </button> */}
//           </form>

//           {/* Buttons and Evidence Count */}
//           <div className="flex justify-between items-center">
//             <div className="text-sm">
//               Testimony Count:{" "}
//               <span className="font-bold text-teal-300">
//                 {FinalTestimony?.length}
//               </span>
//             </div>
//             <div className="flex space-x-4">
//               {/* <button
//                 className="flex items-center justify-center text-white rounded-full h-10 w-10"
//                 title="Delete Evidence"
//               >
//                 <img src={Delete} alt="Delete Evidence" className="h-6 w-6" />
//               </button> */}
//               {/* <button className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition">
//                 Upload Testimony
//               </button> */}
//               <button
//                 className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition"
//                 onClick={handleSaveAndAddTestimony}
//               >
//                 Save & Add Testimony
//               </button>
//               <button
//                 className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition"
//                 onClick={handleContinue}
//               >
//                 Continue
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default CaseTestimonal;

import React, { useState } from "react";
import Delete from "../assets/delete.png";
import Header from "../Header/Header";
import UploadIcon from "../assets/upload.png";
import { useDispatch, useSelector } from "react-redux";
import { setTestimony, deleteTestimony } from "../features/Testimony";
import { openDialog } from "../features/Casedetails";
import { useNavigate } from "react-router-dom";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { CircularProgress, Modal } from "@mui/material";
import toast from "react-hot-toast";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function CaseTestimonal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const userid = useSelector((state) => state.auth.userId);
  const FinalTestimony = useSelector((state) => state.testimony.TestimonyDetail);

  const [testimonyDetails, setTestimonyDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTestimony, setShowTestimony] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
const [editedTestimony, setEditedTestimony] = useState("");
const [editingIndex, setEditingIndex] = useState(null);

  const handleNextTestimony = () => {
    setCurrentIndex(prev => Math.min(prev + 1, FinalTestimony.length - 1));
  };

  const handlePrevTestimony = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleSaveAndAddTestimony = (e) => {
    e.preventDefault();
    const newTestimony = {
      details: testimonyDetails,
    };
    dispatch(setTestimony([...FinalTestimony, newTestimony]));
    toast.success("Testimony saved successfully!");
    setTestimonyDetails("");
    setShowTestimony(true);
    navigate("/input");
  };

  const handleContinue = (e) => {
    e.preventDefault();
    dispatch(openDialog(true));
    navigate("/input");
  };

  



  const handleToggleTestimony = () => {
    setShowTestimony(!showTestimony);
  };

  const handleDeleteTestimony = (index) => {
    dispatch(deleteTestimony({ index }));
    
    // Adjust currentIndex if needed
    if (currentIndex >= FinalTestimony.length - 1) {
      setCurrentIndex(Math.max(0, FinalTestimony.length - 2));
    } else if (currentIndex >= index) {
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
    
    toast.success("Testimony deleted successfully!");
  };

  const handleEditTestimony = (index) => {
    setEditingIndex(index);
    setEditedTestimony(FinalTestimony[index]?.details || "");
    setEditMode(true);
  };
  
  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedTestimonies = [...FinalTestimony];
      updatedTestimonies[editingIndex] = {
        ...updatedTestimonies[editingIndex],
        details: editedTestimony
      };
      dispatch(setTestimony(updatedTestimonies));
      toast.success("Testimony updated successfully!");
      setEditMode(false);
      setEditingIndex(null);
      setEditedTestimony("");
    }
  };
  
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingIndex(null);
    setEditedTestimony("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-700 to-gray-800 text-white font-sans">
      <header className="py-4">
        <div className="w-full sm:w-[90%] mx-auto px-8 sm:px-6 lg:px-8 py-4">
          <Header />
        </div>
      </header>

      <main className="mx-auto max-w-7xl  w-[calc(100%-40px)] px-8 py-5 rounded-lg bg-gradient-to-b from-teal-800 to-teal-600 shadow-2xl Lg:max-h-[calc(70vh-60px)] ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl  font-bold text-gray-100">Case Prediction</h1>
          <div className="flex gap-2">
            {FinalTestimony.length > 0 && (
              <button
                onClick={handleToggleTestimony}
                className="bg-teal-600 hover:bg-teal-500 px-1 py-1.5 text-xs sm:text-sm md:px-4 md:py-2 md:text-base lg:px-5 rounded-lg font-medium transition whitespace-nowrap"
              >
                {showTestimony ? "Hide Testimony" : "Show Testimony"}
              </button>
            )}
            <button
              onClick={handleContinue}
              className="bg-teal-600 hover:bg-teal-500 px-1 py-1.5 text-xs sm:text-sm md:px-4 md:py-2 md:text-base lg:px-5 rounded-lg font-medium transition whitespace-nowrap"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Testimony Display */}
        {showTestimony && FinalTestimony.length > 0 && (
  <div className="border border-teal-500 rounded-lg p-6 space-y-6 bg-teal-900 mt-[8px]">
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-medium">
        {editMode ? "Edit Testimony" : "Case Testimony Details"}
      </h2>
      <span className="text-teal-300 text-sm whitespace-nowrap">
        <button
          onClick={handlePrevTestimony}
          className="p-1 hover:bg-teal-800 rounded-full"
          disabled={currentIndex === 0 || editMode}
        >
          <KeyboardArrowLeftIcon />
        </button>
        {currentIndex + 1} of {FinalTestimony.length}
        <button
          onClick={handleNextTestimony}
          className="p-1 hover:bg-teal-800 rounded-full"
          disabled={currentIndex === FinalTestimony.length - 1 || editMode}
        >
          <ChevronRightIcon />
        </button>
      </span>
    </div>

    <form className="space-y-6">
      <div className="relative">
        {editMode && editingIndex === currentIndex ? (
          <textarea
            className="w-full px-4 py-3 min-h-4 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            style={{ background: "rgba(217, 217, 217, 0.2)" }}
            rows="5"
            value={editedTestimony}
            onChange={(e) => setEditedTestimony(e.target.value)}
          />
        ) : (
          <textarea
            readOnly
            className="w-full px-4 py-3 min-h-4 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            style={{ background: "rgba(217, 217, 217, 0.2)" }}
            rows="5"
            value={FinalTestimony[currentIndex]?.details}
          />
        )}
        {/* Keep your existing scrollbar styles */}
      </div>
    </form>

    <div className="flex justify-end space-x-4">
      {editMode && editingIndex === currentIndex ? (
        <>
          <button
            className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
          <button
            className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition"
            onClick={handleSaveEdit}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <button
            className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition"
            onClick={() => handleEditTestimony(currentIndex)}
          >
            Edit
          </button>
          <button
            className="bg-teal-600 hover:bg-teal-500 px-5 py-2 rounded-lg font-medium transition"
            onClick={() => handleDeleteTestimony(currentIndex)}
            disabled={editMode}
          >
           
            Delete
          </button>
        </>
      )}
    </div>
  </div>
)}

        {/* Add New Testimony Form */}
       { !showTestimony &&<div className="border border-teal-500 rounded-lg p-6 space-y-6 bg-teal-900 mt-[8px] lg:min-h-[350px]">
          <div className="flex justify-between items-center">
            <h2 className="text-1xl md:text-2xl ">Add New Testimony</h2>
            <span className="text-teal-300 text-xs sm:text-sm whitespace-nowrap">
              Testimony No: {FinalTestimony?.length + 1}
            </span>
          </div>

          <form onSubmit={handleSaveAndAddTestimony} className="space-y-6">
            <div className="relative">
              <textarea
                required
                className="w-full px-4 py-3 min-h-20 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                style={{
                  background: "rgba(217, 217, 217, 0.2)",
                }}
                rows="5"
                placeholder="Enter Detailed Testimony"
                value={testimonyDetails}
                onChange={(e) => setTestimonyDetails(e.target.value)}
              />
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
              <div className="text-sm whitespace-nowrap mb-2 md:mb-0">
                Total Testimony Added:{" "}
                <span className="font-bold text-teal-300">
                  {FinalTestimony?.length}
                </span>
              </div>

              <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-2">
               

                <button
                  className="relative md:w-[200px] bg-transparent px-3 py-1.5 text-sm md:px-4 lg:px-4 md:py-1 lg:text-base rounded-lg font-medium transition text-white group"
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

                <button
                  className="relative md:w-[200px]  bg-transparent px-3 py-1.5 text-sm md:px-4 lg:px-4 md:py-1 lg:text-base rounded-lg font-medium transition text-white group"
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
        </div>}
      </main>
    </div>
  );
}

export default CaseTestimonal;