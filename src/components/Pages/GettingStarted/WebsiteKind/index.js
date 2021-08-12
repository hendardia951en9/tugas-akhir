import React from "react";
import { WebsiteTypes } from "../../../../utils/WebsiteTypes";

//css
import "./websitekind.css";

const WebsiteKind = ({ handleClickSetWebsiteKind }) => {
  return (
    <div className="website-kind">
      <h1>what kind of website should this be?</h1>
      <div className="options">
        <div
          className="option"
          onClick={() => handleClickSetWebsiteKind(WebsiteTypes.LANDING_PAGES)}
        >
          landing pages
        </div>
        <div
          className="option"
          onClick={() =>
            handleClickSetWebsiteKind(WebsiteTypes.COMPANY_PROFILE)
          }
        >
          company profile
        </div>
        <div
          className="option"
          onClick={() => handleClickSetWebsiteKind(WebsiteTypes.BLOG)}
        >
          blog
        </div>
      </div>
    </div>
  );
};

export default WebsiteKind;
