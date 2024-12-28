import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { ChartDataLabels } from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend); // Register the plugin

const PieChart = () => {
  const data = {
    labels: [
      "Documentary Evidence",
      "Witness Testimony",
      "Physical Evidence",
      "Circumstantial Evidence",
    ],
    datasets: [
      {
        data: [30, 80, 70, 90], // Corresponds to the percentages
        backgroundColor: ["#22c55e", "#0ea5e9", "#0d9488", "#00D88A"], // Colors from the image
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows for responsive resizing without distorting
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#fff", // White color for legend text
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
        },
      },
      // Add data label plugin for displaying values on the pie chart
      datalabels: {
        color: "#fff", // Color for labels
        formatter: (value) => `${value}%`, // Show percentage
        font: {
          weight: "bold", // Make labels bold
        },
        anchor: "center", // Position the label at the center
        align: "center", // Align the label in the center
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div className="m-auto">
      {" "}
      {/* Set explicit width and height */}
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
