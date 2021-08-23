import React, { useContext, useReducer, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { ComponentDefaultProps } from "../../../utils/ComponentDefaultProps";
import { EncryptStorage } from "encrypt-storage";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../utils/generateFormData";
import { ItemTypes } from "../../../utils/ItemTypes";
import { useHistory } from "react-router-dom";
import { WebsiteTypes } from "../../../utils/WebsiteTypes";

//components
import ButtonRipple from "../../ButtonRipple";
import ThemeList from "./ThemeList";
import WebstiteKind from "./WebsiteKind";
import WebsiteName from "./WebsiteName";
import WebsiteTheme from "./WebsiteTheme";

//css
import "./gettingstarted.css";

const modalReducer = (modalState, action) => {
  if (action.type === "SHOW_MODAL") {
    return {
      ...modalState,
      isShowMessageModal: true,
      messageModalContent: action.payload,
      messageModalStatusCode: action.statusCode,
    };
  } else if (action.type === "CLOSE_MODAL") {
    return {
      ...modalState,
      isShowMessageModal: false,
    };
  }

  throw new Error("no matching action type");
};

const GettingStarted = () => {
  const appContext = useContext(AppContext);

  const encryptStorage = EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const [gettingStartedIndex, setGettingStartedIndex] = useState(0);
  const history = useHistory();
  const [modalState, modalDispatch] = useReducer(modalReducer, {
    isShowMessageModal: false,
    messageModalContent: "hello world",
    messageModalStatusCode: 200,
  });
  const [websiteKind, setWebsiteKind] = useState(null);
  const [websiteTheme, setWebsiteTheme] = useState(null);
  const [websiteThemeID, setWebsiteThemeID] = useState(-1);
  // eslint-disable-next-line
  const [websiteName, setWebsiteName] = useState(null);
  const [websiteNavbarJSON, setWebsiteNavbarJSON] = useState(null);
  const [websiteFooterJSON, setWebsiteFooterJSON] = useState(null);

  const closeModal = () => {
    modalDispatch({ type: "CLOSE_MODAL" });
  };

  const handleClickButtonBack = () => {
    if (websiteTheme) {
      setGettingStartedIndex(1);
      setWebsiteTheme(false);
      setWebsiteThemeID(-1);
    } else {
      setGettingStartedIndex((prevState) => {
        return prevState - 1;
      });
    }
  };

  const handleClickSetWebsiteKind = (params) => {
    setWebsiteKind(params);
    if (params === WebsiteTypes.BLOG) {
      setWebsiteNavbarJSON({
        itemTypes: ItemTypes.USER_NAVBAR,
        props: ComponentDefaultProps.USER_NAVBAR_BLOG,
      });
      setWebsiteFooterJSON({
        itemTypes: ItemTypes.USER_FOOTER,
        props: ComponentDefaultProps.USER_FOOTER_BLOG,
      });
    } else if (params === WebsiteTypes.COMPANY_PROFILE) {
      setWebsiteNavbarJSON({
        itemTypes: ItemTypes.USER_NAVBAR,
        props: ComponentDefaultProps.USER_NAVBAR_COMPANY_PROFILE,
      });
      setWebsiteFooterJSON({
        itemTypes: ItemTypes.USER_FOOTER,
        props: ComponentDefaultProps.USER_FOOTER_COMPANY_PROFILE,
      });
    } else if (params === WebsiteTypes.LANDING_PAGES) {
      setWebsiteNavbarJSON({
        itemTypes: ItemTypes.USER_NAVBAR,
        props: ComponentDefaultProps.USER_NAVBAR_LANDING_PAGES,
      });
      setWebsiteFooterJSON({
        itemTypes: ItemTypes.USER_FOOTER,
        props: ComponentDefaultProps.USER_FOOTER_LANDING_PAGES,
      });
    }
    setGettingStartedIndex(1);
  };

  const handleClickSetWebsiteTheme = (params) => {
    setWebsiteTheme(params);
    if (params === true) {
      setGettingStartedIndex(3);
    } else {
      setGettingStartedIndex(2);
    }
  };

  const handleClickSetWebsiteThemeID = (params) => {
    setWebsiteThemeID(params);
    setGettingStartedIndex(2);
  };

  const handleClickSetWebsiteName = async (params) => {
    setWebsiteName(params);
    appContext.setIsLoading(true);

    const formData = generateFormData({
      userLoggedInID: encryptStorage.getItem("user_logged_in").user_id,
      websiteKind: websiteKind,
      websiteThemeID: websiteThemeID,
      websiteName: params,
      websiteNavbarJSON: JSON.stringify(websiteNavbarJSON),
      websiteFooterJSON: JSON.stringify(websiteFooterJSON),
    });

    axios
      .post(`${process.env.REACT_APP_SITE_API_URL}/createsite`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        if (res.data.status === 200) {
          encryptStorage.setItem("site_id", res.data.result.site_id);
          history.push("/webgenerator");
        } else {
          console.log(res.data);
          modalDispatch({
            type: "SHOW_MODAL",
            payload: res.data.message,
            statusCode: res.data.status,
          });
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
    <div className="navbar-margin">
      <div className="getting-started">
        {gettingStartedIndex === 0 ? (
          <WebstiteKind handleClickSetWebsiteKind={handleClickSetWebsiteKind} />
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
              closeModal={closeModal}
              handleClickSetWebsiteName={handleClickSetWebsiteName}
              modalState={modalState}
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
          <>
            <ThemeList
              handleClickSetWebsiteThemeID={handleClickSetWebsiteThemeID}
              websiteKind={websiteKind}
            />
            <ButtonRipple
              className="button-back"
              fa={<FontAwesomeIcon icon={faArrowLeft} />}
              iconIsLeft={true}
              onClick={handleClickButtonBack}
              text="back"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default GettingStarted;
