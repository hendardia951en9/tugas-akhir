import React from "react";
import { generateStyle } from "../../../utils/generateStyle";

//css
import "./image.css";

const Image = ({ props }) => {
  const editStyle = (style, imageAlignment) => {
    if (imageAlignment === "center") {
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
    } else if (imageAlignment === "left") {
      style = {
        ...style,
        marginRight: {
          ...style.marginRight,
          unit: "auto",
        },
      };
    } else if (imageAlignment === "right") {
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

  const getBackgroundImageUrl = (url) => {
    return url.substring(5, url.lastIndexOf("'"));
  };

  return (
    <div
      className="image-component"
      onClick={props.onClick}
      style={generateStyle(editStyle(props.style, props.imageAlignment))}
    >
      <img
        src={getBackgroundImageUrl(props.style.backgroundImage)}
        style={{ visibility: "hidden" }}
        alt=""
      />
    </div>
  );
};

export default Image;
