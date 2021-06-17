import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { generateFormData } from "../../../utils/generateFormData";
import { useHistory } from "react-router-dom";

//css
import "./dashboard.css";

const Dashboard = () => {
  const appContext = useContext(AppContext);
  const history = useHistory();
  const [userSite, setUserSite] = useState([]);

  const fetchUserSitePages = async () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      siteID: localStorage.getItem("site_id"),
    });

    axios
      .post(`${process.env.REACT_APP_SITE_URL}/getusersitepages`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        if (res.data.status === 200) {
          //get page index 0 to edit
          localStorage.setItem("site_page_id", res.data.result[0].site_page_id);
          history.push("/webgenerator");
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

  const fetchUserSites = async () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      userLoggedInID: JSON.parse(localStorage.getItem("userLoggedIn")).user_id,
    });

    axios
      .post(`${process.env.REACT_APP_SITE_URL}/getusersites`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        if (res.data.status === 200) {
          setUserSite(res.data.result);
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

  const handleClickSite = (site_id) => {
    localStorage.setItem("site_id", site_id);
    fetchUserSitePages();
  };

  useEffect(() => {
    document.title = "Dashboard";
    fetchUserSites();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="navbar-margin">
        <div className="dashboard">
          {userSite.map((props) => {
            const { site_id, site_name } = props;
            return (
              <div key={site_id} onClick={() => handleClickSite(site_id)}>
                {site_name}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
