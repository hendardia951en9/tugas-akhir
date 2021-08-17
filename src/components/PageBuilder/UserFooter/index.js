import React, { useContext } from "react";
import { checkLinkTo } from "../../../utils/checkLinkTo";
import { generateStyle } from "../../../utils/generateStyle";
import { IconPickerItem } from "react-fa-icon-picker";
import { ItemTypes } from "../../../utils/ItemTypes";
import { NavLink } from "react-router-dom";
import { PageBuilderContext } from "../../Pages/WebGenerator";

//css
import "./userfooter.css";

const UserFooter = ({ componentKey, isEdit, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <div>
      {props.type === ItemTypes.USER_FOOTER_TYPE_1 ? (
        <div className="user-footer-type-1">
          <div
            className="flex-container"
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
            <img
              alt=""
              src={props.userFooterLogo}
              style={{
                maxHeight:
                  props.userFooterLogoMaxHeight.value +
                  props.userFooterLogoMaxHeight.unit,
                maxWidth:
                  props.userFooterLogoMaxWidth.value +
                  props.userFooterLogoMaxWidth.unit,
                display: props.userFooterLogoIsShow === true ? "block" : "none",
              }}
            />
            {props.menu.map((menu, index) => {
              return (
                <div key={index} className="user-footer-menu-container">
                  <span
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
                    {menu.props.text}
                  </span>
                  <div
                    className="user-footer-submenu-container"
                    style={Object.assign(
                      generateStyle(props.subMenuStyle),
                      generateStyle(props.menu[index].props.style)
                    )}
                  >
                    {menu.submenu.map((submenu, index2) => {
                      return (
                        <div
                          className="user-footer-submenu"
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
                        >
                          {isEdit ? (
                            submenu.props.userFooterSubMenuIsShowIcon ===
                            true ? (
                              <>
                                <IconPickerItem
                                  containerStyles={{
                                    alignItems: "center",
                                    color: generateStyle(
                                      props.subMenuStyle.color
                                    ),
                                    display: "flex",
                                    pointerEvents: "none",
                                  }}
                                  icon={submenu.props.icon}
                                />
                                {submenu.props.text}
                              </>
                            ) : (
                              submenu.props.text
                            )
                          ) : checkLinkTo(submenu.props.linkTo) === true ? (
                            <NavLink exact to={submenu.props.linkTo}>
                              {submenu.props.userFooterSubMenuIsShowIcon ===
                              true ? (
                                <>
                                  <IconPickerItem
                                    containerStyles={{
                                      alignItems: "center",
                                      color: generateStyle(
                                        props.subMenuStyle.color
                                      ),
                                      display: "flex",
                                      pointerEvents: "none",
                                    }}
                                    icon={submenu.props.icon}
                                  />
                                  {submenu.props.text}
                                </>
                              ) : (
                                submenu.props.text
                              )}
                            </NavLink>
                          ) : (
                            <a href={submenu.props.linkTo}>
                              {submenu.props.userFooterSubMenuIsShowIcon ===
                              true ? (
                                <>
                                  <IconPickerItem
                                    containerStyles={{
                                      alignItems: "center",
                                      color: generateStyle(
                                        props.subMenuStyle.color
                                      ),
                                      display: "flex",
                                      pointerEvents: "none",
                                    }}
                                    icon={submenu.props.icon}
                                  />
                                  {submenu.props.text}
                                </>
                              ) : (
                                submenu.props.text
                              )}
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {props.userFooterWatermarkIsShow && (
            <div
              className="footer-watermark"
              style={generateStyle(props.watermarkStyle)}
            >
              {props.userFooterWatermarkText}
            </div>
          )}
        </div>
      ) : (
        "type 2"
      )}
    </div>
  );
};

export default UserFooter;
