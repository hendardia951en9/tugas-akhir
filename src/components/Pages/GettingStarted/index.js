import React, { useContext, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { ComponentDefaultProps } from "../../../utils/ComponentDefaultProps";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../utils/generateFormData";
import { useHistory } from "react-router-dom";
import { WebsiteTypes } from "../../../utils/WebsiteTypes";

//components
import ButtonRipple from "../../ButtonRipple";
import WebstiteKind from "./WebsiteKind";
import WebsiteName from "./WebsiteName";
import WebsiteTheme from "./WebsiteTheme";

//css
import "./gettingstarted.css";
import { ItemTypes } from "../../../utils/ItemTypes";

const GettingStarted = () => {
  const appContext = useContext(AppContext);
  const [gettingStartedIndex, setGettingStartedIndex] = useState(0);
  const history = useHistory();
  const [websiteKind, setWebsiteKind] = useState(null);
  const [websiteTheme, setWebsiteTheme] = useState(null);
  // eslint-disable-next-line
  const [websiteName, setWebsiteName] = useState(null);
  const [websiteNavbarJSON, setWebsiteNavbarJSON] = useState(null);
  const [websiteFooterJSON, setWebsiteFooterJSON] = useState(null);

  const handleClickButtonBack = () => {
    setGettingStartedIndex((prevState) => {
      return prevState - 1;
    });
  };

  const handleClickSetWebsiteKind = (params) => {
    setWebsiteKind(params);
    if (params === WebsiteTypes.BLOG) {
      setWebsiteNavbarJSON({
        itemTypes: ItemTypes.USER_NAVBAR,
        props: ComponentDefaultProps.USER_NAVBAR_BLOG,
      });
    } else if (params === WebsiteTypes.COMPANY_PROFILE) {
      setWebsiteNavbarJSON({
        itemTypes: ItemTypes.USER_NAVBAR,
        props: ComponentDefaultProps.USER_NAVBAR_COMPANY_PROFILE,
      });
    } else if (params === WebsiteTypes.LANDING_PAGES) {
      setWebsiteNavbarJSON({
        itemTypes: ItemTypes.USER_NAVBAR,
        props: ComponentDefaultProps.USER_NAVBAR_LANDING_PAGES,
      });
    }
    setWebsiteFooterJSON({
      itemTypes: ItemTypes.USER_FOOTER,
      props: ComponentDefaultProps.USER_FOOTER,
    });
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
      websiteNavbarJSON: JSON.stringify(websiteNavbarJSON),
      websiteFooterJSON: JSON.stringify(websiteFooterJSON),
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
