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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const HorizontalBarChart = () => {
  const data = {
    labels: [
      "Win Probability",
      "Legal Risk Factors",
      "Procedural Compliance",
      "Evidence Analysis",
    ], // Categories
    datasets: [
      {
        label: "Categories",
        data: [55, 78, 95, 67], // Values for the bars
        backgroundColor: ["#22c55e", "#16a34a", "#15803d", "#166534"], // Gradient-style colors
        borderRadius: 10, // Rounded corners for bars
        borderSkipped: false, // No border skipping for rounded edges
      },
    ],
  };

  const options = {
    indexAxis: "y", // Makes the bar chart horizontal
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
          color: "#334155", // Grid line color
        },
        ticks: {
          color: "#fff", // White text for X-axis labels
          beginAtZero: true,
          callback: (value) => `${value}%`, // Add '%' to X-axis labels
        },
        title: {
          display: true,
          text: "Average Score",
          color: "#fff",
        },
      },
      y: {
        grid: {
          display: false, // Remove grid lines on Y-axis
        },
        ticks: {
          color: "#fff", // White text for Y-axis labels
        },
        title: {
          display: true,
          text: "Categories",
          color: "#fff",
        },
      },
    },
    animation: {
      duration: 1500, // Animation duration
    },
  };

  return (
    <div className="h-[] w-[80%] m-auto">
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalBarChart;