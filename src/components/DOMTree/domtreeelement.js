import React, { useContext } from "react";
import { ItemTypes } from "../../utils/ItemTypes";
import { PageBuilderContext } from "../Pages/WebGenerator";

import "./domtreeelement.css";

const DOMTreeElement = ({ componentKey, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <div
      className="dom-tree-element-container"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          pageBuilderContext.handleClickPageBuilderComponent(
            itemTypes,
            componentKey
          );
        }
      }}
    >
      <div className="dom-tree-element">
        <button
          onClick={() =>
            pageBuilderContext.reorderComponent(componentKey, "UP")
          }
        >
          up
        </button>
        <button
          onClick={() =>
            pageBuilderContext.reorderComponent(componentKey, "DOWN")
          }
        >
          down
        </button>
        <div>{itemTypes}</div>
      </div>
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
                  <div className="dom-tree-element">
                    <button
                      onClick={() =>
                        pageBuilderContext.reorderComponent(
                          innersectionlayout.key,
                          "UP"
                        )
                      }
                    >
                      up
                    </button>
                    <button
                      onClick={() =>
                        pageBuilderContext.reorderComponent(
                          innersectionlayout.key,
                          "DOWN"
                        )
                      }
                    >
                      down
                    </button>
                    <div>{innersectionlayout.itemTypes}</div>
                  </div>
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
                            <div className="dom-tree-element">
                              <button
                                onClick={() =>
                                  pageBuilderContext.reorderComponent(
                                    child.key,
                                    "UP"
                                  )
                                }
                              >
                                up
                              </button>
                              <button
                                onClick={() =>
                                  pageBuilderContext.reorderComponent(
                                    child.key,
                                    "DOWN"
                                  )
                                }
                              >
                                down
                              </button>
                              <div>{child.itemTypes}</div>
                            </div>
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
