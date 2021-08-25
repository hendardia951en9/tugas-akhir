import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { openInNewTab } from "../../../utils/openInNewTab";

const ThemeList = () => {
  const appContext = useContext(AppContext);

  const [themes, setThemes] = useState([]);

  const fetchThemes = () => {
    appContext.setIsLoading(true);

    axios
      .get(`${process.env.REACT_APP_SITE_API_URL}/getthemes`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
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
    fetchThemes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="navbar-margin">
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
                    <div
                      className="theme-content"
                      onClick={(e) => {
                        if (e.target === e.currentTarget) {
                          openInNewTab(
                            `${process.env.REACT_APP_BASE_URL}/theme/${theme_id}/home`
                          );
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
    </div>
  );
};

export default ThemeList;
