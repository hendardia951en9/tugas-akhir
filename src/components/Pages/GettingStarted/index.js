import React, { useContext, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../utils/generateFormData";
import { useHistory } from "react-router-dom";

//components
import ButtonRipple from "../../ButtonRipple";
import WebstiteKind from "./WebsiteKind";
import WebsiteName from "./WebsiteName";
import WebsiteTheme from "./WebsiteTheme";

//css
import "./gettingstarted.css";

const GettingStarted = () => {
  const appContext = useContext(AppContext);
  const [gettingStartedIndex, setGettingStartedIndex] = useState(0);
  const history = useHistory();
  const [websiteKind, setWebsiteKind] = useState(null);
  const [websiteTheme, setWebsiteTheme] = useState(null);
  // eslint-disable-next-line
  const [websiteName, setWebsiteName] = useState(null);

  const handleClickButtonBack = () => {
    setGettingStartedIndex((prevState) => {
      return prevState - 1;
    });
  };

  const handleClickSetWebsiteKind = (params) => {
    setWebsiteKind(params);
    setGettingStartedIndex(1);
  };

  const handleClickSetWebsiteTheme = (params) => {
    setWebsiteTheme(params);
    setGettingStartedIndex(2);
  };

  const handleClickSetWebsiteName = async (params) => {
    setWebsiteName(params);
    appContext.setIsLoading(true);

    const formData = generateFormData({
      userLoggedInID: JSON.parse(localStorage.getItem("userLoggedIn")).user_id,
      websiteKind: websiteKind,
      websiteTheme: websiteTheme,
      websiteName: params,
    });

    axios
      .post(`${process.env.REACT_APP_SITE_URL}/createsite`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        if (res.data.status === 200) {
          localStorage.setItem("site_id", res.data.result.site_id);
          localStorage.setItem("site_page_id", res.data.result.site_page_id);
          history.push("/webgenerator");
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

  return (
    <>
      <div className="navbar-margin">
        <div className="getting-started">
          {gettingStartedIndex === 0 ? (
            <WebstiteKind
              handleClickSetWebsiteKind={handleClickSetWebsiteKind}
            />
          ) : gettingStartedIndex === 1 ? (
            <>
              <WebsiteTheme
                handleClickSetWebsiteTheme={handleClickSetWebsiteTheme}
              />
              <ButtonRipple
                className="button-back"
                fa={<FontAwesomeIcon icon={faArrowLeft} />}
                iconIsLeft={true}
                onClick={handleClickButtonBack}
                text="back"
              />
            </>
          ) : gettingStartedIndex === 2 ? (
            <>
              <WebsiteName
                handleClickSetWebsiteName={handleClickSetWebsiteName}
              />
              <ButtonRipple
                className="button-back"
                fa={<FontAwesomeIcon icon={faArrowLeft} />}
                iconIsLeft={true}
                onClick={handleClickButtonBack}
                text="back"
              />
            </>
          ) : (
            <div>3</div>
          )}
        </div>
      </div>
    </>
  );
};

export default GettingStarted;
