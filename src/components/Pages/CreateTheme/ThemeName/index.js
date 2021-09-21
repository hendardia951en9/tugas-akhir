import React, { useEffect, useRef, useState } from "react";
import ButtonRipple from "../../../ButtonRipple";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
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
  const [themeIsPremium, setThemeIsPremium] = useState(false);

  const handleChangeRadioThemeIsPremium = (params) => {
    setThemeIsPremium(params);
  };

  const onSubmit = () => {
    handleClickSetThemeName(themeNameRef.current.value, themeIsPremium);
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
        <div className="theme-is-premium">
          <h3>Premium User Only?</h3>
          <div className="theme-is-premium-radio">
            <input
              id="themeIsPremiumYes"
              name="themeIsPremium"
              onChange={() => handleChangeRadioThemeIsPremium(true)}
              type="radio"
            />
            <label
              className={`theme-is-premium-yes ${
                themeIsPremium ? "active" : ""
              }`}
              htmlFor="themeIsPremiumYes"
            >
              <FontAwesomeIcon icon={faCheckCircle} />
            </label>
            <input
              checked={!themeIsPremium}
              id="themeIsPremiumNo"
              name="themeIsPremium"
              onChange={() => handleChangeRadioThemeIsPremium(false)}
              type="radio"
            />
            <label
              className={`theme-is-premium-no ${
                themeIsPremium ? "" : "active"
              }`}
              htmlFor="themeIsPremiumNo"
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </label>
          </div>
        </div>
        <ButtonRipple type="submit" text="confirm" />
      </form>
    </section>
  );
};

export default ThemeName;
