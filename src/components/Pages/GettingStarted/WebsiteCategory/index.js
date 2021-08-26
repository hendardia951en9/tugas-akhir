import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../App";
import axios from "axios";

//css
import "./websitecategory.css";

const WebsiteCategory = ({ handleClickSetWebsiteCategoryID }) => {
  const appContext = useContext(AppContext);

  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    appContext.setIsLoading(true);

    axios
      .get(`${process.env.REACT_APP_SITE_API_URL}/getcategories`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        setCategories(res.data.result);
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
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="website-category">
      <h1>what kind of website should this be?</h1>
      <div className="website-category-list">
        {categories
          ? categories.map((props) => {
              const { category_id, category_name } = props;

              return (
                <div
                  className="category"
                  key={category_id}
                  onClick={() => {
                    handleClickSetWebsiteCategoryID(category_id);
                  }}
                >
                  <div className="category-text">{category_name}</div>
                </div>
              );
            })
          : "no category"}
      </div>
    </section>
  );
};

export default WebsiteCategory;
