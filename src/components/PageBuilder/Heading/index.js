import React from "react";
import { generateStyle } from "../../../utils/generateStyle";

//css
import "./heading.css";

const Heading = ({ props }) => {
  return (
    <h1
      className="heading-component"
      onClick={props.onClick}
      style={generateStyle(props.style)}
    >
      {props.text}
    </h1>
  );
};

export default Heading;
