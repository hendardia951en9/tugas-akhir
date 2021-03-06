import React, { useEffect } from "react";
import $ from "jquery";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//components
import ButtonRipple from "../ButtonRipple";

//css
import "./popupmodal.css";

const PopUpModal = ({ closeModal, content, statusCode }) => {
  useEffect(() => {
    $("input").each(function () {
      if ($(this).val().length > 0) {
        $(this).addClass("not-empty");
      } else {
        $(this).removeClass("not-empty");
      }

      $(this).on("change", function () {
        if ($(this).val().length > 0) {
          $(this).addClass("not-empty");
        } else {
          $(this).removeClass("not-empty");
        }
      });
    });
  });

  return (
    <div className="popup-modal">
      <div className="popup-modal-blur" onClick={() => closeModal()}></div>
      <div className="popup-modal-box">
        <div className="popup-modal-content-header">
          {statusCode === 200 || statusCode === 201 ? (
            <h3>success</h3>
          ) : statusCode === 300 ? (
            <h3>confirm</h3>
          ) : (
            <h3>error</h3>
          )}
          <button onClick={() => closeModal()}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        </div>
        <div className="popup-modal-content">
          {statusCode === 200 || statusCode === 201 ? (
            <span className="icon-green">
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>
          ) : statusCode === 300 ? (
            <span className="icon-gray">
              <FontAwesomeIcon icon={faQuestionCircle} />
            </span>
          ) : (
            <span className="icon-red">
              <FontAwesomeIcon icon={faTimesCircle} />
            </span>
          )}
          {statusCode === 201 ? (
            <>
              <p>site published in</p>
              <form action="" className="form-input">
                <input
                  type="text"
                  name="siteUrl"
                  id="siteUrl"
                  value={content.description}
                  readOnly
                />
                <label htmlFor="siteUrl">
                  <span>site url</span>
                </label>
              </form>
            </>
          ) : statusCode === 300 ? (
            <p>{content.message}</p>
          ) : (
            <p>{content}</p>
          )}
        </div>
        <div className="popup-modal-content-footer">
          {statusCode === 300 ? (
            <div className="button-wrapper">
              <ButtonRipple
                text="yes"
                onClick={() => {
                  content.onClick();
                  closeModal();
                }}
              />
              <ButtonRipple text="no" onClick={closeModal} />
            </div>
          ) : (
            <ButtonRipple onClick={closeModal} text="ok" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUpModal;
