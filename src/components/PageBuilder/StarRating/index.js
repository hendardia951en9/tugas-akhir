import React from "react";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateStyle } from "../../../utils/generateStyle";

//css
import "./starrating.css";

const StarRating = ({ props }) => {
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
      className="star-rating-container"
      onClick={props.onClick}
      style={generateStyle(props.style)}
    >
      {generateStarRating(props.starRatingCap, props.starRatingValue)}
    </div>
  );
};

export default StarRating;
