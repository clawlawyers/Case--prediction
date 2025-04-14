
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { CircularProgress } from "@mui/material";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const HorizontalBarChart = ({ Value }) => {
  const data = {
    labels: [
      "Evidence Analysis",
      "Procedural Compliance",
      "Legal Risk Factors",
      "Win Probability",
    ],
    datasets: [
      {
        label: "Categories",
        data: Value,
        backgroundColor: ["#22c55e", "#16a34a", "#15803d", "#166534"],
        borderRadius: {
          topRight: 10,
          bottomRight: 10,
          topLeft: 0,
          bottomLeft: 0
        },
        borderSkipped: false,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false, // Added to prevent chart from maintaining fixed aspect ratio
    plugins: {
      legend: {
        display: false,
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
          color: "#334155",
        },
        ticks: {
          color: "#fff",
          beginAtZero: true,
          callback: (value) => `${value}%`,
        },
        title: {
          display: true,
          text: "Average Score",
          color: "#fff",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#fff",
          font: {
            size: window.innerWidth < 768 ? 10 : 12, // Responsive font size
          },
        },
        title: {
          display: true,
          text: "Categories",
          color: "#fff",
        },
      },
    },
    animation: {
      duration: 1500,
    },
  };

  return (
    <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:w-[80%] lg:mx-auto">
      {Value?.length === 0 ? (
        <div className="grid place-content-center h-full">
          <CircularProgress size={50} sx={{ color: "white" }} />
        </div>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default HorizontalBarChart;