import React, { useContext } from "react";
import { ItemTypes } from "../../utils/ItemTypes";
import { PageBuilderContext } from "../Pages/WebGenerator";

import "./domtreeelement.css";

const DOMTreeElement = ({ componentKey, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <div className="dom-tree-element-container">
      <div
        className="dom-tree-element"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            pageBuilderContext.handleClickPageBuilderComponent(
              itemTypes,
              componentKey
            );
          }
        }}
      >
        <div className="dom-tree-element-button-wrapper">
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
        </div>
        <span>{itemTypes}</span>
      </div>
      {itemTypes === ItemTypes.INNERSECTION
        ? props.children.length > 0
          ? props.children.map((innersectionlayout) => {
              return (
                <div
                  className="dom-tree-element"
                  key={innersectionlayout.key}
                  onClick={(e) => {
                    if (e.target === e.currentTarget) {
                      pageBuilderContext.handleClickPageBuilderComponent(
                        innersectionlayout.itemTypes,
                        innersectionlayout.key
                      );
                    }
                  }}
                  style={{ marginLeft: "1rem" }}
                >
                  <div className="dom-tree-element-button-wrapper">
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
                  </div>
                  <span>{innersectionlayout.itemTypes}</span>
                  {innersectionlayout.props.children.length > 0
                    ? innersectionlayout.props.children.map((child) => {
                        return (
                          <div
                            className="dom-tree-element"
                            key={child.key}
                            onClick={(e) => {
                              if (e.target === e.currentTarget) {
                                pageBuilderContext.handleClickPageBuilderComponent(
                                  child.itemTypes,
                                  child.key
                                );
                              }
                            }}
                            style={{ marginLeft: "2rem" }}
                          >
                            <div className="dom-tree-element-button-wrapper">
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
                            </div>
                            <span>{child.itemTypes}</span>
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
