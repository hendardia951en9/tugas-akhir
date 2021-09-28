import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../utils/generateFormData";
import { PageBuilderContext } from "../../Pages/WebGenerator";
import { PropsTypes } from "../../../utils/PropsTypes";

//components
import ButtonRipple from "../../ButtonRipple";

//css
import "./uploadvideo.css";

const UploadVideo = () => {
  const appContext = useContext(AppContext);
  const pageBuilderContext = useContext(PageBuilderContext);

  const encryptStorage = EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const [isSelected, setIsSelected] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [userGallery, setUserGallery] = useState([]);

  const fetchVideoGallery = async () => {
    appContext.setIsLoading(true);

    //jika admin
    if (encryptStorage.getItem("admin_logged_in")) {
      axios
        .get(`${process.env.REACT_APP_SITE_API_URL}/getadminvideogallery`, {
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
          `${process.env.REACT_APP_SITE_API_URL}/getuservideogallery`,
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
          `${process.env.REACT_APP_SITE_API_URL}/uploadvideoadmin`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          //success
          appContext.setIsLoading(false);
          fetchVideoGallery();
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
          `${process.env.REACT_APP_SITE_API_URL}/uploadvideouser`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          //success
          appContext.setIsLoading(false);
          fetchVideoGallery();
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

  const handleClickUserGalleryVideo = (url) => {
    setIsSelected(true);
    setSelectedFile(url);
  };

  const onConfirmSelectFile = () => {
    pageBuilderContext.closeUploadVideo();
    pageBuilderContext.editComponentProps(PropsTypes.SOURCE, "", selectedFile);
    pageBuilderContext.boardState.getComponentData = true;
  };

  const onUploadFile = (e) => {
    setIsUploaded(true);
    setUploadedFile(e.target.files[0]);
  };

  useEffect(() => {
    fetchVideoGallery();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="upload-video">
      <div
        className="upload-video-blur"
        onClick={pageBuilderContext.closeUploadVideo}
      ></div>
      <div className="upload-video-box">
        <div className="upload-video-content-header">
          <h3>choose video</h3>
          <button onClick={pageBuilderContext.closeUploadVideo}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        </div>
        <div className="upload-video-content">
          {userGallery
            ? encryptStorage.getItem("admin_logged_in")
              ? userGallery.map((video, index) => {
                  const url = `${process.env.REACT_APP_BASE_API_URL}/public/admin/videos/${video}`;

                  return (
                    <div className="user-gallery-video-container" key={index}>
                      <input
                        id={video}
                        name="user-gallery-radio"
                        type="radio"
                      />
                      <label htmlFor={video}>
                        <video
                          controls={false}
                          onClick={() => {
                            handleClickUserGalleryVideo(url);
                          }}
                        >
                          <source src={url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </label>
                    </div>
                  );
                })
              : userGallery.map((video, index) => {
                  const url = `${
                    process.env.REACT_APP_BASE_API_URL
                  }/public/uploads/${
                    encryptStorage.getItem("user_logged_in").user_id
                  }/videos/${video}`;

                  return (
                    <div className="user-gallery-video-container" key={index}>
                      <input
                        id={video}
                        name="user-gallery-radio"
                        type="radio"
                      />
                      <label htmlFor={video}>
                        <video
                          controls={false}
                          onClick={() => {
                            handleClickUserGalleryVideo(url);
                          }}
                        >
                          <source src={url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </label>
                    </div>
                  );
                })
            : "no video"}
        </div>
        <div className="upload-video-content-footer">
          <div className="upload-video-content-footer-left">
            <input
              id="upload"
              name="upload"
              onChange={(e) => onUploadFile(e)}
              type="file"
            />
            <ButtonRipple
              className="upload-video-content-footer-button"
              disabled={!isUploaded}
              onClick={() => handleClickUpload()}
              text="submit"
            />
          </div>
          <ButtonRipple
            className="upload-video-content-footer-button"
            disabled={!isSelected}
            onClick={() => onConfirmSelectFile()}
            text="confirm"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
