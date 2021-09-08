import React, { useContext } from "react";
import { checkLinkTo } from "../../../utils/checkLinkTo";
import { generateStyle } from "../../../utils/generateStyle";
import { NavLink } from "react-router-dom";
import { PageBuilderContext } from "../../Pages/WebGenerator";

//css
import "./button.css";

const Button = ({ componentKey, isEdit, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  const editStyle = (style, buttonAlignment) => {
    if (buttonAlignment === "center") {
      style = {
        ...style,
        marginLeft: {
          ...style.marginLeft,
          unit: "auto",
        },
      };
      style = {
        ...style,
        marginRight: {
          ...style.marginRight,
          unit: "auto",
        },
      };
    } else if (buttonAlignment === "left") {
      style = {
        ...style,
        marginRight: {
          ...style.marginRight,
          unit: "auto",
        },
      };
    } else if (buttonAlignment === "right") {
      style = {
        ...style,
        marginLeft: {
          ...style.marginLeft,
          unit: "auto",
        },
      };
    }

    return style;
  };

  return (
    <div
      className={`button-component-container ${isEdit && "isEdit"}`}
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
    >
      <button
        className={`button-component ${isEdit && "isEdit"}`}
        style={generateStyle(editStyle(props.style, props.buttonAlignment))}
      >
        {isEdit ? (
          props.text
        ) : checkLinkTo(props.linkTo) === true ? (
          <NavLink exact to={props.linkTo}>
            {props.text}
          </NavLink>
        ) : (
          <a href={props.linkTo}>{props.text}</a>
        )}
      </button>
    </div>
  );
};

export default Button;
