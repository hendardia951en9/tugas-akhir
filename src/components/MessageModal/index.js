import React, { useEffect } from "react";
import "./messagemodal.css";

const MessageModal = ({ closeModal, content, statusCode }) => {
  useEffect(() => {
    setTimeout(function () {
      closeModal();
    }, 3000);
  });

  let className = "";
  if (statusCode === 200) {
    className = "success";
  } else {
    className = "error";
  }

  return <div className={"message-modal " + className}>{content}</div>;
};

export default MessageModal;
