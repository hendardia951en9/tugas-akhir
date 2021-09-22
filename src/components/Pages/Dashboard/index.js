import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../utils/generateFormData";
import { openInNewTab } from "../../../utils/openInNewTab";
import { useHistory } from "react-router-dom";

//components
import ButtonRipple from "../../ButtonRipple";

//css
import "./dashboard.css";

const Dashboard = () => {
  const appContext = useContext(AppContext);

  const encryptStorage = EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const history = useHistory();
  const [userSites, setUserSites] = useState([]);

  const fetchUserSites = async () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      userLoggedInID: encryptStorage.getItem("user_logged_in").user_id,
    });

    axios
      .post(`${process.env.REACT_APP_SITE_API_URL}/getusersites`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        setUserSites(res.data.result);
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

  const handleClickDeleteSite = (site_id) => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      siteID: site_id,
    });

    axios
      .post(`${process.env.REACT_APP_SITE_API_URL}/deletesite`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        fetchUserSites();
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
    history.push("/gettingstarted");
  };

  const handleClickPublishSite = (site_id) => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      siteID: site_id,
    });

    axios
      .post(`${process.env.REACT_APP_SITE_API_URL}/publishsite`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        fetchUserSites();
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

  const handleClickSite = (site_id, site_name) => {
    encryptStorage.setItem("site_id", site_id);
    encryptStorage.setItem("site_name", site_name);
    history.push("/webgenerator");
  };

  const handleClickUnpublishSite = (site_id) => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      siteID: site_id,
    });

    axios
      .post(`${process.env.REACT_APP_SITE_API_URL}/unpublishsite`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        fetchUserSites();
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
    document.title = "Dashboard";
    fetchUserSites();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="navbar-margin">
        <div className="dashboard">
          <img
            className="background-image"
            src="/assets/images/home/swiper_fade_1.jpg"
            alt=""
          />

          <header>
            <h2>my sites</h2>
            <ButtonRipple
              fa={<FontAwesomeIcon icon={faPlus} />}
              iconIsLeft={true}
              onClick={handleClickGettingStarted}
              text="Create New Site"
            />
          </header>
          <section className="user-sites">
            {userSites
              ? userSites.map((props, index) => {
                  const { site_id, site_name, site_status } = props;

                  return (
                    <div className="user-site-container" key={site_id}>
                      <div className="user-site-options">
                        <FontAwesomeIcon
                          className="user-site-options-icon"
                          icon={faEllipsisV}
                        />
                        <ul>
                          <li
                            onClick={(e) => {
                              if (e.target === e.currentTarget) {
                                handleClickSite(site_id, site_name);
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
                                openInNewTab(
                                  `${process.env.REACT_APP_BASE_URL}/website/${
                                    encryptStorage.getItem("user_logged_in")
                                      .user_email
                                  }/${site_name}`
                                );
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
                                history.push(`/manageuserpages/${site_id}`);
                              }
                            }}
                          >
                            <FontAwesomeIcon
                              className="user-site-option-icon"
                              icon={faWindowRestore}
                            />
                            pages
                          </li>
                          {site_status === "0" ? (
                            <li
                              onClick={(e) => {
                                if (e.target === e.currentTarget) {
                                  handleClickPublishSite(site_id);
                                }
                              }}
                            >
                              <FontAwesomeIcon
                                className="user-site-option-icon"
                                icon={faGlobe}
                              />
                              publish
                            </li>
                          ) : (
                            <li
                              onClick={(e) => {
                                if (e.target === e.currentTarget) {
                                  handleClickUnpublishSite(site_id);
                                }
                              }}
                            >
                              <FontAwesomeIcon
                                className="user-site-option-icon"
                                icon={faGlobe}
                              />
                              unpublish
                            </li>
                          )}
                          <li
                            onClick={(e) => {
                              if (e.target === e.currentTarget) {
                                handleClickDeleteSite(site_id);
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
                      <div
                        className="user-site-content"
                        onClick={(e) => {
                          if (e.target === e.currentTarget) {
                            handleClickSite(site_id, site_name);
                          }
                        }}
                      >
                        <img
                          src={`${
                            process.env.REACT_APP_BASE_API_URL
                          }/public/admin/images/user_website_thumbnail_${
                            index % 4
                          }.jpg`}
                          alt=""
                        />
                        <p>{site_name}</p>
                      </div>
                    </div>
                  );
                })
              : "no sites"}
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
