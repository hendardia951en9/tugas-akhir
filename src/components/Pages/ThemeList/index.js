import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../utils/generateFormData";
import { openInNewTab } from "../../../utils/openInNewTab";
import { useParams } from "react-router";

//css
//user themelistbycategory.css

const ThemeList = () => {
  const appContext = useContext(AppContext);

  const { categoryID } = useParams();
  const categoryDropDown = useRef(null);
  const [categories, setCategories] = useState([]);
  const [themes, setThemes] = useState([]);

  const fetchCategories = async () => {
    appContext.setIsLoading(true);

    axios
      .get(`${process.env.REACT_APP_SITE_API_URL}/getcategories`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        setCategories(res.data.result);
        if (categoryID) {
          fetchThemesByCategory(categoryID);
        } else {
          fetchThemesByCategory();
        }
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

  const fetchThemesByCategory = async (params) => {
    appContext.setIsLoading(true);

    if (params && params !== "*") {
      const formData = generateFormData({
        categoryID: params,
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
          categoryDropDown.current.value = params;
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
    } else {
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
    }
  };

  const handleOnChangeCategory = (params) => {
    fetchThemesByCategory(params);
  };

  useEffect(() => {
    document.title = "Templates";
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="navbar-margin">
      <section className="theme-list-page">
        <img
          className="background-image"
          src="/assets/images/global/templates_background.jpg"
          alt=""
        />

        <header>
          <h2>theme list</h2>
        </header>
        <div className="theme-list-category">
          <span>choose category</span>
          <select
            id="category"
            name="category"
            onChange={(e) => handleOnChangeCategory(e.target.value)}
            ref={categoryDropDown}
          >
            <option key="*" value="*">
              all
            </option>
            {categories
              ? categories.map((props) => {
                  const { category_id, category_name } = props;

                  return (
                    <option key={category_id} value={category_id}>
                      {category_name}
                    </option>
                  );
                })
              : ""}
          </select>
        </div>
        <section className="theme-list">
          {themes
            ? themes.map((props) => {
                const {
                  theme_id,
                  theme_name,
                  theme_thumbnail_image_name,
                  theme_premium_status,
                } = props;
                return (
                  <div className="theme-container" key={theme_id}>
                    {theme_premium_status === "1" && (
                      <div className="theme-premium-icon">
                        <FontAwesomeIcon icon={faMedal} />
                      </div>
                    )}
                    <div
                      className="theme-content"
                      onClick={(e) => {
                        if (e.target === e.currentTarget) {
                          openInNewTab(
                            `${process.env.REACT_APP_BASE_URL}/theme/${theme_id}`
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
