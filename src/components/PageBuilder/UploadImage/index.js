import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { generateFormData } from "../../../utils/generateFormData";
import { PageBuilderContext } from "../../Pages/Pricing";
import { PropsTypes } from "../../../utils/PropsTypes";

import LoadingScreen from "../../LoadingScreen";

//css
import "./uploadimage.css";

const UploadImage = ({ isMultiple }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [userGallery, setUserGallery] = useState([]);

  const fetchUserGallery = () => {
    setIsLoading(true);

    const formData = generateFormData({
      userLoggedInID: JSON.parse(localStorage.getItem("userLoggedIn")).user_id,
    });

    axios
      .post(`${process.env.REACT_APP_SITE_URL}/getusergallery`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        //success
        setIsLoading(false);
        setUserGallery(res.data.result);
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
        setIsLoading(false);
      });
  };

  const handleUpload = () => {
    setIsLoading(true);

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
        setIsLoading(false);
        console.log(res.data);
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
        setIsLoading(false);
      });
  };

  const handleClickUserGalleryImage = (url) => {
    setIsSelected(true);
    setSelectedFile(url);
  };

  const onConfirmSelectFile = () => {
    pageBuilderContext.closeUploadImage();
    pageBuilderContext.editComponentProps(
      PropsTypes.BACKGROUND_IMAGE,
      "",
      selectedFile
    );
    pageBuilderContext.boardState.getComponentData = true;
  };

  const onUploadFile = (e) => {
    setIsUploaded(true);
    setUploadedFile(e.target.files[0]);
  };

  useEffect(() => {
    fetchUserGallery();
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}

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
                        key={user_gallery_id}
                        className="user-gallery-image-wrapper"
                      >
                        <input
                          type="radio"
                          name="user-gallery-radio"
                          id={user_gallery_image_name}
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
