import React from "react";

//css
import "./websitekind.css";

const WebsiteKind = ({ handleClickSetWebsiteKind }) => {
  return (
    <div className="website-kind">
      <h1>what kind of website should this be?</h1>
      <div className="options">
        <div
          className="option"
          onClick={() => handleClickSetWebsiteKind("landingpages")}
        >
          landing pages
        </div>
        <div
          className="option"
          onClick={() => handleClickSetWebsiteKind("companyprofile")}
        >
          company profile
        </div>
        <div
          className="option"
          onClick={() => handleClickSetWebsiteKind("blogs")}
        >
          blogs
        </div>
      </div>
    </div>
  );
};

export default WebsiteKind;
