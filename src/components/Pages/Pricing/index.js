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

  const handleClickGetPaymentStatus = (params) => {
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

  const handleClickSetPremium = (params) => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      premiumLevel: params,
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
  };

  useEffect(() => {
    document.title = "Pricing";
  }, []);

  return (
    <div className="navbar-margin">
      <div className="pricing">
        <button onClick={() => handleClickSetPremium(1)}>pay</button>
        <button onClick={() => handleClickGetPaymentStatus(1)}>status</button>
      </div>
    </div>
  );
};

export default Pricing;
