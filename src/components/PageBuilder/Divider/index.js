import React, { useContext } from "react";
import { generateStyle } from "../../../utils/generateStyle";
import { PageBuilderContext } from "../../Pages/Pricing";

//css
import "./divider.css";

const Divider = ({ componentKey, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <div
      className="divider-component"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          pageBuilderContext.handleClick(itemTypes, componentKey);
        }
      }}
    >
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
