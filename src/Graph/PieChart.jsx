import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CircularProgress } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ Value }) => {
  const data = {
    labels: [
      "Documentary Evidence",
      "Witness Testimony",
      "Physical Evidence",
      "Circumstantial Evidence",
    ],
    datasets: [
      {
        data: Value,
        backgroundColor: ["#22c55e", "#0ea5e9", "#0d9488", "#00D88A"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: window.innerWidth < 768 ? "bottom" : "right",
        labels: {
          color: "#fff",
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
          padding: window.innerWidth < 768 ? 10 : 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div className="w-full h-[150px] sm:h-[180px] md:h-[230px] md:mb-20">
      {Value.length === 0 ? (
        <div className="grid place-content-center h-full">
          <CircularProgress size={50} sx={{ color: "white" }} />
        </div>
      ) : (
        <Pie data={data} options={options} />
      )}
    </div>
  );
};

export default PieChart;