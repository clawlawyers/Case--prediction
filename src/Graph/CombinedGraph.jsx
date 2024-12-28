import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CombinedGraph = ({ Value }) => {
  const data = {
    labels: [
      "Filing Costs",
      "Lawyer Fees",
      "Other Procedural Costs",
      "Total Estimated Compensation",
    ],
    datasets: [
      {
        label: "Amount",
        data: Value,
        backgroundColor: ["#1ABAEF", "#006C81", "#004D63", "#00D88A"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Costs and Compensation",
        color: "#FFFFFF",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.raw > 0 ? "" : "-"}$${Math.abs(context.raw)}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Categories",
          color: "#FFFFFF",
        },
        ticks: {
          color: "#FFFFFF",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
          color: "#FFFFFF",
        },
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  };

  return (
    <>
      {Value.length === 0 ? (
        <div className="grid place-content-center m-10">
          <CircularProgress size={50} sx={{ color: "white" }} />
        </div>
      ) : (
        <Bar className="" data={data} options={options} />
      )}
    </>
  );
};

export default CombinedGraph;
