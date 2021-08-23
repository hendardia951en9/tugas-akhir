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
          onClick={() =>
            handleClickSetThemeCategory(WebsiteTypes.LANDING_PAGES)
          }
        >
          landing pages
        </div>
        <div
          className="option"
          onClick={() =>
            handleClickSetThemeCategory(WebsiteTypes.COMPANY_PROFILE)
          }
        >
          company profile
        </div>
        <div
          className="option"
          onClick={() => handleClickSetThemeCategory(WebsiteTypes.BLOG)}
        >
          blog
        </div>
      </div>
    </section>
  );
};

export default ThemeCategory;
