import React, { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <>
      <div className="navbar-margin">Dashboard</div>
    </>
  );
};

export default Dashboard;
