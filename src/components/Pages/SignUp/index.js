import React, { useContext, useEffect, useRef, useReducer } from "react";
import $ from "jquery";
import { AppContext } from "../../../App";
import axios from "axios";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../utils/generateFormData";
import { useForm } from "react-hook-form";

//components
import ButtonRipple from "../../ButtonRipple";
import MessageModal from "../../MessageModal";

//css
import "./signup.css";

const modalReducer = (modalState, action) => {
  if (action.type === "SHOW_MODAL") {
    return {
      ...modalState,
      isShowMessageModal: true,
      messageModalContent: action.payload,
      messageModalStatusCode: action.statusCode,
    };
  } else if (action.type === "CLOSE_MODAL") {
    return {
      ...modalState,
      isShowMessageModal: false,
    };
  }

  throw new Error("no matching action type");
};

const SignUp = () => {
  const appContext = useContext(AppContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const nameRef = useRef(null);
  const { ref } = register("name");
  const [modalState, modalDispatch] = useReducer(modalReducer, {
    isShowMessageModal: false,
    messageModalContent: "hello world",
    messageModalStatusCode: 200,
  });

  const closeModal = () => {
    modalDispatch({ type: "CLOSE_MODAL" });
  };

  const onSubmit = async (data) => {
    appContext.setIsLoading(true);
    const formData = generateFormData(data);

    axios
      .post(`${process.env.REACT_APP_SITE_API_URL}/registeruser`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        modalDispatch({
          type: "SHOW_MODAL",
          payload: res.data.message,
          statusCode: res.data.status,
        });
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
  };

  useEffect(() => {
    document.title = "Sign Up";
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
    nameRef.current.focus();
  }, []);

  return (
    <div className="navbar-margin">
      <div className="sign-up-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {modalState.isShowMessageModal && (
            <MessageModal
              closeModal={closeModal}
              content={modalState.messageModalContent}
              statusCode={modalState.messageModalStatusCode}
            />
          )}
          <div className="form-input">
            <input
              id="name"
              className={errors.name && "form-input-error"}
              {...register("name", {
                required: "this field is required",
                pattern: {
                  // eslint-disable-next-line
                  value: /^[a-z ,.'-]+$/i,
                  message: "invalid format",
                },
              })}
              ref={(e) => {
                ref(e);
                nameRef.current = e; // you can still assign to ref
              }}
            />
            <label htmlFor="name">
              <span>name</span>
            </label>
            {errors.name && (
              <span className="error-message">
                <FontAwesomeIcon icon={faExclamationCircle} /> &nbsp;
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="form-input">
            <input
              id="email"
              className={errors.email && "form-input-error"}
              {...register("email", {
                required: "this field is required",
                pattern: {
                  value:
                    // eslint-disable-next-line
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "invalid format",
                },
              })}
            />
            <label htmlFor="email">
              <span>email</span>
            </label>
            {errors.email && (
              <span className="error-message">
                <FontAwesomeIcon icon={faExclamationCircle} /> &nbsp;
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="form-input">
            <input
              id="password"
              type="password"
              className={errors.password && "form-input-error"}
              {...register("password", {
                required: "this field is required",
              })}
            />
            <label htmlFor="password">
              <span>password</span>
            </label>
            {errors.password && (
              <span className="error-message">
                <FontAwesomeIcon icon={faExclamationCircle} /> &nbsp;
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="form-input">
            <input
              id="confirmPassword"
              type="password"
              className={errors.confirmPassword && "form-input-error"}
              {...register("confirmPassword", {
                required: "this field is required",
                validate: (value) => {
                  if (value !== watch("password")) {
                    return "password and confirm password do not match";
                  }
                },
              })}
            />
            <label htmlFor="confirmPassword">
              <span>confirm password</span>
            </label>
            {errors.confirmPassword && (
              <span className="error-message">
                <FontAwesomeIcon icon={faExclamationCircle} /> &nbsp;
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <ButtonRipple type="submit" text="sign up" />
        </form>
        <p className="asterisk">
          &#42; By signing up, you agree to our Terms of Use and to receive Our
          emails & updates and acknowledge that you read our Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
