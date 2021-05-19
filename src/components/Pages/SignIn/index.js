import React, { useEffect, useRef, useReducer, useState } from "react";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import axios from "axios";
import $ from "jquery";

import ButtonRipple from "../../ButtonRipple";
import LoadingScreen from "../../LoadingScreen";
import MessageModal from "../../MessageModal";

//css
import "./signin.css";

const reducer = (state, action) => {
  if (action.type === "SHOW_MODAL") {
    return {
      ...state,
      isShowMessageModal: true,
      messageModalContent: action.payload,
      messageModalStatusCode: action.statusCode,
    };
  } else if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      isShowMessageModal: false,
    };
  }

  throw new Error("no matching action type");
};

const SignIn = ({ login }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const emailRef = useRef(null);
  const { ref } = register("email");
  const [state, dispatch] = useReducer(reducer, {
    isShowMessageModal: false,
    messageModalContent: "hello world",
    messageModalStatusCode: 200,
  });
  const history = useHistory();

  useEffect(() => {
    document.title = "Sign In";
    emailRef.current.focus();
    console.log("useeffect signin");
  }, []);

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

  const onSubmit = async (data) => {
    setIsLoading(true);

    axios
      .post(`http://localhost:8080/login`, data)
      .then((res) => {
        //success
        console.log(res.data);
        setIsLoading(false);
        if (res.data.status === 200) {
          localStorage.setItem(
            "userLoggedIn",
            JSON.stringify({
              token: res.data.token,
              user: res.data.user,
            })
          );
          login();
          history.push("/");
        } else {
          dispatch({
            type: "SHOW_MODAL",
            payload: res.data.message,
            statusCode: res.data.status,
          });
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

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  console.log("render signin");

  return (
    <>
      {isLoading && <LoadingScreen />}

      <div className="navbar-margin">
        <div className="sign-in-box">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {state.isShowMessageModal && (
              <MessageModal
                closeModal={closeModal}
                content={state.messageModalContent}
                statusCode={state.messageModalStatusCode}
              />
            )}
            <div className="form-input">
              <input
                id="email"
                className={errors.email && "form-input-error"}
                {...register("email", {
                  required: "this field is required",
                  pattern: {
                    // eslint-disable-next-line
                    value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "invalid format",
                  },
                })}
                ref={(e) => {
                  ref(e);
                  emailRef.current = e; // you can still assign to ref
                }}
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

            <ButtonRipple type="submit" text="sign in" />
          </form>
          <p className="asterisk">
            &#42; By logging in, you agree to our Terms of Use and to receive
            our emails & updates and acknowledge that you read our Privacy
            Policy.
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
