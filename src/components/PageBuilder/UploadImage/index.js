import React, { useState } from "react";
import axios from "axios";
import { generateFormData } from "../../../utils/generateFormData";

import LoadingScreen from "../../LoadingScreen";

//css
import "./uploadimage.css";

const UploadImage = ({ closeUploadImage, isMultiple }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const onSelectFile = (e) => {
    setIsSelected(true);
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    setIsLoading(true);

    const formData = generateFormData({
      file: JSON.stringify(selectedFile),
    });

    axios
      .post(`http://localhost/tugasakhir/index.php/api/uploadImage`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        setIsLoading(false);
        console.log(res.data);
        if (res.data.status === 200) {
          console.log("sucess");
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
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <LoadingScreen />}

      <div className="upload-image">
        <div className="upload-image-blur" onClick={closeUploadImage}></div>
        <div className="upload-image-box">
          <div className="upload-image-content-wrapper">
            <div className="upload-image-content-header">header</div>
            <div className="upload-image-content">
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
            <div className="upload-image-content-footer">footer</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadImage;
