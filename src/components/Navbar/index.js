import React, { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserLoggedInContext } from "../../App";

import $ from "jquery";
import logo from "../../public/assets/images/logo.svg";

//css
import "./navbar.css";

const Navbar = ({ logout }) => {
  const userLoggedIn = useContext(UserLoggedInContext);
  const location = useLocation();

  const handleScroll = () => {
    let scrollPos = document.documentElement.scrollTop;

    if (scrollPos > 0) {
      $("nav").addClass("scrolled");
    } else {
      $("nav").removeClass("scrolled");
    }
  };

  useEffect(() => {
    console.log("useeffect navbar location");

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

  console.log("render navbar");

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
            {userLoggedIn && (
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
        <ul className="navbar-item-right">
          {userLoggedIn ? (
            <>
              <li>
                Hello, {JSON.parse(userLoggedIn).user.user_name}
                <ul>
                  <li>
                    <NavLink
                      exact
                      to="/logout"
                      activeClassName="navbar-active"
                      onClick={() => logout()}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
      <div className="navbar-slider"></div>
    </nav>
  );
};

export default Navbar;
