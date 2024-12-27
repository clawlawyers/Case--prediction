import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { setuserId } from "../features/AuthDetails";
import { openDialog } from "../features/Casedetails";
import { Alert, CircularProgress } from "@mui/material";
const CasePredictionInput = () => {
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [caseType, setCaseType] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [court, setCourt] = useState("");
  const [caseDetails, setCaseDetails] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [FinalLoading, setFinalLoading] = useState(false);

  const navigate = useNavigate();

  const userid = useSelector((state) => state.auth.userId);
  const isDialogOpen = useSelector((state) => state.case.isDialogOpen);
  const FinalEvidence = useSelector((state) => state.evidence.EvidenceDetail);
  const FinalTestimony = useSelector(
    (state) => state.testimony.TestimonyDetail
  );

  const supremeCourt = ["Supreme Court of India"];

  const highCourts = [
    "Allahabad High Court",
    "Andhra Pradesh High Court",
    "Bombay High Court",
    "Calcutta High Court",
    "Chhattisgarh High Court",
    "Delhi High Court",
    "Gauhati High Court",
    "Gujarat High Court",
    "Himachal Pradesh High Court",
    "Jammu and Kashmir and Ladakh High Court",
    "Jharkhand High Court",
    "Karnataka High Court",
    "Kerala High Court",
    "Madhya Pradesh High Court",
    "Madras High Court",
    "Manipur High Court",
    "Meghalaya High Court",
    "Orissa High Court",
    "Patna High Court",
    "Punjab and Haryana High Court",
    "Rajasthan High Court",
    "Sikkim High Court",
    "Telangana High Court",
    "Tripura High Court",
    "Uttarakhand High Court",
  ];

  const districtCourts = [
    "Anantapur District Court",
    "Chittoor District Court",
    "Guntur District Court",
    "Krishna District Court",
    "East Godavari District Court",
    "Tawang District Court",
    "Itanagar District Court",
    "Bomdila District Court",
    "Kamrup District Court (Guwahati)",
    "Jorhat District Court",
    "Dibrugarh District Court",
    "Cachar District Court (Silchar)",
    "Patna District Court",
    "Gaya District Court",
    "Bhagalpur District Court",
    "Muzaffarpur District Court",
    "Raipur District Court",
    "Bilaspur District Court",
    "Durg District Court",
    "Rajnandgaon District Court",
    "North Goa District Court (Panaji)",
    "South Goa District Court (Margao)",
    "Ahmedabad District Court",
    "Surat District Court",
    "Vadodara District Court",
    "Rajkot District Court",
    "Bhavnagar District Court",
    "Ambala District Court",
    "Gurgaon District Court",
    "Faridabad District Court",
    "Karnal District Court",
    "Shimla District Court",
    "Mandi District Court",
    "Kangra District Court",
    "Solan District Court",
    "Srinagar District Court",
    "Jammu District Court",
    "Leh District Court",
    "Kargil District Court",
    "Ranchi District Court",
    "Dhanbad District Court",
    "Jamshedpur District Court",
    "Bokaro District Court",
    "Bengaluru District Court",
    "Mysuru District Court",
    "Hubli-Dharwad District Court",
    "Mangaluru District Court",
    "Thiruvananthapuram District Court",
    "Ernakulam District Court",
    "Kozhikode District Court",
    "Kannur District Court",
    "Bhopal District Court",
    "Indore District Court",
    "Jabalpur District Court",
    "Gwalior District Court",
    "Mumbai District Court",
    "Pune District Court",
    "Nagpur District Court",
    "Nashik District Court",
    "Imphal East District Court",
    "Imphal West District Court",
    "Churachandpur District Court",
    "Shillong District Court (East Khasi Hills)",
    "West Garo Hills District Court",
    "Aizawl District Court",
    "Lunglei District Court",
    "Kohima District Court",
    "Dimapur District Court",
    "Cuttack District Court",
    "Bhubaneswar District Court",
    "Sambalpur District Court",
    "Berhampur District Court",
    "Ludhiana District Court",
    "Amritsar District Court",
    "Jalandhar District Court",
    "Patiala District Court",
    "Jaipur District Court",
    "Jodhpur District Court",
    "Udaipur District Court",
    "Ajmer District Court",
    "Gangtok District Court",
    "Namchi District Court",
    "Chennai District Court",
    "Coimbatore District Court",
    "Madurai District Court",
    "Tiruchirappalli District Court",
    "Hyderabad District Court",
    "Warangal District Court",
    "Karimnagar District Court",
    "Agartala District Court",
    "Kailashahar District Court",
    "Allahabad District Court",
    "Lucknow District Court",
    "Kanpur District Court",
    "Agra District Court",
    "Varanasi District Court",
    "Dehradun District Court",
    "Haridwar District Court",
    "Nainital District Court",
    "Kolkata District Court",
    "Howrah District Court",
    "Darjeeling District Court",
    "Asansol District Court",
    "Delhi District Court (Various)",
    "Chandigarh District Court",
    "Kavaratti District Court (Lakshadweep)",
    "Puducherry District Court",
    "Karaikal District Court",
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${NODE_API_ENDPOINT}/casePrediction/user_id`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application-json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          dispatch(setuserId(data.data.user_id));
          console.log(data.data.user_id);
          console.log("API Data:", data);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error in API call:", error);
      }
    };
    if (!userid) {
      fetchData();
    }
  }, []);

  const handleContinue = () => {
    dispatch(openDialog(true));
  };

  const handleFileChange = (e) => {
    // Get the selected file
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
    }
  };

  const getCourtsByJurisdiction = () => {
    if (jurisdiction === "District Court") {
      return districtCourts;
    } else if (jurisdiction === "State Court") {
      return highCourts;
    } else if (jurisdiction === "Supreme Court") {
      return supremeCourt;
    }
    return [];
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // API call
      setLoading(true);
      const response = await fetch(
        `${NODE_API_ENDPOINT}/casePrediction/api/case_details`,
        {
          method: "POST",
          body: JSON.stringify({
            user_id: userid,
            case_type: caseType,
            jurisdiction: jurisdiction,
            case_overview: caseDetails,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setLoading(false);
        console.error("Error:", response.statusText);
        alert("Failed to submit the case. Please try again.");
        return;
      }
      const data = await response.json();
      console.log("Success:", data);
      // console.log(formData);
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadResponse = await fetch(
          `${NODE_API_ENDPOINT}/casePrediction/api/case_document`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (!uploadResponse.ok) {
          setLoading(false);
          console.error("Error uploading file:", uploadResponse.statusText);
          alert("Failed to upload the file. Please try again.");
          return;
        }
        console.log("File uploaded successfully!");
        setSelectedFile(null);
        setLoading(false);
        handleContinue();
      }
      handleContinue();
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error("Error:", error);
      alert("An error occurred while submitting the case.");
    }
  };

  const concatenateStringOfArrays = (arr) => {
    let result = "";
    for (let i = 0; i < arr.length; i++) {
      result += arr[i];
    }
    return result;
  };

  const handleContinueToPrediction = async () => {
    setFinalLoading(true);

    const evidenceDetails = concatenateStringOfArrays(FinalEvidence);
    try {
      const pushEvidenceToML = await fetch(
        `${NODE_API_ENDPOINT}/casePrediction/api/evidence_details`,
        {
          method: "POST",
          body: JSON.stringify({
            user_id: userid,
            evidence: evidenceDetails,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!pushEvidenceToML.ok) {
        setFinalLoading(false);
        console.error(
          "Error pushing evidence to ML:",
          pushEvidenceToML.statusText
        );
        alert("Failed to push evidence to ML. Please try again.");
        return;
      }
      const witnessDetails = concatenateStringOfArrays(FinalTestimony);
      const pushTestimonyToML = await fetch(
        `${NODE_API_ENDPOINT}/casePrediction/api/witness_details`,
        {
          method: "POST",
          body: JSON.stringify({
            user_id: userid,
            witness_statement: witnessDetails,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!pushTestimonyToML.ok) {
        setFinalLoading(false);
        console.error(
          "Error pushing testimony to ML:",
          pushTestimonyToML.statusText
        );
        alert("Failed to push testimony to ML. Please try again.");
        return;
      }
      console.log("Evidence and testimony pushed to ML successfully!");
      setFinalLoading(false);
      navigate("/loading");
    } catch (error) {
      setFinalLoading(false);
      console.error("Error:", error);
      alert("An error occurred while predicting the case outcome.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-teal-900 to-teal-700 min-h-screen text-white font-['Plus Jakarta Sans']">
      {/* Fixed Header */}
      <header>
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
            <form onSubmit={handleSubmit}>
              {/* Dropdowns */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                <select
                  className="text-gray-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                  style={{
                    background: "rgba(217, 217, 217, 0.2)",
                  }}
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value)}
                >
                  <option value="" disabled>
                    Select Your Case Type
                  </option>
                  <option value="Criminal">Criminal</option>
                  <option value="Civil">Civil</option>
                  <option value="Family">Family</option>
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
                      onChange={(e) => setJurisdiction(e.target.value)}
                    />
                    <span className="ml-2 text-xs">District Court</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="jurisdiction"
                      value="State Court"
                      className="text-teal-600 focus:ring-teal-500"
                      onChange={(e) => setJurisdiction(e.target.value)}
                    />
                    <span className="ml-2 text-xs">High Court</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="jurisdiction"
                      value="Supreme Court"
                      className="text-teal-600 focus:ring-teal-500"
                      onChange={(e) => setJurisdiction(e.target.value)}
                    />
                    <span className="ml-2 text-xs">Supreme Court</span>
                  </label>
                </div>

                <div className="flex-1">
                  <select
                    className="text-gray-400 px-4 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    style={{
                      background: "rgba(217, 217, 217, 0.2)",
                    }}
                    value={court}
                    onChange={(e) =>
                      setCourt(e.target.value === "" ? null : e.target.value)
                    }
                  >
                    <option value="">Select Your Court</option>
                    {getCourtsByJurisdiction().map((courtName, index) => (
                      <option key={index} value={courtName}>
                        {courtName}
                      </option>
                    ))}
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
                placeholder="Enter Your Detailed Case Overview"
                value={caseDetails}
                onChange={(e) => setCaseDetails(e.target.value)}
              ></textarea>

              {/* File Upload */}
              <div className="flex w-full justify-between mb-6">
                {/* Conditional Rendering */}
                {!selectedFile ? (
                  <>
                    {/* Upload Button */}
                    <label
                      htmlFor="fileUpload"
                      className="w-full text-center bg-teal-800 hover:bg-teal-700 border-green-500 border-[1px] py-2 rounded-lg cursor-pointer text-white"
                    >
                      Upload Case Document
                    </label>
                    <input
                      id="fileUpload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </>
                ) : (
                  // If file is uploaded, show the success alert
                  <Alert severity="success" className="w-full mt-2">
                    File uploaded successfully!
                  </Alert>
                )}
              </div>
              {/* Analyze Case Button */}
              <button
                type="submit"
                className="w-full hover:text-black py-3 rounded hover:bg-gray-300 hover:opacity-90 transition relative overflow-hidden"
                style={{
                  border: "1px solid transparent",
                  borderImageSource:
                    "linear-gradient(90deg, #00DDE5 0%, #00C37B 100%)",
                  borderImageSlice: 1,
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Continue"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md text-center">
            <h2 className="text-2xl font-bold text-teal-700 mb-4">
              Upload Documents
            </h2>
            <div className="mb-4 flex justify-between">
              <p className="text-black">
                Total Evidence Uploaded: {FinalEvidence?.length}
              </p>
              <button className="bg-teal-600 text-white px-4 rounded-md hover:bg-teal-700 mt-2">
                <Link to="/evidence">Add Evidence</Link>
              </button>
            </div>
            <div className="mb-4 flex justify-between ">
              <p className="text-black">
                Total Testimony Uploaded: {FinalTestimony?.length}
              </p>
              <button className="bg-teal-600 text-white px-4  rounded-md hover:bg-teal-700 mt-2">
                <Link to="/testimonial">Add Testimony</Link>
              </button>
            </div>
            <button
              className="w-full bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800 mt-4"
              onClick={handleContinueToPrediction}
            >
              {FinalLoading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CasePredictionInput;
