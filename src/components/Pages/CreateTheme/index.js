import React, { useContext, useEffect, useState, useReducer } from "react";
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
import ThemeCategory from "./ThemeCategory";
import ThemeName from "./ThemeName";

//css
import "./createtheme.css";

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

const CreateTheme = () => {
  const appContext = useContext(AppContext);

  const [createThemeIndex, setCreateThemeIndex] = useState(0);
  const encryptStorage = EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const history = useHistory();
  const [modalState, modalDispatch] = useReducer(modalReducer, {
    isShowMessageModal: false,
    messageModalContent: "hello world",
    messageModalStatusCode: 200,
  });
  const [themeCategoryID, setThemeCategoryID] = useState(null);

  const closeModal = () => {
    modalDispatch({ type: "CLOSE_MODAL" });
  };

  const handleClickButtonBack = () => {
    setCreateThemeIndex((prevState) => {
      return prevState - 1;
    });
  };

  const handleClickSetThemeCategoryID = (params) => {
    setThemeCategoryID(params);
    setCreateThemeIndex(1);
  };

  const handleClickSetThemeName = async (params) => {
    appContext.setIsLoading(true);

    let formData = generateFormData({
      categoryID: themeCategoryID,
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
        appContext.setIsLoading(false);

        if (res.data.status === 200) {
          const themeNavbarJSON = {
            itemTypes: ItemTypes.USER_NAVBAR,
            props: { ...ComponentDefaultProps.USER_NAVBAR },
          };
          const themeFooterJSON = {
            itemTypes: ItemTypes.USER_FOOTER,
            props: ComponentDefaultProps.USER_FOOTER,
          };

          res.data.result.forEach((props) => {
            const { category_page_name } = props;

            themeNavbarJSON.props.menu = [
              ...themeNavbarJSON.props.menu,
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
            themeCategoryID: themeCategoryID,
            themeName: params,
            themeNavbarJSON: JSON.stringify(themeNavbarJSON),
            themeFooterJSON: JSON.stringify(themeFooterJSON),
          });

          axios
            .post(
              `${process.env.REACT_APP_SITE_API_URL}/createtheme`,
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
                encryptStorage.setItem("theme_id", res.data.result.theme_id);
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
  };

  useEffect(() => {
    document.title = "Create Theme";
  }, []);

  return (
    <div className="navbar-margin">
      <div className="create-theme">
        {createThemeIndex === 0 ? (
          <ThemeCategory
            handleClickSetThemeCategoryID={handleClickSetThemeCategoryID}
          />
        ) : createThemeIndex === 1 ? (
          <>
            <ThemeName
              closeModal={closeModal}
              handleClickSetThemeName={handleClickSetThemeName}
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
          <div>2</div>
        )}
      </div>
    </div>
  );
};

export default CreateTheme;
