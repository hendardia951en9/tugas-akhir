import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { generateFormData } from "../../../utils/generateFormData";

import "./pricing.css";

// Sandbox Environment: https://api.sandbox.midtrans.com
// Production Environment: https://api.midtrans.com

// const paymentData = {
//   payment_type: "credit_card",
//   transaction_details: {
//     order_id: "C17550",
//     gross_amount: 145000,
//   },
//   credit_card: {
//     token_id: "< your token ID >",
//   },
//   item_details: [
//     {
//       id: "a1",
//       price: 145000,
//       quantity: 2,
//       name: "Apel",
//       brand: "Fuji Apple",
//       category: "Fruit",
//       merchant_name: "Fruit-store",
//     },
//   ],
//   customer_details: {
//     first_name: "BUDI",
//     last_name: "UTOMO",
//     email: "test@midtrans.com",
//     phone: "+628123456",
//     billing_address: {
//       first_name: "BUDI",
//       last_name: "UTOMO",
//       email: "test@midtrans.com",
//       phone: "081 2233 44-55",
//       address: "Sudirman",
//       city: "Jakarta",
//       postal_code: "12190",
//       country_code: "IDN",
//     },
//     shipping_address: {
//       first_name: "BUDI",
//       last_name: "UTOMO",
//       email: "test@midtrans.com",
//       phone: "0 8128-75 7-9338",
//       address: "Sudirman",
//       city: "Jakarta",
//       postal_code: "12190",
//       country_code: "IDN",
//     },
//   },
// };

const Pricing = () => {
  const appContext = useContext(AppContext);

  const handleClickGetPaymentStatus = async (params) => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      premiumLevel: params,
    });

    axios
      .post(
        `${process.env.REACT_APP_SITE_API_URL}/getmidtranspaymentstatus`,
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
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

  const handleClickSetPremium = async (params) => {
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

        const formData = generateFormData({
          premiumLevel: params,
          tokenID: token_id,
        });

        axios
          .post(`${process.env.REACT_APP_SITE_API_URL}/setpremium`, formData, {
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

  useEffect(() => {
    document.title = "Pricing";

    const midtransScriptUrl =
      "https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js";
    const myMidtransEnvironment = "sandbox";
    const myMidtransClientKey = "SB-Mid-client-EDrxxrjiUc7sEj2j";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.id = "midtrans-script";
    scriptTag.type = "text/javascript";
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);
    scriptTag.setAttribute("data-environment", myMidtransEnvironment);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className="navbar-margin">
      <div className="pricing">
        <button onClick={() => handleClickSetPremium(1)}>pay</button>
      </div>
    </div>
  );
};

export default Pricing;
