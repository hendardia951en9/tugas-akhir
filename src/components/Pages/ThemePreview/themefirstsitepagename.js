import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { generateFormData } from "../../../utils/generateFormData";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";

const ThemeFirstSitePageName = () => {
  const appContext = useContext(AppContext);

  const history = useHistory();
  const { themeID } = useParams();

  const fetchThemeFirstSitePageName = () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      themeID: themeID,
    });

    axios
      .post(
        `${process.env.REACT_APP_SITE_API_URL}/getthemefirstsitepagename`,
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((res) => {
        //success
        appContext.setIsLoading(false);

        if (res.data.status === 200) {
          history.push(`/theme/${themeID}/${res.data.result}`);
        } else {
          history.push("/error");
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

  useEffect(() => {
    document.title = "Theme Preview";
    fetchThemeFirstSitePageName();
    // eslint-disable-next-line
  }, []);

  return <div></div>;
};

export default ThemeFirstSitePageName;
