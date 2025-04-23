import React from "react";
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
import { CircularProgress } from "@mui/material";

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
        borderRadius: 4, // Added for better visual appearance
        barPercentage: 0.8, // Better bar width for responsiveness
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Added for responsive behavior
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Costs and Compensation",
        color: "#FFFFFF",
        font: {
          size: window.innerWidth < 768 ? 14 : 18, // Responsive title size
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.raw > 0 ? "" : "-"}${Math.abs(context.raw)}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Categories",
          color: "#FFFFFF",
          font: {
            size: window.innerWidth < 768 ? 12 : 14, // Responsive title size
          },
        },
        ticks: {
          color: "#FFFFFF",
          font: {
            size: window.innerWidth < 768 ? 10 : 12, // Responsive label size
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
          color: "#FFFFFF",
          font: {
            size: window.innerWidth < 768 ? 12 : 14, // Responsive title size
          },
        },
        ticks: {
          color: "#FFFFFF",
          font: {
            size: window.innerWidth < 768 ? 10 : 12, // Responsive label size
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
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

export default CombinedGraph;