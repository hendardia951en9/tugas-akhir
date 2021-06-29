import React, { useContext } from "react";
import { generateStyle } from "../../../utils/generateStyle";
import { IconPickerItem } from "react-fa-icon-picker";
import { PageBuilderContext } from "../../Pages/WebGenerator";

//css
import "./icon.css";

const Icon = ({ componentKey, isEdit, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <div
      className="icon-component"
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
      {isEdit ? (
        <IconPickerItem
          containerStyles={Object.assign(generateStyle(props.style), {
            alignItems: "center",
            display: "flex",
          })}
          icon={props.icon}
        />
      ) : (
        <a href={props.linkTo}>
          <IconPickerItem
            containerStyles={Object.assign(generateStyle(props.style), {
              alignItems: "center",
              display: "flex",
            })}
            icon={props.icon}
          />
        </a>
      )}
    </div>
  );
};

export default Icon;
