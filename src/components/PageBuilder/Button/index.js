import React from "react";
import { generateStyle } from "../../../utils/generateStyle";

//css
import "./button.css";

const Button = ({ props }) => {
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
    <button
      className="button-component"
      onClick={props.onClick}
      style={generateStyle(editStyle(props.style, props.buttonAlignment))}
    >
      {props.text}
    </button>
  );
};

export default Button;
