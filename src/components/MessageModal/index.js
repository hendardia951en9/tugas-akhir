import React, { useEffect } from "react";
import "./messagemodal.css";

const ErrorMessageModal = ({ closeModal, content, statusCode }) => {
  useEffect(() => {
    setTimeout(function () {
      closeModal();
    }, 3000);

    console.log("useeffect error message");
  });

  console.log("render error message");

  let className = "";
  if (statusCode === 200) {
    className = "success";
  } else {
    className = "error";
  }

  return <div className={"message-modal " + className}>{content}</div>;
};

export default ErrorMessageModal;
