import React, { useEffect } from "react";

import "./pricing.css";

const Pricing = () => {
  useEffect(() => {
    document.title = "Pricing";
  }, []);

  return (
    <div className="navbar-margin">
      <div className="pricing">pricing</div>
    </div>
  );
};

export default Pricing;
