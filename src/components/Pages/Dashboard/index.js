import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { generateFormData } from "../../../utils/generateFormData";
import { useHistory } from "react-router-dom";
import { UserLoggedInContext } from "../../../App";

//components
import LoadingScreen from "../../LoadingScreen";

//css
import "./dashboard.css";

const Dashboard = () => {
  const userLoggedIn = useContext(UserLoggedInContext);

  const [userSite, setUserSite] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const getSitePagesBySiteID = async (site_id) => {
    setIsLoading(true);

    const formData = generateFormData({
      siteID: site_id,
    });

    axios
      .post(
        `http://localhost/tugasakhir/index.php/api/getsitepagesbysiteid`,
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((res) => {
        //success
        setIsLoading(false);
        if (res.data.status === 200) {
          localStorage.setItem(
            "site_pages_id",
            res.data.result[0].site_pages_id
          );
          history.push("/pricing");
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

  const handleClickSite = (site_id) => {
    localStorage.setItem("site_id", site_id);
    getSitePagesBySiteID(site_id);
  };

  useEffect(() => {
    const getUserSite = async () => {
      setIsLoading(true);

      const formData = generateFormData({
        userLoggedInID: JSON.parse(userLoggedIn).user_id,
      });

      axios
        .post(
          `http://localhost/tugasakhir/index.php/api/getusersite`,
          formData,
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then((res) => {
          //success
          setIsLoading(false);
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
          setIsLoading(false);
        });
    };

    document.title = "Dashboard";
    getUserSite();
  }, [userLoggedIn]);

  return (
    <>
      {isLoading && <LoadingScreen />}

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
