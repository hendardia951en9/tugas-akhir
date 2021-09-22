import React, { useContext, useEffect, useReducer, useState } from "react";
import { AppContext } from "../../../../App";
import axios from "axios";
import EncryptStorage from "encrypt-storage";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../../utils/generateFormData";
import { openInNewTab } from "../../../../utils/openInNewTab";

//components
import PopUpModal from "../../../PopUpModal";

//css
import "./themelistbycategory.css";

const modalReducer = (modalState, action) => {
  if (action.type === "SHOW_MODAL") {
    return {
      ...modalState,
      isShowPopUpModal: true,
      popUpModalContent: action.payload,
      popUpModalStatusCode: action.statusCode,
    };
  } else if (action.type === "CLOSE_MODAL") {
    return {
      ...modalState,
      isShowPopUpModal: false,
    };
  }

  throw new Error("no matching action type");
};

const ThemeListByCategory = ({
  handleClickSetWebsiteThemeID,
  websiteCategoryID,
}) => {
  const appContext = useContext(AppContext);

  const encryptStorage = EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const [modalState, modalDispatch] = useReducer(modalReducer, {
    isShowPopUpModal: false,
    popUpModalContent: "hello world",
    popUpModalStatusCode: 200,
  });

  const [themes, setThemes] = useState([]);

  const closeModal = () => {
    modalDispatch({ type: "CLOSE_MODAL" });
  };

  const fetchThemesByCategory = () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      categoryID: websiteCategoryID,
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

  const checkSubscription = async (params) => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      userID: encryptStorage.getItem("user_logged_in").user_id,
    });

    axios
      .post(
        `${process.env.REACT_APP_SITE_API_URL}/checksubscriptiondate`,
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((res) => {
        //success
        appContext.setIsLoading(false);

        if (
          res.data.status === 200 &&
          res.data.result.subscription_package_id === "2"
        ) {
          handleClickSetWebsiteThemeID(params);
        } else {
          modalDispatch({
            type: "SHOW_MODAL",
            payload: "vvip user only",
            statusCode: 400,
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

  useEffect(() => {
    fetchThemesByCategory();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="theme-list-page">
      <img
        className="background-image"
        src="/assets/images/home/swiper_fade_1.jpg"
        alt=""
      />

      <header>
        <h2>theme list</h2>
      </header>
      <section className="theme-list">
        {modalState.isShowPopUpModal && (
          <PopUpModal
            closeModal={closeModal}
            content={modalState.popUpModalContent}
            statusCode={modalState.popUpModalStatusCode}
          />
        )}

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
                              `${process.env.REACT_APP_BASE_URL}/theme/${theme_id}`
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
                        checkSubscription(theme_id);
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
