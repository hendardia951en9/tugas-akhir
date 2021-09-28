import React, { useContext } from "react";
import { generateStyle } from "../../../utils/generateStyle";
import { PageBuilderContext } from "../../Pages/WebGenerator";

//css
import "./divider.css";

const Divider = ({ componentKey, isEdit, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <div
      className="divider-component"
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
    >
      <div
        className="divider-component-text-container"
        style={Object.assign(generateStyle(props.dividerTextContainerStyle), {
          zIndex: props.dividerStyle.zIndex + 1,
        })}
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
