import React from "react";
import { generateStyle } from "../../../utils/generateStyle";
import Layout from "../InnerSection/layout";

//css
import "./innersection.css";

const InnerSection = ({ props }) => {
  return (
    <>
      <div
        className="inner-section-component"
        onClick={props.onClick}
        style={generateStyle(props.style)}
      >
        {props.children.length > 0
          ? props.children.map((child) => {
              return (
                <Layout
                  key={child.key}
                  id={child.key}
                  props={child.props}
                  style={generateStyle(child.props.style)}
                />
              );
            })
          : props.text}
      </div>
    </>
  );
};

export default InnerSection;
