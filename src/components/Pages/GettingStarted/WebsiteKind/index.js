import React from "react";
import { WebsiteTypes } from "../../../../utils/WebsiteTypes";

//css
import "./websitekind.css";

const WebsiteKind = ({ handleClickSetWebsiteKind }) => {
  return (
    <section className="website-kind">
      <h1>what kind of website should this be?</h1>
      <div className="options">
        <div
          className="option"
          onClick={() => handleClickSetWebsiteKind(WebsiteTypes.BLOG)}
        >
          {WebsiteTypes.BLOG}
        </div>
        <div
          className="option"
          onClick={() =>
            handleClickSetWebsiteKind(WebsiteTypes.COMPANY_PROFILE)
          }
        >
          {WebsiteTypes.COMPANY_PROFILE}
        </div>
        <div
          className="option"
          onClick={() => handleClickSetWebsiteKind(WebsiteTypes.LANDING_PAGE)}
        >
          {WebsiteTypes.LANDING_PAGE}
        </div>
      </div>
    </section>
  );
};

export default WebsiteKind;
