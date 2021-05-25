import React from "react";
import { generateStyle } from "../../../utils/generateStyle";

//css
import "./divider.css";

const Divider = ({ props }) => {
  return (
    <div className="divider-component" onClick={props.onClick}>
      <div
        className="divider-component-text-container"
        style={generateStyle(props.dividerTextContainerStyle)}
      >
        <span
          className="divider-component-text"
          style={generateStyle(props.dividerTextStyle)}
        >
          {props.dividerText}
        </span>
      </div>
      <hr style={generateStyle(props.dividerStyle)} />
    </div>
  );
};

export default Divider;
