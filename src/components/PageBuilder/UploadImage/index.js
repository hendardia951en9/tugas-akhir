import React, { useContext, useEffect, useReducer, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../utils/generateFormData";
import { ItemTypes } from "../../../utils/ItemTypes";
import { PageBuilderContext } from "../../Pages/WebGenerator";
import { PropsTypes } from "../../../utils/PropsTypes";

//components
import ButtonRipple from "../../ButtonRipple";
import MessageModal from "../../MessageModal";

//css
import "./uploadimage.css";

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

let selectedFileMultiple = [];

const UploadImage = ({ isMultiple, location }) => {
  const appContext = useContext(AppContext);
  const pageBuilderContext = useContext(PageBuilderContext);

  const encryptStorage = EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const [isSelected, setIsSelected] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [modalState, modalDispatch] = useReducer(modalReducer, {
    isShowMessageModal: false,
    messageModalContent: "hello world",
    messageModalStatusCode: 200,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [userGallery, setUserGallery] = useState([]);

  const closeModal = () => {
    modalDispatch({ type: "CLOSE_MODAL" });
  };

  const fetchImageGallery = async () => {
    appContext.setIsLoading(true);

    //jika admin
    if (encryptStorage.getItem("admin_logged_in")) {
      axios
        .get(`${process.env.REACT_APP_SITE_API_URL}/getadminimagegallery`, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          //success
          appContext.setIsLoading(false);
          if (res.data.result && res.data.result.length > 0) {
            setUserGallery(res.data.result);
          } else {
            setUserGallery(undefined);
          }

          //set all image selected status with false
          if (isMultiple && res.data.result) {
            selectedFileMultiple = [];

            res.data.result.forEach((result) => {
              const url = `${process.env.REACT_APP_BASE_API_URL}/public/admin/images/${result}`;
              selectedFileMultiple.push({ url: url, checked: false });
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
      //jika user
      const formData = generateFormData({
        userLoggedInID: encryptStorage.getItem("user_logged_in").user_id,
      });

      axios
        .post(
          `${process.env.REACT_APP_SITE_API_URL}/getuserimagegallery`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          //success
          appContext.setIsLoading(false);
          if (res.data.result && res.data.result.length > 0) {
            setUserGallery(res.data.result);
          } else {
            setUserGallery(undefined);
          }

          //set all image selected status with false
          if (isMultiple && res.data.result) {
            selectedFileMultiple = [];

            res.data.result.forEach((result) => {
              const url = `${
                process.env.REACT_APP_BASE_API_URL
              }/public/uploads/${
                encryptStorage.getItem("user_logged_in").user_id
              }/images/${result}`;
              selectedFileMultiple.push({ url: url, checked: false });
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

  const handleClickUpload = () => {
    appContext.setIsLoading(true);

    //jika admin
    if (encryptStorage.getItem("admin_logged_in")) {
      const formData = generateFormData({
        file: uploadedFile,
      });

      axios
        .post(
          `${process.env.REACT_APP_SITE_API_URL}/uploadimageadmin`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          //success
          appContext.setIsLoading(false);
          if (res.data.status === 200) {
            fetchImageGallery();
          } else {
            modalDispatch({
              type: "SHOW_MODAL",
              payload: res.data.message.error.substring(
                res.data.message.error.indexOf(">") + 1,
                res.data.message.error.lastIndexOf("<")
              ),
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
      //jika user
      const formData = generateFormData({
        file: uploadedFile,
        userLoggedInID: encryptStorage.getItem("user_logged_in").user_id,
      });

      axios
        .post(
          `${process.env.REACT_APP_SITE_API_URL}/uploadimageuser`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          //success
          appContext.setIsLoading(false);
          if (res.data.status === 200) {
            fetchImageGallery();
          } else {
            modalDispatch({
              type: "SHOW_MODAL",
              payload: res.data.message.error.substring(
                res.data.message.error.indexOf(">") + 1,
                res.data.message.error.lastIndexOf("<")
              ),
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
  };

  const handleClickUserGalleryImage = (url) => {
    setIsSelected(true);
    setSelectedFile(url);
  };

  const onChangeCheckboxImageGallery = (e, url) => {
    selectedFileMultiple.forEach((file) => {
      if (file.url === url) {
        file.checked = e.target.checked;
      }
    });

    let temp = false;

    selectedFileMultiple.forEach((file) => {
      if (file.checked) {
        temp = true;
      }
    });

    setIsSelected(temp);
  };

  const onConfirmSelectFile = () => {
    if (isMultiple === false) {
      pageBuilderContext.closeUploadImage();

      if (location === ItemTypes.USER_NAVBAR) {
        pageBuilderContext.editComponentProps(
          PropsTypes.USER_NAVBAR_LOGO,
          "",
          selectedFile,
          location
        );
      } else if (location === ItemTypes.USER_FOOTER) {
        pageBuilderContext.editComponentProps(
          PropsTypes.USER_FOOTER_LOGO,
          "",
          selectedFile,
          location
        );
      } else {
        pageBuilderContext.editComponentProps(
          PropsTypes.BACKGROUND_IMAGE,
          "",
          selectedFile
        );
      }
      pageBuilderContext.boardState.getComponentData = true;
    } else {
      let finalSelectedFileMultiple = [];

      selectedFileMultiple.forEach((file) => {
        if (file.checked === true) {
          finalSelectedFileMultiple.push({
            original: file.url,
            thumbnail: file.url,
          });
        }
      });

      pageBuilderContext.closeUploadImage();
      pageBuilderContext.editComponentProps(
        PropsTypes.IMAGE_GALLERY_IMAGES,
        "",
        finalSelectedFileMultiple
      );
      pageBuilderContext.boardState.getComponentData = true;
    }
  };

  const onUploadFile = (e) => {
    setIsUploaded(true);
    setUploadedFile(e.target.files[0]);
  };

  useEffect(() => {
    fetchImageGallery();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="upload-image">
      <div
        className="upload-image-blur"
        onClick={pageBuilderContext.closeUploadImage}
      ></div>
      <div className="upload-image-box">
        <div className="upload-image-content-header">
          <h3>choose image</h3>
          <button onClick={pageBuilderContext.closeUploadImage}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        </div>
        <div className="upload-image-content">
          {userGallery
            ? encryptStorage.getItem("admin_logged_in")
              ? isMultiple === false
                ? userGallery.map((image, index) => {
                    const url = `${process.env.REACT_APP_BASE_API_URL}/public/admin/images/${image}`;

                    return (
                      <div className="user-gallery-image-container" key={index}>
                        <input
                          id={image}
                          name="user-gallery-radio"
                          type="radio"
                        />
                        <label htmlFor={image}>
                          <img
                            alt=""
                            className="user-gallery-image"
                            onClick={() => {
                              handleClickUserGalleryImage(url);
                            }}
                            src={url}
                          />
                        </label>
                      </div>
                    );
                  })
                : userGallery.map((image, index) => {
                    const url = `${process.env.REACT_APP_BASE_API_URL}/public/admin/images/${image}`;

                    return (
                      <div className="user-gallery-image-container" key={index}>
                        <input
                          id={image}
                          name="user-gallery-checkbox"
                          onChange={(e) => {
                            onChangeCheckboxImageGallery(e, url);
                          }}
                          type="checkbox"
                        />
                        <label htmlFor={image}>
                          <img
                            alt=""
                            className="user-gallery-image"
                            src={url}
                          />
                        </label>
                      </div>
                    );
                  })
              : isMultiple === false
              ? userGallery.map((image, index) => {
                  const url = `${
                    process.env.REACT_APP_BASE_API_URL
                  }/public/uploads/${
                    encryptStorage.getItem("user_logged_in").user_id
                  }/images/${image}`;

                  return (
                    <div className="user-gallery-image-container" key={index}>
                      <input
                        id={image}
                        name="user-gallery-radio"
                        type="radio"
                      />
                      <label htmlFor={image}>
                        <img
                          alt=""
                          className="user-gallery-image"
                          onClick={() => {
                            handleClickUserGalleryImage(url);
                          }}
                          src={url}
                        />
                      </label>
                    </div>
                  );
                })
              : userGallery.map((image, index) => {
                  const url = `${
                    process.env.REACT_APP_BASE_API_URL
                  }/public/uploads/${
                    encryptStorage.getItem("user_logged_in").user_id
                  }/images/${image}`;

                  return (
                    <div className="user-gallery-image-container" key={index}>
                      <input
                        id={image}
                        name="user-gallery-checkbox"
                        onChange={(e) => {
                          onChangeCheckboxImageGallery(e, url);
                        }}
                        type="checkbox"
                      />
                      <label htmlFor={image}>
                        <img alt="" className="user-gallery-image" src={url} />
                      </label>
                    </div>
                  );
                })
            : "no image"}
        </div>
        <div className="upload-image-content-footer">
          <div className="upload-image-content-footer-left">
            <input
              id="upload"
              name="upload"
              onChange={(e) => onUploadFile(e)}
              type="file"
            />
            <ButtonRipple
              className="upload-image-content-footer-button"
              disabled={!isUploaded}
              onClick={() => handleClickUpload()}
              text="submit"
            />
            {modalState.isShowMessageModal && (
              <MessageModal
                closeModal={closeModal}
                content={modalState.messageModalContent}
                statusCode={modalState.messageModalStatusCode}
              />
            )}
          </div>
          <ButtonRipple
            className="upload-image-content-footer-button"
            disabled={!isSelected}
            onClick={() => onConfirmSelectFile()}
            text="confirm"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
