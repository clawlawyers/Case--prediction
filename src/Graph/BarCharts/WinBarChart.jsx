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

const WinBarChart = ({ Value }) => {
  const data = {
    labels: ["Statutory Alignment", "Precedent Support", "Case Merits"],
    datasets: [
      {
        label: "Probability(%)",
        data: Value,
        backgroundColor: ["#0ea5e9", "#0d9488", "#22c55e"],
        borderColor: ["#0ea5e9", "#0d9488", "#22c55e"],
        borderWidth: 1,
        borderRadius: 10,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Added for better responsiveness
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
          text: "Factors",
          color: "#fff",
          font: {
            size: window.innerWidth < 768 ? 12 : 14, // Responsive title size
          },
        },
      },
      y: {
        grid: {
          color: "#334155",
        },
        ticks: {
          color: "#fff",
          beginAtZero: true,
          callback: (value) => `${value}%`,
          font: {
            size: window.innerWidth < 768 ? 10 : 12, // Responsive font size
          },
        },
        title: {
          display: true,
          text: "Probability(%)",
          color: "#fff",
          font: {
            size: window.innerWidth < 768 ? 12 : 14, // Responsive title size
          },
        },
      },
    },
    animation: {
      duration: 1500,
    },
  };

  return (
    <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
      {Value.length === 0 ? (
        <div className="grid place-content-center h-full">
          <CircularProgress size={50} sx={{ color: "white" }} />
        </div>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default WinBarChart;