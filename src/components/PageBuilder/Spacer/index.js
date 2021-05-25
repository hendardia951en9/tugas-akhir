import React from "react";
import { generateStyle } from "../../../utils/generateStyle";

//css
import "./spacer.css";

const Spacer = ({ props }) => {
  return (
    <div
      className="spacer-component"
      onClick={props.onClick}
      style={generateStyle(props.style)}
    ></div>
  );
};

export default Spacer;
