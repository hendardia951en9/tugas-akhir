import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import $ from "jquery";
import { AppContext } from "../../../App";
import axios from "axios";
import EncryptStorage from "encrypt-storage";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../utils/generateFormData";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

//components
import ButtonRipple from "../../ButtonRipple";
import MessageModal from "../../MessageModal";

//css
import "./subscription.css";

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

const Subscription = () => {
  const appContext = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const cardNumberRef = useRef(null);
  const { ref } = register("cardNumber");
  const [modalState, modalDispatch] = useReducer(modalReducer, {
    isShowMessageModal: false,
    messageModalContent: "hello world",
    messageModalStatusCode: 200,
  });

  const encryptStorage = EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const [BCAVAPaymentVA, setBCAVAPaymentVA] = useState(null);
  const history = useHistory();
  const [isBCAVAPayment, setIsBCAVAPayment] = useState(false);
  const [isCCPayment, setIsCCPayment] = useState(false);
  const [isOpenChoosePayment, setIsOpenChoosePayment] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [transactionKind, setTransactionKind] = useState(null);

  const calculateDate = () => {
    const endDate = new Date(subscriptionData.subscription_end_date);
    const dateNow = new Date();

    return parseInt((endDate - dateNow) / (1000 * 60 * 60 * 24));
  };

  const checkSubscription = async (params) => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      userID: params,
    });

    axios
      .post(
        `${process.env.REACT_APP_SITE_API_URL}/checksubscriptiondate`,
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        if (res.data.status === 200) {
          setSubscriptionData(res.data.result);
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

  const closeModal = () => {
    modalDispatch({ type: "CLOSE_MODAL" });
  };

  const doCCPayment = async (params) => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      packageID: subscriptionData.subscription_package_id,
      tokenID: params,
      userID: encryptStorage.getItem("user_logged_in").user_id,
    });

    axios
      .post(
        `${process.env.REACT_APP_SITE_API_URL}/${
          transactionKind === "extend" ? "ccpaymentextend" : "ccpaymentupgrade"
        }`,
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((res) => {
        //success
        appContext.setIsLoading(false);

        if (res.data.status_code === "200") {
          checkSubscription(encryptStorage.getItem("user_logged_in").user_id);
          modalDispatch({
            type: "SHOW_MODAL",
            payload: res.data.status_message,
            statusCode: parseInt(res.data.status_code),
          });
        } else {
          modalDispatch({
            type: "SHOW_MODAL",
            payload: res.data.status_message,
            statusCode: parseInt(res.data.status_code),
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
        appContext.setIsLoading(false);
      });
  };

  const extendSubscription = () => {
    setTransactionKind("extend");
    setIsOpenChoosePayment(true);
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

  const handleClickCloseChoosePayment = () => {
    setIsOpenChoosePayment(false);
    setIsBCAVAPayment(false);
    setIsCCPayment(false);
  };

  const handleClickDoBCAVAPayment = async () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      packageID: subscriptionData.subscription_package_id,
      userID: encryptStorage.getItem("user_logged_in").user_id,
    });

    axios
      .post(
        `${process.env.REACT_APP_SITE_API_URL}/${
          transactionKind === "extend"
            ? "bcavapaymentextend"
            : "bcavapaymentupgrade"
        }`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
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

  const handleClickDoCCPayment = async (data) => {
    $(".payment-list-content").scrollTop(0);
    appContext.setIsLoading(true);

    const cardData = {
      card_number: data.cardNumber,
      card_exp_month: data.cardExpMonth,
      card_exp_year: data.cardExpYear,
      card_cvv: data.cardCVV,
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
        // console.log("Fail to get card token_id, response:", response);

        appContext.setIsLoading(false);

        modalDispatch({
          type: "SHOW_MODAL",
          payload: response.status_message,
          statusCode: response.status_code,
        });

        // you may want to implement displaying failure message to customer.
        // Also record the error message to your log, so you can review
        // what causing failure on this transaction.
      },
    };

    window.MidtransNew3ds.getCardToken(cardData, options);
  };

  const upgradeSubscription = () => {
    setTransactionKind("upgrade");
    setIsOpenChoosePayment(true);
  };

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

    return () => {};
  }, [isCCPayment]);

  useEffect(() => {
    document.title = "Subscription";
    checkSubscription(encryptStorage.getItem("user_logged_in").user_id);

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
      {isOpenChoosePayment && (
        <div className="payment-list">
          <div
            className="payment-list-blur"
            onClick={handleClickCloseChoosePayment}
          ></div>
          <div className="payment-list-box">
            <div className="payment-list-content-header">
              <h3>
                {isCCPayment ? "fill card info" : "choose payment gateway"}
              </h3>
              <button onClick={handleClickCloseChoosePayment}>
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
                  {modalState.isShowMessageModal && (
                    <MessageModal
                      closeModal={closeModal}
                      content={modalState.messageModalContent}
                      statusCode={modalState.messageModalStatusCode}
                    />
                  )}
                  {BCAVAPaymentVA ? (
                    <>
                      <h3>please complete your payment using this code</h3>
                      <span>{BCAVAPaymentVA}</span>
                    </>
                  ) : (
                    <ButtonRipple
                      onClick={handleClickDoBCAVAPayment}
                      text="get code"
                    />
                  )}
                </div>
              )}
              {isCCPayment && (
                <div className="payment-list-content-confirm-payment-cc">
                  <form onSubmit={handleSubmit(handleClickDoCCPayment)}>
                    {modalState.isShowMessageModal && (
                      <MessageModal
                        closeModal={closeModal}
                        content={modalState.messageModalContent}
                        statusCode={modalState.messageModalStatusCode}
                      />
                    )}

                    <div className="form-input">
                      <input
                        id="cardNumber"
                        className={errors.cardNumber && "form-input-error"}
                        {...register("cardNumber", {
                          required: "this field is required",
                        })}
                        ref={(e) => {
                          ref(e);
                          cardNumberRef.current = e; // you can still assign to ref
                        }}
                      />
                      <label htmlFor="cardNumber">
                        <span>card number</span>
                      </label>
                      {errors.cardNumber && (
                        <span className="error-message">
                          <FontAwesomeIcon icon={faExclamationCircle} />
                          &nbsp;
                          {errors.cardNumber.message}
                        </span>
                      )}
                    </div>

                    <div className="form-input">
                      <input
                        id="cardExpMonth"
                        className={errors.cardExpMonth && "form-input-error"}
                        {...register("cardExpMonth", {
                          required: "this field is required",
                        })}
                      />
                      <label htmlFor="cardExpMonth">
                        <span>card exp month</span>
                      </label>
                      {errors.cardExpMonth && (
                        <span className="error-message">
                          <FontAwesomeIcon icon={faExclamationCircle} />
                          &nbsp;
                          {errors.cardExpMonth.message}
                        </span>
                      )}
                    </div>

                    <div className="form-input">
                      <input
                        id="cardExpYear"
                        className={errors.cardExpYear && "form-input-error"}
                        {...register("cardExpYear", {
                          required: "this field is required",
                        })}
                      />
                      <label htmlFor="cardExpYear">
                        <span>card exp year</span>
                      </label>
                      {errors.cardExpYear && (
                        <span className="error-message">
                          <FontAwesomeIcon icon={faExclamationCircle} />
                          &nbsp;
                          {errors.cardExpYear.message}
                        </span>
                      )}
                    </div>

                    <div className="form-input">
                      <input
                        id="cardCVV"
                        className={errors.cardCVV && "form-input-error"}
                        {...register("cardCVV", {
                          required: "this field is required",
                        })}
                      />
                      <label htmlFor="cardCVV">
                        <span>card cvv</span>
                      </label>
                      {errors.cardCVV && (
                        <span className="error-message">
                          <FontAwesomeIcon icon={faExclamationCircle} />
                          &nbsp;
                          {errors.cardCVV.message}
                        </span>
                      )}
                    </div>

                    <ButtonRipple type="submit" text="submit" />
                  </form>
                </div>
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

      <section
        className="subscription-page"
        style={{
          backgroundImage:
            "url('/assets/images/global/subscription_background.png')",
        }}
      >
        {subscriptionData ? (
          <>
            <h1>
              your
              <span>
                {subscriptionData.subscription_package_id === "1"
                  ? " vip "
                  : " vvip "}
              </span>
              subscription will end {calculateDate() > 0 ? "in" : ""}
            </h1>
            <p>{calculateDate() > 0 ? calculateDate() + " day" : "today"}</p>
            <div className="subscription-options">
              {subscriptionData.subscription_package_id === "1" ? (
                <ButtonRipple
                  fa={<FontAwesomeIcon icon={faShoppingCart} />}
                  text="vvip for 8000"
                  onClick={() => upgradeSubscription()}
                />
              ) : (
                ""
              )}
              <ButtonRipple
                fa={<FontAwesomeIcon icon={faShoppingCart} />}
                text="extend for 5000"
                onClick={() => extendSubscription()}
              />
            </div>
          </>
        ) : (
          <>
            <h1>you have no subscription</h1>
            <ButtonRipple
              fa={<FontAwesomeIcon icon={faShoppingCart} />}
              text="subscribe now"
              onClick={() => history.push("/pricing")}
            />
          </>
        )}
      </section>
    </div>
  );
};

export default Subscription;
