import React, { useEffect, useRef } from "react";
import ButtonRipple from "../../../ButtonRipple";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";

//components
import MessageModal from "../../../MessageModal";

//css
import "./themename.css";

const ThemeName = ({ closeModal, handleClickSetThemeName, modalState }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { ref } = register("themeName");
  const themeNameRef = useRef(null);

  const onSubmit = () => {
    handleClickSetThemeName(themeNameRef.current.value);
  };

  useEffect(() => {
    themeNameRef.current.focus();
  }, []);

  return (
    <section className="theme-name">
      <h1>what is the name of your theme?</h1>
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
            id="themeName"
            className={errors.themeName && "form-input-error"}
            {...register("themeName", {
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
              themeNameRef.current = e; // you can still assign to ref
            }}
          />
          <label htmlFor="themeName">
            <span></span>
          </label>
          {errors.themeName && (
            <span className="error-message">
              <FontAwesomeIcon icon={faExclamationCircle} /> &nbsp;
              {errors.themeName.message}
            </span>
          )}
        </div>
        <ButtonRipple type="submit" text="confirm" />
      </form>
    </section>
  );
};

export default ThemeName;
