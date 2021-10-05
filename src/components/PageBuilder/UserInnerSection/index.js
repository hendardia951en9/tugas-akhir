import React from "react";
import { generateStyle } from "../../../utils/generateStyle";
import Layout from "./layout";

const UserInnerSection = ({ props }) => {
  return (
    <div
      className={`inner-section-component 
      ${props.style.position === "absolute" ? "isAbsolute" : ""}`}
      style={generateStyle(props.style)}
    >
      {props.children.length > 0
        ? props.children.map((child) => {
            return (
              <Layout
                key={child.key}
                props={child.props}
                style={generateStyle(child.props.style)}
              />
            );
          })
        : props.text}
    </div>
  );
};

export default UserInnerSection;
