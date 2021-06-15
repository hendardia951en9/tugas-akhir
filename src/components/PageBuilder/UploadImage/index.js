import React, { useEffect, useState } from "react";
import axios from "axios";
import { generateFormData } from "../../../utils/generateFormData";

import LoadingScreen from "../../LoadingScreen";

//css
import "./uploadimage.css";

const UploadImage = ({ closeUploadImage, isMultiple }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userGallery, setUserGallery] = useState([]);

  const onSelectFile = (e) => {
    setIsSelected(true);
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    setIsLoading(true);

    const formData = generateFormData({
      file: selectedFile,
      userLoggedInID: JSON.parse(localStorage.getItem("userLoggedIn")).user_id,
    });

    axios
      .post(`http://localhost/tugasakhir/index.php/api/uploadimage`, formData, {
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

  const fetchUserGallery = () => {
    setIsLoading(true);

    const formData = generateFormData({
      userLoggedInID: JSON.parse(localStorage.getItem("userLoggedIn")).user_id,
    });

    axios
      .post(
        `http://localhost/tugasakhir/index.php/api/getusergallery`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
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

  useEffect(() => {
    fetchUserGallery();
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}

      <div className="upload-image">
        <div className="upload-image-blur" onClick={closeUploadImage}></div>
        <div className="upload-image-box">
          <div className="upload-image-content-wrapper">
            <div className="upload-image-content-header">header</div>
            <div className="upload-image-content">
              {userGallery &&
                userGallery.map((gallery) => {
                  const { user_gallery_id, user_gallery_image_name } = gallery;
                  return (
                    <img
                      width="100px"
                      height="100px"
                      key={user_gallery_id}
                      src={`http://localhost/tugasakhir/public/uploads/${
                        JSON.parse(localStorage.getItem("userLoggedIn")).user_id
                      }/${user_gallery_image_name}`}
                      alt=""
                    />
                  );
                })}
            </div>
            <div className="upload-image-content-footer">
              <input
                type="file"
                name="upload"
                id="upload"
                onChange={(e) => onSelectFile(e)}
              />
              <button disabled={!isSelected} onClick={handleUpload}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadImage;
