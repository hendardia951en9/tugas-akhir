import React, { useContext } from "react";
import { generateStyle } from "../../../utils/generateStyle";
import { PageBuilderContext } from "../../Pages/Pricing";

//css
import "./heading.css";

const Heading = ({ componentKey, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <h1
      className="heading-component"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          pageBuilderContext.handleClick(itemTypes, componentKey);
        }
      }}
      style={generateStyle(props.style)}
    >
      {props.text}
    </h1>
  );
};

export default Heading;
