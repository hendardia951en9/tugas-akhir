import React, { useContext } from "react";
import { generateStyle } from "../../../utils/generateStyle";
import { PageBuilderContext } from "../../Pages/WebGenerator";

//css
import "./spacer.css";

const Spacer = ({ componentKey, isEdit, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <div
      className="spacer-component"
      onClick={
        isEdit
          ? (e) => {
              if (e.target === e.currentTarget) {
                pageBuilderContext.handleClickPageBuilderComponent(
                  itemTypes,
                  componentKey
                );
              }
            }
          : undefined
      }
      style={generateStyle(props.style)}
    ></div>
  );
};

export default Spacer;
