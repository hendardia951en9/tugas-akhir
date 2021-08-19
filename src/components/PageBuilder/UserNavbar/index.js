import React, { useContext } from "react";
import { checkLinkTo } from "../../../utils/checkLinkTo";
import { generateStyle } from "../../../utils/generateStyle";
import { NavLink } from "react-router-dom";
import { PageBuilderContext } from "../../Pages/WebGenerator";

//css
import "./usernavbar.css";

const UserNavbar = ({ componentKey, isEdit, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <div
      className="user-navbar"
      onClick={
        isEdit
          ? (e) => {
              if (e.target === e.currentTarget) {
                pageBuilderContext.handleClickPageBuilderComponent(
                  itemTypes,
                  componentKey
                );
              }
            }
          : undefined
      }
      style={generateStyle(props.style)}
    >
      <ul style={{ gap: props.style.gap.value + props.style.gap.unit }}>
        <li
          className="user-navbar-menu"
          style={{
            display: props.userNavbarLogoIsShow === true ? "block" : "none",
          }}
        >
          <img
            alt=""
            className="user-navbar-menu-logo"
            src={props.userNavbarLogo}
            style={{
              maxHeight:
                props.userNavbarLogoMaxHeight.value +
                props.userNavbarLogoMaxHeight.unit,
              maxWidth:
                props.userNavbarLogoMaxWidth.value +
                props.userNavbarLogoMaxWidth.unit,
            }}
          />
        </li>
        {props.menu &&
          props.menu.map((menu, index) => {
            return (
              <li
                className="user-navbar-menu"
                key={index}
                onClick={
                  isEdit
                    ? (e) => {
                        if (e.target === e.currentTarget) {
                          pageBuilderContext.handleClickPageBuilderComponent(
                            menu.itemTypes,
                            [menu.itemTypes, index]
                          );
                        }
                      }
                    : undefined
                }
              >
                {isEdit ? (
                  <div className="component-wrapper">{menu.props.text}</div>
                ) : checkLinkTo(menu.props.linkTo) === true ? (
                  <NavLink exact to={menu.props.linkTo}>
                    {menu.props.text}
                  </NavLink>
                ) : (
                  <a href={menu.props.linkTo}>{menu.props.text}</a>
                )}
                {menu.submenu.length > 0 && (
                  <ul style={generateStyle(props.subMenuStyle)}>
                    {menu.submenu.map((submenu, index2) => {
                      return (
                        <li
                          key={index2}
                          onClick={
                            isEdit
                              ? (e) => {
                                  if (e.target === e.currentTarget) {
                                    pageBuilderContext.handleClickPageBuilderComponent(
                                      submenu.itemTypes,
                                      [submenu.itemTypes, index, index2]
                                    );
                                  }
                                }
                              : undefined
                          }
                          style={generateStyle(props.subMenuStyle)}
                        >
                          {isEdit ? (
                            submenu.props.text
                          ) : checkLinkTo(submenu.props.linkTo) === true ? (
                            <NavLink exact to={submenu.props.linkTo}>
                              {submenu.props.text}
                            </NavLink>
                          ) : (
                            <a href={submenu.props.linkTo}>
                              {submenu.props.text}
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default UserNavbar;
