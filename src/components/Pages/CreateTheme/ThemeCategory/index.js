import React from "react";
import { WebsiteTypes } from "../../../../utils/WebsiteTypes";

//css
import "./themecategory.css";

const ThemeCategory = ({ handleClickSetThemeCategory }) => {
  return (
    <section className="theme-category">
      <h1>what category of website should this be?</h1>
      <div className="options">
        <div
          className="option"
          onClick={() => handleClickSetThemeCategory(WebsiteTypes.BLOG)}
        >
          {WebsiteTypes.BLOG}
        </div>
        <div
          className="option"
          onClick={() =>
            handleClickSetThemeCategory(WebsiteTypes.COMPANY_PROFILE)
          }
        >
          {WebsiteTypes.COMPANY_PROFILE}
        </div>
        <div
          className="option"
          onClick={() => handleClickSetThemeCategory(WebsiteTypes.LANDING_PAGE)}
        >
          {WebsiteTypes.LANDING_PAGE}
        </div>
      </div>
    </section>
  );
};

export default ThemeCategory;
