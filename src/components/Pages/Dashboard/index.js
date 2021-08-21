import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../utils/generateFormData";
import { useHistory } from "react-router-dom";

import ButtonRipple from "../../ButtonRipple";

//css
import "./dashboard.css";

const Dashboard = () => {
  const appContext = useContext(AppContext);
  const history = useHistory();
  const [userSites, setUserSites] = useState([]);

  const fetchUserSites = async () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      userLoggedInID: JSON.parse(localStorage.getItem("userLoggedIn")).user_id,
    });

    axios
      .post(`${process.env.REACT_APP_SITE_API_URL}/getusersites`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        if (res.data.status === 200) {
          setUserSites(res.data.result);
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

  const handleClickGettingStarted = () => {
    if (localStorage.getItem("userLoggedIn")) {
      history.push("/gettingstarted");
    } else {
      history.push("/signin");
    }
  };

  const handleClickSite = (site_id) => {
    localStorage.setItem("site_id", site_id);
    history.push("/webgenerator");
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
          <header>
            <h2>My Sites</h2>
            <ButtonRipple
              fa={<FontAwesomeIcon icon={faPlus} />}
              iconIsLeft={true}
              onClick={handleClickGettingStarted}
              text="Create New Site"
            />
          </header>
          <section className="user-sites">
            {userSites.map((props) => {
              const { site_id, site_name } = props;
              return (
                <div className="user-site-container" key={site_id}>
                  <div
                    className="user-site-content"
                    onClick={(e) => {
                      if (e.target === e.currentTarget) {
                        handleClickSite(site_id);
                      }
                    }}
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAGyGOY_cAPZH8_JqgUXWXTrSN_ECPjRJBiQ&usqp=CAU"
                      alt=""
                    />
                    <p>{site_name}</p>
                  </div>
                  <div className="user-site-options">
                    <FontAwesomeIcon
                      className="user-site-options-icon"
                      icon={faEllipsisV}
                    />
                    <ul>
                      <li
                        onClick={(e) => {
                          if (e.target === e.currentTarget) {
                            handleClickSite(site_id);
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          className="user-site-option-icon"
                          icon={faEdit}
                        />
                        edit
                      </li>
                      <li
                        onClick={(e) => {
                          if (e.target === e.currentTarget) {
                            console.log("1");
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          className="user-site-option-icon"
                          icon={faEye}
                        />
                        preview
                      </li>
                      <li
                        onClick={(e) => {
                          if (e.target === e.currentTarget) {
                            console.log("1");
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          className="user-site-option-icon"
                          icon={faGlobe}
                        />
                        publish
                      </li>
                      <li
                        onClick={(e) => {
                          if (e.target === e.currentTarget) {
                            console.log("1");
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          className="user-site-option-icon"
                          icon={faTrashAlt}
                        />
                        delete
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
