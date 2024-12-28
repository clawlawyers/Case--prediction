import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const WinBarChart = ({ Value }) => {
  const data = {
    labels: ["Statutory Alignment", "Precedent Support", "Case Merits"], // X-axis labels
    datasets: [
      {
        label: "Probability(%)",
        data: Value, // Data points for the bars
        backgroundColor: ["#0ea5e9", "#0d9488", "#22c55e"], // Bar colors
        borderColor: ["#0ea5e9", "#0d9488", "#22c55e"], // Border colors
        borderWidth: 1,
        borderRadius: 10, // Rounded corners for bars
        barPercentage: 0.6, // Adjust width of bars
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}%`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove grid lines on X-axis
        },
        ticks: {
          color: "#fff", // White text for labels
        },
        title: {
          display: true,
          text: "Factors",
          color: "#fff",
        },
      },
      y: {
        grid: {
          //   display: false,
          color: "#334155",
        },
        ticks: {
          color: "#fff", // White text for labels
          beginAtZero: true,
          callback: (value) => `${value}%`, // Add '%' to Y-axis labels
        },
        title: {
          display: true,
          text: "Probability(%)",
          color: "#fff",
        },
      },
    },
    animation: {
      duration: 1500, // Animation duration
    },
  };

  return (
    <div className="m-auto">
      {Value.length === 0 ? (
        <div className="grid place-content-center m-10">
          <CircularProgress size={50} sx={{ color: "white" }} />
        </div>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default WinBarChart;
