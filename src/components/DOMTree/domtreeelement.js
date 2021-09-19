import React, { useContext } from "react";
import ButtonRipple from "../ButtonRipple";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ItemTypes } from "../../utils/ItemTypes";
import { PageBuilderContext } from "../Pages/WebGenerator";

const DOMTreeElement = ({ componentKey, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <>
      <div
        className="dom-tree-element"
        key={componentKey}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            pageBuilderContext.handleClickPageBuilderComponent(
              itemTypes,
              componentKey
            );
          }
        }}
      >
        <div className="dom-tree-element-button-container">
          <ButtonRipple
            className="dom-tree-element-button-container-button"
            fa={<FontAwesomeIcon icon={faArrowAltCircleUp} />}
            onClick={() =>
              pageBuilderContext.reorderComponent(componentKey, "UP")
            }
          />
          <ButtonRipple
            className="dom-tree-element-button-container-button"
            fa={<FontAwesomeIcon icon={faArrowAltCircleDown} />}
            onClick={() =>
              pageBuilderContext.reorderComponent(componentKey, "DOWN")
            }
          />
        </div>
        <span>{itemTypes}</span>
      </div>
      {itemTypes === ItemTypes.INNERSECTION
        ? props.children.length > 0
          ? props.children.map((innersectionlayout) => {
              return (
                <React.Fragment key={innersectionlayout.key}>
                  <div
                    className="dom-tree-element innersection-child"
                    onClick={(e) => {
                      if (e.target === e.currentTarget) {
                        pageBuilderContext.handleClickPageBuilderComponent(
                          innersectionlayout.itemTypes,
                          innersectionlayout.key
                        );
                      }
                    }}
                  >
                    <div className="dom-tree-element-button-container">
                      <ButtonRipple
                        className="dom-tree-element-button-container-button"
                        fa={<FontAwesomeIcon icon={faArrowAltCircleUp} />}
                        onClick={() =>
                          pageBuilderContext.reorderComponent(
                            innersectionlayout.key,
                            "UP"
                          )
                        }
                      />
                      <ButtonRipple
                        className="dom-tree-element-button-container-button"
                        fa={<FontAwesomeIcon icon={faArrowAltCircleDown} />}
                        onClick={() =>
                          pageBuilderContext.reorderComponent(
                            innersectionlayout.key,
                            "DOWN"
                          )
                        }
                      />
                    </div>
                    <span>{innersectionlayout.itemTypes}</span>
                  </div>
                  {innersectionlayout.props.children.length > 0
                    ? innersectionlayout.props.children.map((child) => {
                        return (
                          <div
                            className="dom-tree-element innersection-layout-child"
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
                            <div className="dom-tree-element-button-container">
                              <ButtonRipple
                                className="dom-tree-element-button-container-button"
                                fa={
                                  <FontAwesomeIcon icon={faArrowAltCircleUp} />
                                }
                                onClick={() =>
                                  pageBuilderContext.reorderComponent(
                                    child.key,
                                    "UP"
                                  )
                                }
                              />
                              <ButtonRipple
                                className="dom-tree-element-button-container-button"
                                fa={
                                  <FontAwesomeIcon
                                    icon={faArrowAltCircleDown}
                                  />
                                }
                                onClick={() =>
                                  pageBuilderContext.reorderComponent(
                                    child.key,
                                    "DOWN"
                                  )
                                }
                              />
                            </div>
                            <span>{child.itemTypes}</span>
                          </div>
                        );
                      })
                    : ""}
                </React.Fragment>
              );
            })
          : props.text
        : ""}
    </>
  );
};

export default DOMTreeElement;
