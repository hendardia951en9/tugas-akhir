import React, { useContext, useEffect, useRef, useState } from "react";
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
import { openInNewTab } from "../../../utils/openInNewTab";
import { useHistory } from "react-router-dom";

//components
import ButtonRipple from "../../ButtonRipple";

//css
import "./admindashboard.css";

const AdminDashboard = () => {
  const appContext = useContext(AppContext);

  const [categories, setCategories] = useState([]);
  const categoryDropDown = useRef(null);
  const encryptStorage = EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const [gallery, setGallery] = useState([]);
  const history = useHistory();
  const [isCategoryList, setIsCategoryList] = useState(true);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isOpenUploadImage, setIsOpenUploadImage] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState(null);
  const [selectedThemeID, setSelectedThemeID] = useState(0);
  const [themes, setThemes] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);

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

  const fetchThemesByCategory = (params) => {
    appContext.setIsLoading(true);

    if (params && params !== "*") {
      const formData = generateFormData({
        categoryID: params,
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
    } else {
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
    }
  };

  const handleClickCreateCategory = () => {
    history.push("/createcategory");
  };

  const handleClickCreateTheme = () => {
    history.push("/createtheme");
  };

  // const handleClickDeleteCategory = (category_id) => {
  //   appContext.setIsLoading(true);

  //   const formData = generateFormData({
  //     categoryID: category_id,
  //   });

  //   axios
  //     .post(`${process.env.REACT_APP_SITE_API_URL}/deletecategory`, formData, {
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     })
  //     .then((res) => {
  //       //success
  //       appContext.setIsLoading(false);
  //       fetchCategories();
  //     })
  //     .catch((err) => {
  //       //error
  //       if (err.response) {
  //         console.log("res error", err.response.data);
  //       } else if (err.request) {
  //         console.log("req error", err.request.data);
  //       } else {
  //         console.log("Error", err.message);
  //       }
  //       appContext.setIsLoading(false);
  //     });
  // };

  const handleClickDeleteTheme = (theme_id) => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      themeID: theme_id,
    });

    axios
      .post(`${process.env.REACT_APP_SITE_API_URL}/deletetheme`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        fetchThemesByCategory();
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

  const handleOnChangeCategory = (params) => {
    fetchThemesByCategory(params);
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
        fetchThemesByCategory(categoryDropDown.current.value);
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
    fetchCategories();
    fetchThemesByCategory();
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
            <div className="admin-upload-image-footer">
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
            </div>
          </div>
        </div>
      )}

      <div className="navbar-margin">
        <div className="admin-dashboard">
          {isCategoryList ? (
            <>
              <header>
                <div className="title">
                  <h2 className="active">category list</h2>
                  <h2
                    onClick={() => {
                      fetchThemesByCategory();
                      setIsCategoryList(!isCategoryList);
                    }}
                  >
                    theme list
                  </h2>
                </div>
                <ButtonRipple
                  fa={<FontAwesomeIcon icon={faPlus} />}
                  iconIsLeft={true}
                  onClick={handleClickCreateCategory}
                  text="create new category"
                />
              </header>
              <section className="category-list">
                {categories
                  ? categories.map((props) => {
                      const { category_id, category_name } = props;
                      return (
                        <div className="category-container" key={category_id}>
                          {/* <div className="category-options">
                            <FontAwesomeIcon
                              className="category-options-icon"
                              icon={faEllipsisV}
                            />
                            <ul>
                              <li
                                onClick={(e) => {
                                  if (e.target === e.currentTarget) {
                                    handleClickDeleteCategory(category_id);
                                  }
                                }}
                              >
                                <FontAwesomeIcon
                                  className="category-option-icon"
                                  icon={faTrashAlt}
                                />
                                delete
                              </li>
                            </ul>
                          </div> */}
                          <div className="category-content">
                            {category_name}
                          </div>
                        </div>
                      );
                    })
                  : "no category"}
              </section>
            </>
          ) : (
            <>
              <header>
                <div className="title">
                  <h2
                    onClick={() => {
                      fetchCategories();
                      setIsCategoryList(!isCategoryList);
                    }}
                  >
                    category list
                  </h2>
                  <h2 className="active">theme list</h2>
                </div>
                <ButtonRipple
                  fa={<FontAwesomeIcon icon={faPlus} />}
                  iconIsLeft={true}
                  onClick={handleClickCreateTheme}
                  text="create new theme"
                />
              </header>
              <div className="theme-list-category">
                <span>choose category</span>
                <select
                  id="category"
                  name="category"
                  onChange={(e) => handleOnChangeCategory(e.target.value)}
                  ref={categoryDropDown}
                >
                  <option key="*" value="*">
                    all
                  </option>
                  {categories
                    ? categories.map((props) => {
                        const { category_id, category_name } = props;

                        return (
                          <option key={category_id} value={category_id}>
                            {category_name}
                          </option>
                        );
                      })
                    : ""}
                </select>
              </div>
              <section className="theme-list">
                {themes
                  ? themes.map((props) => {
                      const {
                        theme_id,
                        theme_name,
                        theme_thumbnail_image_name,
                        theme_first_page_name,
                      } = props;
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
                                    openInNewTab(
                                      `${process.env.REACT_APP_BASE_URL}/theme/${theme_id}/${theme_first_page_name}`
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
                                    handleClickDeleteTheme(theme_id);
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
