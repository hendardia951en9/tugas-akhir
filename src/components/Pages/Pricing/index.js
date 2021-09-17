import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import EncryptStorage from "encrypt-storage";
import { generateFormData } from "../../../utils/generateFormData";

import "./pricing.css";

const Pricing = () => {
  const appContext = useContext(AppContext);

  const encryptStorage = EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const [isBCAVAPayment, setIsBCAVAPayment] = useState(false);
  const [isCCPayment, setIsCCPayment] = useState(false);
  const [isOpenChoosePayment, setIsOpenChoosePayment] = useState(false);
  const [packageID, setPackageID] = useState(null);
  const [packages, setPackages] = useState([]);

  const doCCPayment = async (params) => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      tokenID: params,
    });

    axios
      .post(`${process.env.REACT_APP_SITE_API_URL}/ccpayment`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        console.log(res.data);
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

  const handleClickBCAVAPayment = () => {
    setIsBCAVAPayment(true);
  };

  const handleClickCCPayment = () => {
    setIsCCPayment(true);
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
        console.log(res.data);
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
        console.log("Success to get card token_id, response:", response);
        const token_id = response.token_id;

        console.log("This is the card token_id:", token_id);
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
          <div>
            <div onClick={() => setIsOpenChoosePayment(!isOpenChoosePayment)}>
              close
            </div>
            <div onClick={() => handleClickBCAVAPayment()}>bca va</div>
            {isBCAVAPayment && (
              <button
                onClick={() => {
                  handleClickDoBCAVAPayment();
                }}
              >
                pay
              </button>
            )}
            <div onClick={() => handleClickCCPayment()}>credit card</div>
            {isCCPayment && (
              <div>
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
                <input type="text" name="card_cvv" placeholder="card_cvv" />
                <button
                  onClick={() => {
                    handleClickDoCCPayment();
                  }}
                >
                  pay
                </button>
              </div>
            )}
          </div>
        )}

        {packages
          ? packages.map((props) => {
              const { package_id, package_price, package_name } = props;
              return (
                <div className="package" key={package_id}>
                  <div>{package_name}</div>
                  <div>{package_price}</div>
                  <button onClick={() => handleClickSelectPackage(package_id)}>
                    select
                  </button>
                </div>
              );
            })
          : "no package"}
      </div>
    </div>
  );
};

export default Pricing;
