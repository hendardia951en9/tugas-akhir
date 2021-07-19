import React, { useContext } from "react";
import { ItemTypes } from "../../utils/ItemTypes";
import { PageBuilderContext } from "../Pages/WebGenerator";

import "./domtreeelement.css";

const DOMTreeElement = ({ componentKey, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          pageBuilderContext.handleClickPageBuilderComponent(
            itemTypes,
            componentKey
          );
        }
      }}
    >
      {itemTypes}
      {itemTypes === ItemTypes.INNERSECTION
        ? props.children.length > 0
          ? props.children.map((innersectionlayout) => {
              return (
                <div
                  style={{ marginLeft: "1rem" }}
                  key={innersectionlayout.key}
                  onClick={(e) => {
                    if (e.target === e.currentTarget) {
                      pageBuilderContext.handleClickPageBuilderComponent(
                        innersectionlayout.itemTypes,
                        innersectionlayout.key
                      );
                    }
                  }}
                >
                  {innersectionlayout.itemTypes}
                  {innersectionlayout.props.children.length > 0
                    ? innersectionlayout.props.children.map((child) => {
                        return (
                          <div
                            style={{ marginLeft: "2rem" }}
                            key={child.key}
                            onClick={(e) => {
                              if (e.target === e.currentTarget) {
                                pageBuilderContext.handleClickPageBuilderComponent(
                                  child.itemTypes,
                                  child.key
                                );
                              }
                            }}
                          >
                            {child.itemTypes}
                          </div>
                        );
                      })
                    : ""}
                </div>
              );
            })
          : props.text
        : ""}
    </div>
  );
};

export default DOMTreeElement;
