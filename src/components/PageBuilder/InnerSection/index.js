import React, { useContext } from "react";
import { generatePosition } from "../../../utils/generatePosition";
import { generateStyle } from "../../../utils/generateStyle";
import Layout from "./layout";
import { PageBuilderContext } from "../../Pages/WebGenerator";

//css
import "./innersection.css";

const InnerSection = ({ componentKey, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <div
      className={`inner-section-component-container 
      ${props.style.position === "absolute" ? "isAbsolute" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          pageBuilderContext.handleClickPageBuilderComponent(
            itemTypes,
            componentKey
          );
        }
      }}
      style={
        props.style.position === "absolute" ? generatePosition(props.style) : {}
      }
    >
      <div
        className="inner-section-component"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            pageBuilderContext.handleClickPageBuilderComponent(
              itemTypes,
              componentKey
            );
          }
        }}
        style={generateStyle(props.style)}
      >
        {props.children.length > 0
          ? props.children.map((child) => {
              return (
                <Layout
                  key={child.key}
                  id={child.key}
                  componentKey={child.key}
                  itemTypes={child.itemTypes}
                  props={child.props}
                  style={generateStyle(child.props.style)}
                />
              );
            })
          : props.text}
      </div>
    </div>
  );
};

export default InnerSection;
