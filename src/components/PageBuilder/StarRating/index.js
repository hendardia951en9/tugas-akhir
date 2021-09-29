import React, { useContext } from "react";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateStyle } from "../../../utils/generateStyle";
import { PageBuilderContext } from "../../Pages/WebGenerator";

//css
import "./starrating.css";

const StarRating = ({ componentKey, isEdit, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  const generateStarRating = (starRatingCap, starRatingValue) => {
    let element = [];

    for (let j = 0; j < starRatingValue.split(".")[0]; j++) {
      element.push(<FontAwesomeIcon key={element.length} icon={fasStar} />);
    }
    if (starRatingValue.split(".").length > 1) {
      element.push(
        <FontAwesomeIcon key={element.length} icon={faStarHalfAlt} />
      );
      for (let k = 0; k < starRatingCap - starRatingValue - 1; k++) {
        element.push(<FontAwesomeIcon key={element.length} icon={farStar} />);
      }
    } else {
      for (let k = 0; k < starRatingCap - starRatingValue; k++) {
        element.push(<FontAwesomeIcon key={element.length} icon={farStar} />);
      }
    }

    return element;
  };

  return (
    <div
      className={`star-rating-component ${isEdit && "isEdit"}
      ${props.style.position === "absolute" ? "isAbsolute" : ""}`}
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
      {generateStarRating(props.starRatingCap, props.starRatingValue)}
    </div>
  );
};

export default StarRating;
