import React, { useEffect, useRef } from "react";
import ButtonRipple from "../../../ButtonRipple";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";

//components
import MessageModal from "../../../MessageModal";

//css
import "./websitename.css";

const WebsiteName = ({ closeModal, handleClickSetWebsiteName, modalState }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { ref } = register("websiteName");
  const websiteNameRef = useRef(null);

  const onSubmit = () => {
    handleClickSetWebsiteName(websiteNameRef.current.value);
  };

  useEffect(() => {
    websiteNameRef.current.focus();
  }, []);

  return (
    <section className="website-name">
      <h1>what is the name of your business or website?</h1>
      {modalState.isShowMessageModal && (
        <MessageModal
          closeModal={closeModal}
          content={modalState.messageModalContent}
          statusCode={modalState.messageModalStatusCode}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-input">
          <input
            id="websiteName"
            className={errors.websiteName && "form-input-error"}
            {...register("websiteName", {
              required: "this field is required",
              pattern: {
                value:
                  // eslint-disable-next-line
                  /^([A-Za-z]|[0-9]|_)+$/,
                message: "invalid format",
              },
            })}
            ref={(e) => {
              ref(e);
              websiteNameRef.current = e; // you can still assign to ref
            }}
          />
          <label htmlFor="websiteName">
            <span></span>
          </label>
          {errors.websiteName && (
            <span className="error-message">
              <FontAwesomeIcon icon={faExclamationCircle} /> &nbsp;
              {errors.websiteName.message}
            </span>
          )}
        </div>
        <ButtonRipple type="submit" text="confirm" />
      </form>
    </section>
  );
};

export default WebsiteName;
