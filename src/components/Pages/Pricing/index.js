import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import EncryptStorage from "encrypt-storage";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../utils/generateFormData";
import { useForm } from "react-hook-form";

//components
import ButtonRipple from "../../ButtonRipple";
import MessageModal from "../../MessageModal";

//css
import "./pricing.css";

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

const Pricing = () => {
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

  const encryptStorage = EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const [BCAVAPaymentVA, setBCAVAPaymentVA] = useState(null);
  const [isBCAVAPayment, setIsBCAVAPayment] = useState(false);
  const [isCCPayment, setIsCCPayment] = useState(false);
  const [isOpenChoosePayment, setIsOpenChoosePayment] = useState(false);
  const [packageID, setPackageID] = useState(null);
  const [packages, setPackages] = useState([]);

  const doCCPayment = async (params) => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      packageID: packageID,
      tokenID: params,
      userID: encryptStorage.getItem("user_logged_in").user_id,
    });

    axios
      .post(`${process.env.REACT_APP_SITE_API_URL}/ccpayment`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        if (res.data.status_code === 200) {
        } else {
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
        appContext.setIsLoading(false);
      });
  };

  const fetchPackages = async () => {
    appContext.setIsLoading(true);

    axios
      .get(`${process.env.REACT_APP_SITE_API_URL}/getpackages`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        setPackages(res.data.result);
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

  const fetchUserTransactionStatus = async () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      userID: encryptStorage.getItem("user_logged_in").user_id,
    });

    axios
      .post(
        `${process.env.REACT_APP_SITE_API_URL}/getusertransactiondata`,
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        if (res.data.status === 200) {
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
        appContext.setIsLoading(false);
      });
  };

  const handleClickBCAVAPayment = () => {
    setIsBCAVAPayment(true);
  };

  const handleClickButtonBack = () => {
    if (isBCAVAPayment) {
      setIsBCAVAPayment(false);
    } else if (isCCPayment) {
      setIsCCPayment(false);
    }
  };

  const handleClickCCPayment = () => {
    setIsCCPayment(true);
  };

  const handleCloseChoosePayment = () => {
    setIsOpenChoosePayment(false);
    setIsBCAVAPayment(false);
    setIsCCPayment(false);
  };

  const handleClickDoBCAVAPayment = () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      packageID: packageID,
      userID: encryptStorage.getItem("user_logged_in").user_id,
    });

    axios
      .post(`${process.env.REACT_APP_SITE_API_URL}/bcavapayment`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        if (res.data.status_code === "201") {
          setBCAVAPaymentVA(res.data.va_numbers[0].va_number);
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
        appContext.setIsLoading(false);
      });
  };

  const handleClickDoCCPayment = () => {
    appContext.setIsLoading(true);

    const cardData = {
      card_number: "4811111111111114",
      card_exp_month: "02",
      card_exp_year: "2025",
      card_cvv: "123",
    };

    const options = {
      onSuccess: function (response) {
        // Success to get card token_id, implement as you wish here
        // console.log("Success to get card token_id, response:", response);
        const token_id = response.token_id;

        // console.log("This is the card token_id:", token_id);
        // Implement sending the token_id to backend to proceed to next step

        appContext.setIsLoading(false);
        doCCPayment(token_id);
      },
      onFailure: function (response) {
        // Fail to get card token_id, implement as you wish here
        console.log("Fail to get card token_id, response:", response);

        // you may want to implement displaying failure message to customer.
        // Also record the error message to your log, so you can review
        // what causing failure on this transaction.
      },
    };

    window.MidtransNew3ds.getCardToken(cardData, options);
  };

  const handleClickSelectPackage = (params) => {
    setIsOpenChoosePayment(true);
    setPackageID(params);
  };

  useEffect(() => {
    document.title = "Pricing";
    fetchPackages();
    if (encryptStorage.getItem("user_logged_in")) {
      fetchUserTransactionStatus();
    }

    const midtransScriptUrl =
      "https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.id = "midtrans-script";
    scriptTag.type = "text/javascript";
    scriptTag.setAttribute(
      "data-client-key",
      process.env.REACT_APP_MIDTRANS_CLIENT_KEY
    );
    scriptTag.setAttribute("data-environment", "sandbox");
    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="navbar-margin">
      <div className="pricing">
        {isOpenChoosePayment && (
          <div className="payment-list">
            <div
              className="payment-list-blur"
              onClick={handleCloseChoosePayment}
            ></div>
            <div className="payment-list-box">
              <div className="payment-list-content-header">
                <h3>choose your payment gateway</h3>
                <button onClick={handleCloseChoosePayment}>
                  <FontAwesomeIcon icon={faTimesCircle} />
                </button>
              </div>
              <div className="payment-list-content">
                {!(isBCAVAPayment || isCCPayment) && (
                  <div className="payment-list-content-choose-payment">
                    <div
                      className="payment-list-content-choose-payment-option"
                      onClick={() => handleClickBCAVAPayment()}
                    >
                      <img
                        alt=""
                        className="payment-list-content-choose-payment-img"
                        src={`${process.env.REACT_APP_BASE_API_URL}/public/admin/icons/bca_payment_icon.png`}
                      />
                      <span>bca virtual account</span>
                      <FontAwesomeIcon
                        className="payment-list-content-choose-payment-icon"
                        icon={faChevronRight}
                      />
                    </div>
                    <div
                      className="payment-list-content-choose-payment-option"
                      onClick={() => handleClickCCPayment()}
                    >
                      <FontAwesomeIcon
                        className="payment-list-content-choose-payment-icon"
                        icon={faCreditCard}
                      />
                      <span>credit card</span>
                      <FontAwesomeIcon
                        className="payment-list-content-choose-payment-icon"
                        icon={faChevronRight}
                      />
                    </div>
                  </div>
                )}

                {isBCAVAPayment && (
                  <div className="payment-list-content-confirm-payment-bcava">
                    {BCAVAPaymentVA && (
                      <>
                        <h3>please complete your payment using this code</h3>
                        <span>{BCAVAPaymentVA}</span>
                      </>
                    )}
                    {!BCAVAPaymentVA && (
                      <ButtonRipple
                        onClick={handleClickDoBCAVAPayment}
                        text="get code"
                      />
                    )}
                  </div>
                )}
                {isCCPayment && (
                  <>
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
                            <FontAwesomeIcon icon={faExclamationCircle} />{" "}
                            &nbsp;
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
                            <FontAwesomeIcon icon={faExclamationCircle} />{" "}
                            &nbsp;
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
                            <FontAwesomeIcon icon={faExclamationCircle} />{" "}
                            &nbsp;
                            {errors.password.message}
                          </span>
                        )}
                      </div>

                      <div className="form-input">
                        <input
                          id="confirmPassword"
                          type="password"
                          className={
                            errors.confirmPassword && "form-input-error"
                          }
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
                            <FontAwesomeIcon icon={faExclamationCircle} />{" "}
                            &nbsp;
                            {errors.confirmPassword.message}
                          </span>
                        )}
                      </div>

                      <ButtonRipple type="submit" text="sign up" />
                    </form>

                    <div className="payment-list-content-confirm-payment-cc">
                      <input
                        type="text"
                        name="card_number"
                        placeholder="card_number"
                      />
                      <input
                        type="text"
                        name="card_exp_month"
                        placeholder="card_exp_month"
                      />
                      <input
                        type="text"
                        name="card_exp_year"
                        placeholder="card_exp_year"
                      />
                      <input
                        type="text"
                        name="card_cvv"
                        placeholder="card_cvv"
                      />
                      <button
                        onClick={() => {
                          handleClickDoCCPayment();
                        }}
                      >
                        pay
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="payment-list-content-footer">
                {(isCCPayment || isBCAVAPayment) && (
                  <ButtonRipple
                    className="button-back"
                    fa={<FontAwesomeIcon icon={faArrowLeft} />}
                    iconIsLeft={true}
                    onClick={handleClickButtonBack}
                    text="back"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        <div className="package-list">
          {packages
            ? packages.map((props) => {
                const { package_id, package_price, package_name } = props;
                return (
                  <div className="package" key={package_id}>
                    <div>{package_name}</div>
                    <div>{package_price}</div>
                    <button
                      onClick={() => handleClickSelectPackage(package_id)}
                    >
                      select
                    </button>
                  </div>
                );
              })
            : "no package"}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
