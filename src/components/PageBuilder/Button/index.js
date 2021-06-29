import React, { useContext } from "react";
import { generateStyle } from "../../../utils/generateStyle";
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
    <button
      className="button-component"
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
      style={generateStyle(editStyle(props.style, props.buttonAlignment))}
    >
      {isEdit ? props.text : <a href={props.linkTo}>{props.text}</a>}
    </button>
  );
};

export default Button;
