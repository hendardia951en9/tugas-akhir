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

//components
import ButtonRipple from "../../ButtonRipple";
import ThemeListByCategory from "./ThemeListByCategory";
import WebstiteCategory from "./WebsiteCategory";
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
  const [websiteCategoryID, setWebsiteCategoryID] = useState(-1);
  const [isWebsiteTheme, setIsWebsiteTheme] = useState(false);
  const [websiteThemeID, setWebsiteThemeID] = useState(-1);

  const closeModal = () => {
    modalDispatch({ type: "CLOSE_MODAL" });
  };

  const createSite = async (params) => {
    appContext.setIsLoading(true);

    if (isWebsiteTheme) {
      const formData = generateFormData({
        userLoggedInID: encryptStorage.getItem("user_logged_in").user_id,
        websiteCategoryID: -1,
        websiteThemeID: websiteThemeID,
        websiteName: params,
        websiteNavbarJSON: [],
        websiteFooterJSON: [],
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
    } else {
      let formData = generateFormData({
        categoryID: websiteCategoryID,
      });

      //get category pages first
      axios
        .post(
          `${process.env.REACT_APP_SITE_API_URL}/getcategorypages`,
          formData,
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((res) => {
          //success
          if (res.data.status === 200) {
            const websiteNavbarJSON = {
              itemTypes: ItemTypes.USER_NAVBAR,
              props: { ...ComponentDefaultProps.USER_NAVBAR },
            };
            const websiteFooterJSON = {
              itemTypes: ItemTypes.USER_NAVBAR,
              props: ComponentDefaultProps.USER_FOOTER,
            };

            res.data.result.forEach((props) => {
              const { category_page_name } = props;

              websiteNavbarJSON.props.menu = [
                ...websiteNavbarJSON.props.menu,
                {
                  itemTypes: ItemTypes.USER_NAVBAR_MENU,
                  props: {
                    linkTo: category_page_name,
                    text: category_page_name,
                  },
                  submenu: [],
                },
              ];
            });

            formData = generateFormData({
              userLoggedInID: encryptStorage.getItem("user_logged_in").user_id,
              websiteCategoryID: websiteCategoryID,
              websiteThemeID: -1,
              websiteName: params,
              websiteNavbarJSON: JSON.stringify(websiteNavbarJSON),
              websiteFooterJSON: JSON.stringify(websiteFooterJSON),
            });

            //createsite
            axios
              .post(
                `${process.env.REACT_APP_SITE_API_URL}/createsite`,
                formData,
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              )
              .then((res) => {
                //success
                appContext.setIsLoading(false);

                if (res.data.status === 200) {
                  encryptStorage.setItem("site_id", res.data.result.site_id);
                  history.push("/webgenerator");
                } else {
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
    }
  };

  const handleClickButtonBack = () => {
    if (isWebsiteTheme) {
      setGettingStartedIndex(1);
      setIsWebsiteTheme(false);
      setWebsiteThemeID(-1);
    } else {
      setGettingStartedIndex((prevState) => {
        return prevState - 1;
      });
    }
  };

  const handleClickSetWebsiteCategoryID = (params) => {
    setWebsiteCategoryID(params);
    setGettingStartedIndex(1);
  };

  const handleClickSetIsWebsiteTheme = (params) => {
    setIsWebsiteTheme(params);
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
    createSite(params);
  };

  return (
    <div className="navbar-margin">
      <div className="getting-started">
        {gettingStartedIndex === 0 ? (
          <WebstiteCategory
            handleClickSetWebsiteCategoryID={handleClickSetWebsiteCategoryID}
          />
        ) : gettingStartedIndex === 1 ? (
          <>
            <WebsiteTheme
              handleClickSetIsWebsiteTheme={handleClickSetIsWebsiteTheme}
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
            <ThemeListByCategory
              handleClickSetWebsiteThemeID={handleClickSetWebsiteThemeID}
              websiteCategoryID={websiteCategoryID}
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
