import React, { useEffect } from "react";
import $ from "jquery";
import { EncryptStorage } from "encrypt-storage";
import { NavLink, useLocation } from "react-router-dom";

//css
import "./navbar.css";

const Navbar = () => {
  const encryptStorage = EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const location = useLocation();

  const handleClickLogout = () => {
    encryptStorage.clear();
  };

  const handleScroll = () => {
    let scrollPos = document.documentElement.scrollTop;

    if (scrollPos > 0) {
      $("nav").addClass("scrolled");
    } else {
      $("nav").removeClass("scrolled");
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    } else {
      $("nav").addClass("scrolled");
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  return (
    <nav>
      <div className="nav-items">
        <ul className="navbar-item-left">
          <li className="logo">
            {encryptStorage.getItem("admin_logged_in") ? (
              <img src="/assets/images/logo.svg" alt="logo" />
            ) : (
              <NavLink exact to="/">
                <img src="/assets/images/logo.svg" alt="logo" />
              </NavLink>
            )}
          </li>
          {!encryptStorage.getItem("admin_logged_in") && (
            <li>
              <NavLink exact to="/" activeClassName="navbar-active">
                Home
              </NavLink>
            </li>
          )}
          {encryptStorage.getItem("user_logged_in") ? (
            <li>
              <NavLink exact to="/dashboard" activeClassName="navbar-active">
                Dashboard
              </NavLink>
            </li>
          ) : (
            encryptStorage.getItem("admin_logged_in") && (
              <li>
                <NavLink
                  exact
                  to="/admindashboard"
                  activeClassName="navbar-active"
                >
                  Dashboard
                </NavLink>
              </li>
            )
          )}
          <li>
            <NavLink exact to="/pricing" activeClassName="navbar-active">
              Pricing
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-item-middle"></ul>
        {encryptStorage.getItem("user_logged_in") ? (
          <ul className="navbar-user-control">
            <li>
              <span>
                Hello, {encryptStorage.getItem("user_logged_in").user_name}
              </span>
              <ul>
                <li>
                  <NavLink exact to="/gallery" activeClassName="navbar-active">
                    my gallery
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    to="/subscribtion"
                    activeClassName="navbar-active"
                  >
                    subscribtion
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    to="/logout"
                    activeClassName="navbar-active"
                    onClick={() => handleClickLogout()}
                  >
                    logout
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        ) : encryptStorage.getItem("admin_logged_in") ? (
          <ul className="navbar-user-control">
            <li>
              <span>Hello, admin</span>
              <ul>
                <li>
                  <NavLink
                    exact
                    to="/logout"
                    activeClassName="navbar-active"
                    onClick={() => handleClickLogout()}
                  >
                    logout
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        ) : (
          <ul className="navbar-item-right">
            <li>
              <NavLink exact to="/signin" activeClassName="navbar-active">
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/signup"
                activeClassName="navbar-active"
                className="navbar-button"
              >
                Sign Up
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      <div className="navbar-slider"></div>
    </nav>
  );
};

export default Navbar;
