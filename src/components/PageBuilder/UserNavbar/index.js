import React, { useContext } from "react";
import { ItemTypes } from "../../../utils/ItemTypes";
import { PageBuilderContext } from "../../Pages/WebGenerator";
import { generateStyle } from "../../../utils/generateStyle";

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
            className="user-navbar-menu-logo"
            src={props.userNavbarLogo}
            alt=""
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
                            ItemTypes.USER_NAVBAR_MENU,
                            [ItemTypes.USER_NAVBAR_MENU, index]
                          );
                        }
                      }
                    : undefined
                }
                style={generateStyle(props.menuStyle)}
              >
                {menu.props.text}
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
                                      ItemTypes.USER_NAVBAR_SUBMENU,
                                      [
                                        ItemTypes.USER_NAVBAR_SUBMENU,
                                        index,
                                        index2,
                                      ]
                                    );
                                  }
                                }
                              : undefined
                          }
                          style={generateStyle(props.subMenuStyle)}
                        >
                          {submenu.props.text}
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
