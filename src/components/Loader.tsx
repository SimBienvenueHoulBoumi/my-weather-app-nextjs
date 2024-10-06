"use client";

import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loader;
