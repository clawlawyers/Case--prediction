import React from 'react';
import { CircularProgress } from "@mui/material";

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-700 to-gray-900 flex flex-col items-center justify-center gap-4">
      <CircularProgress size={80} sx={{ color: "white" }} />
      <h1 className="text-white text-2xl font-bold">Analyzing your case...</h1>
      <p className="text-white opacity-75">This may take a few moments</p>
    </div>
  );
};

export default LoadingPage;