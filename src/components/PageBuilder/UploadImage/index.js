import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { generateFormData } from "../../../utils/generateFormData";
import { PageBuilderContext } from "../../Pages/WebGenerator";
import { PropsTypes } from "../../../utils/PropsTypes";

//css
import "./uploadimage.css";

let selectedFileMultiple = [];

const UploadImage = ({ isMultiple }) => {
  const appContext = useContext(AppContext);
  const pageBuilderContext = useContext(PageBuilderContext);

  const [isSelected, setIsSelected] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [userGallery, setUserGallery] = useState([]);

  const fetchUserGallery = async () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      userLoggedInID: JSON.parse(localStorage.getItem("userLoggedIn")).user_id,
    });

    axios
      .post(`${process.env.REACT_APP_SITE_URL}/getusergallery`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        setUserGallery(res.data.result);

        //set all image selected status with false
        if (isMultiple && res.data.result) {
          selectedFileMultiple = [];

          res.data.result.forEach((result) => {
            const { user_gallery_image_name } = result;
            const url = `${process.env.REACT_APP_BASE_URL}/public/uploads/${
              JSON.parse(localStorage.getItem("userLoggedIn")).user_id
            }/${user_gallery_image_name}`;
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
  };

  const handleUpload = () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      file: uploadedFile,
      userLoggedInID: JSON.parse(localStorage.getItem("userLoggedIn")).user_id,
    });

    axios
      .post(`${process.env.REACT_APP_SITE_URL}/uploadimage`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        fetchUserGallery();
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
      pageBuilderContext.editComponentProps(
        PropsTypes.BACKGROUND_IMAGE,
        "",
        selectedFile
      );
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
    fetchUserGallery();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="upload-image">
        <div
          className="upload-image-blur"
          onClick={pageBuilderContext.closeUploadImage}
        ></div>
        <div className="upload-image-box">
          <div className="upload-image-content-wrapper">
            <div className="upload-image-content-header">header</div>
            <div className="upload-image-content">
              {userGallery
                ? isMultiple === false
                  ? userGallery.map((gallery) => {
                      const { user_gallery_id, user_gallery_image_name } =
                        gallery;
                      const url = `${
                        process.env.REACT_APP_BASE_URL
                      }/public/uploads/${
                        JSON.parse(localStorage.getItem("userLoggedIn")).user_id
                      }/${user_gallery_image_name}`;

                      return (
                        <label
                          className="user-gallery-image-wrapper"
                          key={user_gallery_id}
                        >
                          <input
                            id={user_gallery_image_name}
                            name="user-gallery-radio"
                            type="radio"
                          />
                          <img
                            alt=""
                            className="user-gallery-image"
                            height="200px"
                            onClick={() => {
                              handleClickUserGalleryImage(url);
                            }}
                            src={url}
                            width="200px"
                          />
                        </label>
                      );
                    })
                  : userGallery.map((gallery) => {
                      const { user_gallery_id, user_gallery_image_name } =
                        gallery;
                      const url = `${
                        process.env.REACT_APP_BASE_URL
                      }/public/uploads/${
                        JSON.parse(localStorage.getItem("userLoggedIn")).user_id
                      }/${user_gallery_image_name}`;

                      return (
                        <label
                          className="user-gallery-image-wrapper"
                          key={user_gallery_id}
                        >
                          <input
                            id={user_gallery_image_name}
                            name="user-gallery-checkbox"
                            onChange={(e) => {
                              onChangeCheckboxImageGallery(e, url);
                            }}
                            type="checkbox"
                          />
                          <img
                            alt=""
                            className="user-gallery-image"
                            height="200px"
                            src={url}
                            width="200px"
                          />
                        </label>
                      );
                    })
                : "no image"}
            </div>
            <div className="upload-image-content-footer">
              <input
                type="file"
                name="upload"
                id="upload"
                onChange={(e) => onUploadFile(e)}
              />
              <button disabled={!isUploaded} onClick={handleUpload}>
                Submit
              </button>
              <button disabled={!isSelected} onClick={onConfirmSelectFile}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadImage;
