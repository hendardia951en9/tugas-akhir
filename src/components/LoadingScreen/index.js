import React from "react";
import "./loadingscreen.css";

const LoadingScreen = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
