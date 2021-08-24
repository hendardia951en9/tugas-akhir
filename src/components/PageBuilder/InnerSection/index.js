import React, { useContext } from "react";
import { generateStyle } from "../../../utils/generateStyle";
import Layout from "./layout";
import { PageBuilderContext } from "../../Pages/WebGenerator";

//css
import "./innersection.css";

const InnerSection = ({ componentKey, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <div
      className="inner-section-container"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          pageBuilderContext.handleClickPageBuilderComponent(
            itemTypes,
            componentKey
          );
        }
      }}
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
