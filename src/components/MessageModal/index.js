import React, { useEffect } from "react";

//css
import "./messagemodal.css";

const MessageModal = ({ closeModal, content, statusCode }) => {
  useEffect(() => {
    setTimeout(function () {
      closeModal();
    }, 3000);
  });

  return (
    <div
      className={`message-modal ${
        statusCode === 200 || statusCode === 201 ? "success" : "error"
      }`}
    >
      {content}
    </div>
  );
};

export default MessageModal;
