import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

//components
import ButtonRipple from "../../ButtonRipple";

//css
import "./admindashboard.css";

const AdminDashboard = () => {
  const appContext = useContext(AppContext);

  const encryptStorage = EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const history = useHistory();
  const [themes, setThemes] = useState([]);

  const fetchThemes = () => {
    appContext.setIsLoading(true);

    axios
      .get(`${process.env.REACT_APP_SITE_API_URL}/getthemes`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
        setThemes(res.data.result);
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

  const handleClickCreateTheme = () => {
    history.push("/createtheme");
  };

  const handleClickTheme = (theme_id) => {
    encryptStorage.setItem("theme_id", theme_id);
    history.push("/webgenerator");
  };

  useEffect(() => {
    document.title = "Dashboard";
    fetchThemes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="navbar-margin">
      <div className="admin-dashboard">
        <header>
          <h2>Theme List</h2>
          <ButtonRipple
            fa={<FontAwesomeIcon icon={faPlus} />}
            iconIsLeft={true}
            onClick={handleClickCreateTheme}
            text="Create New Theme"
          />
        </header>
        <section className="theme-list">
          {themes
            ? themes.map((props) => {
                const { theme_id, theme_name } = props;
                return (
                  <div className="theme-container" key={theme_id}>
                    <div className="theme-options">
                      <FontAwesomeIcon
                        className="theme-options-icon"
                        icon={faEllipsisV}
                      />
                      <ul>
                        <li
                          onClick={(e) => {
                            if (e.target === e.currentTarget) {
                              handleClickTheme(theme_id);
                            }
                          }}
                        >
                          <FontAwesomeIcon
                            className="theme-option-icon"
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
                            className="theme-option-icon"
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
                            className="theme-option-icon"
                            icon={faTrashAlt}
                          />
                          delete
                        </li>
                      </ul>
                    </div>
                    <div
                      className="theme-content"
                      onClick={(e) => {
                        if (e.target === e.currentTarget) {
                          handleClickTheme(theme_id);
                        }
                      }}
                    >
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAGyGOY_cAPZH8_JqgUXWXTrSN_ECPjRJBiQ&usqp=CAU"
                        alt=""
                      />
                      <p>{theme_name}</p>
                    </div>
                  </div>
                );
              })
            : "no themes"}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
