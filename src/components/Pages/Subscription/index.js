import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import EncryptStorage from "encrypt-storage";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../utils/generateFormData";
import { useHistory } from "react-router-dom";

//components
import ButtonRipple from "../../ButtonRipple";

//css
import "./subscription.css";

const Subscription = () => {
  const appContext = useContext(AppContext);

  const encryptStorage = EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const history = useHistory();
  const [subscriptionData, setSubscriptionData] = useState(null);

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

  useEffect(() => {
    checkSubscription(encryptStorage.getItem("user_logged_in").user_id);

    // eslint-disable-next-line
  }, []);

  return (
    <div className="navbar-margin">
      <section className="subscription-page">
        <img
          className="background-image"
          src="/assets/images/global/user_dashboard_background.jpg"
          alt=""
        />

        {subscriptionData ? (
          <>
            <h1>
              your subscription will end {calculateDate() > 0 ? "in" : ""}
            </h1>
            <p>{calculateDate() > 0 ? calculateDate() + " day" : "today"}</p>
            <ButtonRipple
              fa={<FontAwesomeIcon icon={faShoppingCart} />}
              text="extend subscription"
              onClick={() => history.push("/pricing")}
            />
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
