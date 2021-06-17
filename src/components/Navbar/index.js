import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import $ from "jquery";
import logo from "../../public/assets/images/logo.svg";

//css
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();

  const handleClickLogout = () => {
    localStorage.clear();
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
            <img src={logo} alt="logo" />
          </li>
          <li>
            <NavLink exact to="/" activeClassName="navbar-active">
              Home
            </NavLink>
          </li>
          <li>
            {localStorage.getItem("userLoggedIn") && (
              <NavLink exact to="/dashboard" activeClassName="navbar-active">
                Dashboard
              </NavLink>
            )}
          </li>
          <li>
            <NavLink exact to="/pricing" activeClassName="navbar-active">
              Pricing
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-item-middle"></ul>
        {localStorage.getItem("userLoggedIn") ? (
          <ul className="navbar-user-control">
            <li>
              Hello,{" "}
              {JSON.parse(localStorage.getItem("userLoggedIn")).user_name}
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
