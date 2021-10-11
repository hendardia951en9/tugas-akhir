import React, { useContext } from "react";
import { checkLinkTo } from "../../../utils/checkLinkTo";
import { generatePosition } from "../../../utils/generatePosition";
import { generateStyle } from "../../../utils/generateStyle";
import { IconPickerItem } from "react-fa-icon-picker";
import { NavLink } from "react-router-dom";
import { PageBuilderContext } from "../../Pages/WebGenerator";

//css
import "./icon.css";

const Icon = ({ componentKey, isEdit, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <div
      className={`icon-component ${isEdit && "isEdit"} 
      ${props.style.position === "absolute" ? "isAbsolute" : ""}
      ${props.style.width.unit === "%" && "isPercent"}`}
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
      style={Object.assign(
        props.style.position === "absolute"
          ? generatePosition(props.style)
          : {},
        isEdit
          ? {}
          : { width: props.style.width.value + props.style.width.unit }
      )}
    >
      {isEdit || props.linkTo === "" ? (
        <IconPickerItem
          containerStyles={Object.assign(generateStyle(props.style), {
            alignItems: "center",
            display: "flex",
          })}
          icon={props.icon}
        />
      ) : checkLinkTo(props.linkTo) === true ? (
        <NavLink exact to={props.linkTo}>
          <IconPickerItem
            containerStyles={Object.assign(generateStyle(props.style), {
              alignItems: "center",
              display: "flex",
            })}
            icon={props.icon}
          />
        </NavLink>
      ) : (
        <a href={props.linkTo}>
          <IconPickerItem
            containerStyles={Object.assign(generateStyle(props.style), {
              alignItems: "center",
              display: "flex",
            })}
            icon={props.icon}
          />
        </a>
      )}
    </div>
  );
};

export default Icon;
