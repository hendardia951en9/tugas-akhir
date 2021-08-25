import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../App";
import axios from "axios";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../../utils/generateFormData";
import { openInNewTab } from "../../../../utils/openInNewTab";
import { WebsiteTypes } from "../../../../utils/WebsiteTypes";

//css
import "./themelistbycategory.css";

const ThemeListByCategory = ({ handleClickSetWebsiteThemeID, websiteKind }) => {
  const appContext = useContext(AppContext);

  const [themes, setThemes] = useState([]);

  const fetchThemesByCategory = () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      categoryID:
        websiteKind === WebsiteTypes.BLOG
          ? 1
          : websiteKind === WebsiteTypes.COMPANY_PROFILE
          ? 2
          : websiteKind === WebsiteTypes.LANDING_PAGE
          ? 3
          : -1,
    });

    axios
      .post(
        `${process.env.REACT_APP_SITE_API_URL}/getthemesbycategory`,
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        setThemes(res.data.result);
      })
      .catch((err) => {
        //error
        if (err.response) {
          console.log("res error", err.response.data);
        } else if (err.request) {
          console.log("req error", err.request.data);
        } else {
          console.log("Error", err.message);
        }
        appContext.setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchThemesByCategory();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="theme-list-page">
      <header>
        <h2>theme list</h2>
      </header>
      <section className="theme-list">
        {themes
          ? themes.map((props) => {
              const { theme_id, theme_name, theme_thumbnail_image_name } =
                props;
              return (
                <div className="theme-container" key={theme_id}>
                  <div className="theme-options">
                    <FontAwesomeIcon
                      className="theme-options-icon"
                      icon={faEllipsisV}
                    />
                    <ul>
                      <li
                        onClick={(e) => {
                          if (e.target === e.currentTarget) {
                            openInNewTab(
                              `${process.env.REACT_APP_BASE_URL}/theme/${theme_id}/home`
                            );
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          className="theme-option-icon"
                          icon={faEye}
                        />
                        preview
                      </li>
                    </ul>
                  </div>
                  <div
                    className="theme-content"
                    onClick={(e) => {
                      if (e.target === e.currentTarget) {
                        handleClickSetWebsiteThemeID(theme_id);
                      }
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_BASE_API_URL}/public/admin/images/${theme_thumbnail_image_name}`}
                      alt=""
                    />
                    <p>{theme_name}</p>
                  </div>
                </div>
              );
            })
          : "no themes"}
      </section>
    </section>
  );
};

export default ThemeListByCategory;
