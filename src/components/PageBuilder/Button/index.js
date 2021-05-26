import React, { useContext } from "react";
import { generateStyle } from "../../../utils/generateStyle";
import { PageBuilderContext } from "../../Pages/Pricing";

//css
import "./button.css";

const Button = ({ componentKey, itemTypes, props }) => {
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
    <button
      className="button-component"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          pageBuilderContext.handleClick(itemTypes, componentKey);
        }
      }}
      style={generateStyle(editStyle(props.style, props.buttonAlignment))}
    >
      {props.text}
    </button>
  );
};

export default Button;
