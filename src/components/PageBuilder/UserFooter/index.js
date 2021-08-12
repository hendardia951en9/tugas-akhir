import React, { useContext } from "react";
import { PageBuilderContext } from "../../Pages/WebGenerator";
import { generateStyle } from "../../../utils/generateStyle";

const UserFooter = ({ componentKey, isEdit, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <div
      onClick={
        isEdit
          ? (e) => {
              pageBuilderContext.handleClickPageBuilderComponent(
                itemTypes,
                componentKey
              );
            }
          : undefined
      }
      style={generateStyle(props.style)}
    >
      footer
    </div>
  );
};

export default UserFooter;
