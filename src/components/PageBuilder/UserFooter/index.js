import React, { useContext } from "react";
import { generateStyle } from "../../../utils/generateStyle";
import { PageBuilderContext } from "../../Pages/WebGenerator";

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
