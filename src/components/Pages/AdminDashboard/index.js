import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../utils/generateFormData";
import { useHistory } from "react-router-dom";

//components
import ButtonRipple from "../../ButtonRipple";

//css
import "./admindashboard.css";

const AdminDashboard = () => {
  const appContext = useContext(AppContext);

  const encryptStorage = EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const [gallery, setGallery] = useState([]);
  const history = useHistory();
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState(null);
  const [selectedThemeID, setSelectedThemeID] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isOpenUploadImage, setIsOpenUploadImage] = useState(false);
  const [themes, setThemes] = useState([]);

  const closeUploadImage = () => {
    //reset variables
    setIsImageSelected(false);
    setIsImageUploaded(false);
    setIsOpenUploadImage(false);
    setSelectedImageName(null);
    setSelectedThemeID(0);
    setUploadedImage(null);
  };

  const fetchAdminGallery = () => {
    axios
      .get(`${process.env.REACT_APP_SITE_API_URL}/getadmingallery`, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        setGallery(res.data.result);
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

  const fetchThemes = () => {
    appContext.setIsLoading(true);

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
  };

  const handleClickCreateTheme = () => {
    history.push("/createtheme");
  };

  const handleClickGalleryImage = (name) => {
    setIsImageSelected(true);
    setSelectedImageName(name);
  };

  const handleClickTheme = (theme_id) => {
    encryptStorage.setItem("theme_id", theme_id);
    history.push("/webgenerator");
  };

  const handleClickUploadImage = () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      file: uploadedImage,
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
        fetchAdminGallery();
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

  const handleClickThumbnail = (theme_id) => {
    setIsOpenUploadImage(true);
    setSelectedThemeID(theme_id);
    fetchAdminGallery();
  };

  const onConfirmSelectImage = () => {
    appContext.setIsLoading(true);
    closeUploadImage();

    const formData = generateFormData({
      selectedImageName: selectedImageName,
      themeID: selectedThemeID,
    });

    axios
      .post(
        `${process.env.REACT_APP_SITE_API_URL}/setthemethumbnail`,
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        fetchThemes();
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

  const onUploadImage = (e) => {
    setIsImageUploaded(true);
    setUploadedImage(e.target.files[0]);
  };

  useEffect(() => {
    document.title = "Dashboard";
    fetchThemes();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isOpenUploadImage && (
        <div className="admin-upload-image">
          <div
            className="admin-upload-image-blur"
            onClick={closeUploadImage}
          ></div>
          <div className="admin-upload-image-box">
            <header>
              <h3>choose image</h3>
              <button onClick={closeUploadImage}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            </header>
            <section>
              {gallery.length > 0
                ? gallery.map((image, index) => {
                    const url = `${process.env.REACT_APP_BASE_API_URL}/public/admin/images/${image}`;
                    return (
                      <div className="gallery-image-container" key={index}>
                        <input id={image} name="gallery-radio" type="radio" />
                        <label htmlFor={image}>
                          <img
                            alt=""
                            className="gallery-image"
                            onClick={() => {
                              handleClickGalleryImage(image);
                            }}
                            src={url}
                          />
                        </label>
                      </div>
                    );
                  })
                : "no image"}
            </section>
            <footer>
              <div className="footer-left">
                <input
                  id="upload"
                  name="upload"
                  onChange={(e) => onUploadImage(e)}
                  type="file"
                />
                <ButtonRipple
                  className="admin-upload-image-footer-button"
                  disabled={!isImageUploaded}
                  onClick={() => handleClickUploadImage()}
                  text="submit"
                />
              </div>
              <div className="footer-right">
                <ButtonRipple
                  className="admin-upload-image-footer-button"
                  disabled={!isImageSelected}
                  onClick={() => onConfirmSelectImage()}
                  text="confirm"
                />
              </div>
            </footer>
          </div>
        </div>
      )}

      <div className="navbar-margin">
        <div className="admin-dashboard">
          <header>
            <h2>Theme List</h2>
            <ButtonRipple
              fa={<FontAwesomeIcon icon={faPlus} />}
              iconIsLeft={true}
              onClick={handleClickCreateTheme}
              text="Create New Theme"
            />
          </header>
          <section className="theme-list">
            {themes
              ? themes.map((props) => {
                  const { theme_id, theme_name, theme_thumbnail_image_name } =
                    props;
                  return (
                    <div className="theme-container" key={theme_id}>
                      <div className="theme-options">
                        <FontAwesomeIcon
                          className="theme-options-icon"
                          icon={faEllipsisV}
                        />
                        <ul>
                          <li
                            onClick={(e) => {
                              if (e.target === e.currentTarget) {
                                handleClickTheme(theme_id);
                              }
                            }}
                          >
                            <FontAwesomeIcon
                              className="theme-option-icon"
                              icon={faEdit}
                            />
                            edit
                          </li>
                          <li
                            onClick={(e) => {
                              if (e.target === e.currentTarget) {
                                console.log("1");
                              }
                            }}
                          >
                            <FontAwesomeIcon
                              className="theme-option-icon"
                              icon={faEye}
                            />
                            preview
                          </li>
                          <li
                            onClick={(e) => {
                              if (e.target === e.currentTarget) {
                                handleClickThumbnail(theme_id);
                              }
                            }}
                          >
                            <FontAwesomeIcon
                              className="theme-option-icon"
                              icon={faImage}
                            />
                            thumbnail
                          </li>
                          <li
                            onClick={(e) => {
                              if (e.target === e.currentTarget) {
                                console.log("1");
                              }
                            }}
                          >
                            <FontAwesomeIcon
                              className="theme-option-icon"
                              icon={faTrashAlt}
                            />
                            delete
                          </li>
                        </ul>
                      </div>
                      <div
                        className="theme-content"
                        onClick={(e) => {
                          if (e.target === e.currentTarget) {
                            handleClickTheme(theme_id);
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
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
