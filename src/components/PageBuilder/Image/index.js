import React, { useContext } from "react";
import { checkLinkTo } from "../../../utils/checkLinkTo";
import { generatePosition } from "../../../utils/generatePosition";
import { generateStyle } from "../../../utils/generateStyle";
import { NavLink } from "react-router-dom";
import { PageBuilderContext } from "../../Pages/WebGenerator";

//css
import "./image.css";

const Image = ({ componentKey, isEdit, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

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
      className={`image-component-container 
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
      <div
        className="image-component"
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
        style={generateStyle(editStyle(props.style, props.imageAlignment))}
      >
        {isEdit || props.linkTo === "" ? (
          <img
            src={getBackgroundImageUrl(props.style.backgroundImage)}
            style={{ visibility: "hidden" }}
            alt=""
          />
        ) : checkLinkTo(props.linkTo) === true ? (
          <NavLink exact to={props.linkTo}>
            <img
              src={getBackgroundImageUrl(props.style.backgroundImage)}
              style={{ visibility: "hidden" }}
              alt=""
            />
          </NavLink>
        ) : (
          <a href={props.linkTo}>
            <img
              src={getBackgroundImageUrl(props.style.backgroundImage)}
              style={{ visibility: "hidden" }}
              alt=""
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default Image;
