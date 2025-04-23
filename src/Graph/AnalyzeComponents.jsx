import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import PieChart from "./PieChart";
import WinBarChart from "./BarCharts/WinBarChart";
import HorizontalBarChart from "./HorizontalBarChart";
import CombinedGraph from "./CombinedGraph";
import LegalBarChart from "./BarCharts/LegalBarChart";
import ProceduralBarChart from "./BarCharts/ProceduralBarChart";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Popover } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useNavigate } from "react-router-dom";
import AskQuery from "./AskQuery";
import { openDialog } from "../features/Casedetails";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const AnalyzeComponents = () => {
  const userid = useSelector((state) => state.auth.userId);

  const [evidenceAnalysis, setEvidenceAnalysis] = useState([]);
  const [proceduralCompliance, setProceduralCompliance] = useState([]);
  const [legalFactors, setLegalFactors] = useState([]);
  const [cost, setCost] = useState([]);
  const [winProbability, setWinProbability] = useState([]);
  const [overallScore, setOverallScore] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [recommendedAction, setRecommendedAction] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const extractDataFromObject = (data) => {
    const arrData = [];
    for (let key in data) {
      arrData.push(data[key]);
    }
    return arrData;
  };

  function convertToNumbers(stringArray) {
    return stringArray.map((item) => parseInt(item.replace(",", ""), 10));
  }

  const getGraphData = async (apiRoute, settingFunction) => {
    try {
      const response = await fetch(
        `${NODE_API_ENDPOINT}/casePrediction/api/${apiRoute}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userid,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      console.log(data);
      const ProbabilityData = extractDataFromObject(data.data);
      console.log(ProbabilityData);
      if (apiRoute === "cost") {
        const respo = convertToNumbers(ProbabilityData);
        settingFunction(respo);
      } else {
        settingFunction(ProbabilityData);
      }
      return ProbabilityData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const getAlldata = async () => {
      await getGraphData("evidence_analysis", setEvidenceAnalysis);
      await getGraphData("procedural_compliance", setProceduralCompliance);
      await getGraphData("legal_factors", setLegalFactors);
      await getGraphData("cost", setCost);
      await getGraphData("win_probability", setWinProbability);
      await getGraphData("overall_score", setOverallScore);
    };
    if (userid !== null) {
      getAlldata();
    }
  }, []);

  const handleContinue = (e) => {
    e.preventDefault();
    dispatch(openDialog(true));
    navigate("/input");
  };

  const handleRecommendedActions = async () => {
    setShowDialog(true);
    try {
      const response = await fetch(
        `${NODE_API_ENDPOINT}/casePrediction/api/recommendation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userid,
          }),
        }
      );
      const data = await response.json();
      setRecommendedAction(
        data.data
          .replaceAll("\\\\n\\\\n", "<br/>")
          .replaceAll("\\\\n", "<br/>")
          .replaceAll("\\n\\n", "<br/>")
          .replaceAll("\\n", "<br/>")
          .replaceAll("\n", "<br/>")
          .replaceAll(/\*([^*]+)\*/g, "<strong>$1</strong>")
          .replaceAll("\\", "")
          .replaceAll('"', "")
          .replaceAll(":", " :")
          .replaceAll("#", "")
      );
      console.log(data);
    } catch (err) {
      console.log(err);
      setShowDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-700 to-gray-900 text-white pb-5">
      <header className="py-4">
        
          <div className="w-full sm:w-[90%] mx-auto px-8 sm:px-6 lg:px-8 py-4">
                  <Header />
                </div>
      </header>
      <div className="w-full px-4 md:w-[80%] md:m-auto flex flex-col gap-3">
  {/* Header Section */}
  <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
    <h1 className="text-xl sm:text-2xl font-bold">Case Analysis</h1>
    <div className="flex gap-3 items-center">
      <button
        onClick={handleContinue}
        className="bg-teal-600 hover:bg-teal-500 px-3 sm:px-5 py-2 rounded-lg font-medium transition text-sm sm:text-base"
      >
        Go Back
      </button>
      <HelpOutlineIcon className="cursor-pointer" onClick={handleClick} />
      <Popover
  id={id}
  open={open}
  anchorEl={anchorEl}
  onClose={handleClose}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "left",
  }}
  transformOrigin={{
    vertical: "top",
    horizontal: "left",
  }}
  sx={{
    "& .MuiPopover-paper": {
      marginLeft: { xs: 0, md: "-16px" }, // Shifts left on medium+ screens
      marginTop: "8px" // Adds small gap from anchor element
    }
  }}
>
  <div className="h-[300px] sm:h-[450px] w-[280px] sm:w-[350px] border">
    <AskQuery handleClose={handleClose} />
  </div>
</Popover>
    </div>
  </div>

  {/* Main Chart */}
  <div className="w-full bg-white bg-opacity-25 p-3 rounded-lg border">
    <h1 className="text-white text-center text-sm sm:text-base">
      Average Score For Each Category
    </h1>
    <HorizontalBarChart Value={overallScore} />
  </div>

  {/* First Row of Charts */}
  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
    <div className="w-full bg-white bg-opacity-25 p-3 rounded-lg border flex flex-col items-center justify-between">
      <h1 className="text-white text-center text-sm sm:text-base">
        Win Probability (Factor Wise)
      </h1>
      <div className="w-full h-full flex-1">
        <WinBarChart Value={winProbability} />
      </div>
    </div>
    <div className="w-full h-full bg-white bg-opacity-25 p-3 rounded-lg border flex flex-col items-center justify-between">
      <h1 className="text-white text-center text-sm sm:text-base">
        Evidence Analysis Strength
      </h1>
      <PieChart Value={evidenceAnalysis} />
    </div>
  </div>

  {/* Second Row of Charts */}
  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
    <div className="w-full bg-white bg-opacity-25 p-3 rounded-lg border flex flex-col items-center justify-between">
      <h1 className="text-white text-center text-sm sm:text-base">
        Legal Complexity Factors
      </h1>
      <div className="w-full h-full flex-1">
        <LegalBarChart Value={legalFactors} />
      </div>
    </div>
    <div className="w-full bg-white bg-opacity-25 p-3 rounded-lg border flex flex-col items-center justify-between">
      <h1 className="text-white text-center text-sm sm:text-base">
        Procedural Viability Compliance
      </h1>
      <div className="w-full h-full flex-1">
        <ProceduralBarChart Value={proceduralCompliance} />
      </div>
    </div>
  </div>

  {/* Combined Graph */}
  <div className="bg-white bg-opacity-25 rounded-lg border pt-5 sm:pt-10 px-3 sm:px-5">
    <CombinedGraph Value={cost} />
  </div>

  {/* Recommended Actions */}
  <div className="bg-white bg-opacity-25 rounded-lg border py-2 px-3 sm:px-5 flex flex-col justify-between items-center">
    <div className="w-full flex justify-between items-center">
      <p className="text-base sm:text-lg font-bold">Recommended Actions</p>
      {showDialog ? (
        <RemoveCircleOutlineIcon
          className="cursor-pointer"
          onClick={() => setShowDialog(false)}
        />
      ) : (
        <AddCircleOutlineIcon
          onClick={handleRecommendedActions}
          className="cursor-pointer"
        />
      )}
    </div>
    {showDialog && (
      <div className="w-full">
        {recommendedAction === "" ? (
          <CircularProgress sx={{ color: "white" }} />
        ) : (
          <p
            dangerouslySetInnerHTML={{ __html: recommendedAction }}
            className="py-2 text-xs sm:text-sm text-white rounded-t-xl rounded-r-xl"
          ></p>
        )}
      </div>
    )}
  </div>
</div>
    </div>
  );
};

export default AnalyzeComponents;
