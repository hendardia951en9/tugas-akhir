import React, { useEffect, useState } from "react";
import { ComponentDefaultProps } from "../../../utils/ComponentDefaultProps";
import { ComponentEditableProps } from "../../../utils/ComponentEditableProps";
import { faThList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ItemTypes } from "../../../utils/ItemTypes";
import { PropsTypes } from "../../../utils/PropsTypes";

//import page builder components
import Board from "../../PageBuilder/Board";
import EditComponent from "../../PageBuilder/EditComponent";
import Heading from "../../PageBuilder/Heading";
import HeadingWidget from "../../PageBuilder/Heading/widget";
import Image from "../../PageBuilder/Image";
import ImageWidget from "../../PageBuilder/Image/widget";
import InnerSection from "../../PageBuilder/InnerSection";
import InnerSectionWidget from "../../PageBuilder/InnerSection/widget";
import TextEditor from "../../PageBuilder/TextEditor";
import TextEditorWidget from "../../PageBuilder/TextEditor/widget";

//css
import "./pricing.css";

export const PageBuilderContext = React.createContext();

const boardState = {
  boardComponents: [],
  boardComponentsKey: -1,
  getComponentData: false,
  selectedComponentKey: null,
};

const Pricing = () => {
  const [editComponent, setEditComponent] = useState({
    isEdit: false,
    selectedComponentItemTypes: null,
  });
  const [isRenderBoard, setIsRenderBoard] = useState(false);

  const addComponentToBoard = (itemTypes) => {
    boardState.boardComponentsKey += 1;
    addItems(
      boardState.boardComponents,
      itemTypes,
      boardState.boardComponentsKey
    );
  };

  const addComponentToInnerSectionLayout = (itemTypes, id) => {
    boardState.boardComponentsKey += 1;
    const component = findComponent(boardState.boardComponents, id);
    addItems(
      component.props.children,
      itemTypes,
      boardState.boardComponentsKey
    );
  };

  const addItems = (arr, itemTypes, key) => {
    if (itemTypes === ItemTypes.HEADING) {
      arr.push({
        itemTypes: ItemTypes.HEADING,
        key: key,
        props: {
          onClick: (e) => {
            if (e.target === e.currentTarget) {
              handleClick(ItemTypes.HEADING, key);
            }
          },
          style: ComponentDefaultProps.HEADING.style,
          text: ComponentDefaultProps.HEADING.text,
        },
      });
    } else if (itemTypes === ItemTypes.IMAGE) {
      arr.push({
        itemTypes: ItemTypes.IMAGE,
        key: key,
        props: {
          onClick: (e) => {
            if (e.target === e.currentTarget) {
              handleClick(ItemTypes.IMAGE, key);
            }
          },
          imageAlignment: ComponentDefaultProps.IMAGE.imageAlignment,
          linkTo: ComponentDefaultProps.IMAGE.linkTo,
          style: ComponentDefaultProps.IMAGE.style,
        },
      });
    } else if (itemTypes === ItemTypes.INNERSECTION) {
      boardState.boardComponentsKey += 2;
      arr.push({
        itemTypes: ItemTypes.INNERSECTION,
        key: key,
        props: {
          children: [
            {
              itemTypes: ItemTypes.INNERSECTION_LAYOUT,
              key: key + 1,
              props: {
                children: [],
                onClick: (e) => {
                  if (e.target === e.currentTarget) {
                    handleClick(ItemTypes.INNERSECTION_LAYOUT, key + 1);
                  }
                },
                style: ComponentDefaultProps.INNERSECTION_LAYOUT.style,
                text: ComponentDefaultProps.INNERSECTION_LAYOUT.text,
              },
            },
            {
              itemTypes: ItemTypes.INNERSECTION_LAYOUT,
              key: key + 2,
              props: {
                children: [],
                onClick: (e) => {
                  if (e.target === e.currentTarget) {
                    handleClick(ItemTypes.INNERSECTION_LAYOUT, key + 2);
                  }
                },
                style: ComponentDefaultProps.INNERSECTION_LAYOUT.style,
                text: ComponentDefaultProps.INNERSECTION_LAYOUT.text,
              },
            },
          ],
          onClick: (e) => {
            if (e.target === e.currentTarget) {
              handleClick(ItemTypes.INNERSECTION, key);
            }
          },
          style: ComponentDefaultProps.INNERSECTION.style,
          text: ComponentDefaultProps.INNERSECTION.text,
        },
      });
    } else if (itemTypes === ItemTypes.INNERSECTION_LAYOUT) {
      arr.push({
        itemTypes: ItemTypes.INNERSECTION_LAYOUT,
        key: key,
        props: {
          children: [],
          onClick: (e) => {
            if (e.target === e.currentTarget) {
              handleClick(ItemTypes.INNERSECTION_LAYOUT, key);
            }
          },
          style: ComponentDefaultProps.INNERSECTION_LAYOUT.style,
          text: ComponentDefaultProps.INNERSECTION_LAYOUT.text,
        },
      });
    } else if (itemTypes === ItemTypes.TEXT_EDITOR) {
      arr.push({
        itemTypes: ItemTypes.TEXT_EDITOR,
        key: key,
        props: {
          onClick: (e) => {
            handleClick(ItemTypes.TEXT_EDITOR, key);
          },
          style: ComponentDefaultProps.TEXT_EDITOR.style,
          text: ComponentDefaultProps.TEXT_EDITOR.text,
          textEditorValue: ComponentDefaultProps.TEXT_EDITOR.textEditorValue,
        },
      });
    }
  };

  const changeComponentProps = (component, propsTypes, target, value) => {
    if (propsTypes === PropsTypes.ALIGN_ITEMS) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            alignItems: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.BACKGROUND_COLOR) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            backgroundColor: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.BACKGROUND_IMAGE) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            backgroundImage: `url('${value}')`,
          },
        },
      };
    } else if (propsTypes === PropsTypes.BACKGROUND_POSITION) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            backgroundPosition: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.BACKGROUND_REPEAT) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            backgroundRepeat: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.BACKGROUND_SIZE) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            backgroundSize: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.BORDER_BOTTOM_LEFT_RADIUS) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            borderBottomLeftRadius: {
              ...component.props.style.borderBottomLeftRadius,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.BORDER_BOTTOM_RIGHT_RADIUS) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            borderBottomRightRadius: {
              ...component.props.style.borderBottomRightRadius,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.BORDER_BOTTOM_WIDTH) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            borderBottomWidth: {
              ...component.props.style.borderBottomWidth,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.BORDER_LEFT_WIDTH) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            borderLeftWidth: {
              ...component.props.style.borderLeftWidth,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.BORDER_RIGHT_WIDTH) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            borderRightWidth: {
              ...component.props.style.borderRightWidth,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.BORDER_STYLE) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            borderStyle: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.BORDER_TOP_LEFT_RADIUS) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            borderTopLeftRadius: {
              ...component.props.style.borderTopLeftRadius,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.BORDER_TOP_RIGHT_RADIUS) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            borderTopRightRadius: {
              ...component.props.style.borderTopRightRadius,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.BORDER_TOP_WIDTH) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            borderTopWidth: {
              ...component.props.style.borderTopWidth,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.BOX_SHADOW_BLUR) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            boxShadowProps: {
              ...component.props.style.boxShadowProps,
              boxShadowBlur: {
                ...component.props.style.boxShadowProps.boxShadowBlur,
                [target]: value,
              },
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.BOX_SHADOW_INSET) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            boxShadowProps: {
              ...component.props.style.boxShadowProps,
              boxShadowInset: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.BOX_SHADOW_SPREAD) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            boxShadowProps: {
              ...component.props.style.boxShadowProps,
              boxShadowSpread: {
                ...component.props.style.boxShadowProps.boxShadowSpread,
                [target]: value,
              },
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.BOX_SHADOW_X) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            boxShadowProps: {
              ...component.props.style.boxShadowProps,
              boxShadowX: {
                ...component.props.style.boxShadowProps.boxShadowX,
                [target]: value,
              },
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.BOX_SHADOW_Y) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            boxShadowProps: {
              ...component.props.style.boxShadowProps,
              boxShadowY: {
                ...component.props.style.boxShadowProps.boxShadowY,
                [target]: value,
              },
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.COLOR) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            color: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.FONT_SIZE) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            fontSize: {
              ...component.props.style.fontSize,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.FONT_WEIGHT) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            fontWeight: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.GAP) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            gap: {
              ...component.props.style.gap,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.HEIGHT) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            height: {
              ...component.props.style.height,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.IMAGE_ALIGNMENT) {
      component = {
        ...component,
        props: {
          ...component.props,
          imageAlignment: value,
        },
      };
    } else if (propsTypes === PropsTypes.INNER_SECTION_LAYOUT) {
      if (value > component.props.children.length) {
        boardState.boardComponentsKey += 1;
        const key = boardState.boardComponentsKey;

        component.props.children.push({
          itemTypes: ItemTypes.INNERSECTION_LAYOUT,
          key: key,
          props: {
            children: [],
            onClick: (e) => {
              if (e.target === e.currentTarget) {
                handleClick(ItemTypes.INNERSECTION_LAYOUT, key);
              }
            },
            style: ComponentDefaultProps.INNERSECTION_LAYOUT.style,
            text: ComponentDefaultProps.INNERSECTION_LAYOUT.text,
          },
        });
      }
    } else if (propsTypes === PropsTypes.JUSTIFY_CONTENT) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            justifyContent: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.LETTER_SPACING) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            letterSpacing: {
              ...component.props.style.letterSpacing,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.LINE_HEIGHT) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            lineHeight: {
              ...component.props.style.lineHeight,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.LINK_TO) {
      component = {
        ...component,
        props: {
          ...component.props,
          linkTo: value,
        },
      };
    } else if (propsTypes === PropsTypes.MARGIN_BOTTOM) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            marginBottom: {
              ...component.props.style.marginBottom,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.MARGIN_LEFT) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            marginLeft: {
              ...component.props.style.marginLeft,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.MARGIN_RIGHT) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            marginRight: {
              ...component.props.style.marginRight,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.MARGIN_TOP) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            marginTop: {
              ...component.props.style.marginTop,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.MAX_WIDTH) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            maxWidth: {
              ...component.props.style.maxWidth,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.MIN_HEIGHT) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            minHeight: {
              ...component.props.style.minHeight,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.OPACITY) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            opacity: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.OVERFLOW) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            overflow: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.PADDING_BOTTOM) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            paddingBottom: {
              ...component.props.style.paddingBottom,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.PADDING_LEFT) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            paddingLeft: {
              ...component.props.style.paddingLeft,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.PADDING_RIGHT) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            paddingRight: {
              ...component.props.style.paddingRight,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.PADDING_TOP) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            paddingTop: {
              ...component.props.style.paddingTop,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.TEXT) {
      component = {
        ...component,
        props: {
          ...component.props,
          text: value,
        },
      };
    } else if (propsTypes === PropsTypes.TEXT_ALIGN) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            textAlign: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.TEXT_DECORATION) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            textDecoration: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.TEXT_EDITOR_VALUE) {
      component = {
        ...component,
        props: {
          ...component.props,
          textEditorValue: value,
        },
      };
    } else if (propsTypes === PropsTypes.TEXT_TRANSFORM) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            textTransform: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.WIDTH) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            width: {
              ...component.props.style.width,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.ZINDEX) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            zIndex: value,
          },
        },
      };
    }

    return component;
  };

  const editComponentProps = (propsTypes, target, value) => {
    let result = false;

    //cari di boardcomponent
    boardState.boardComponents.forEach((component, index) => {
      if (component.key === boardState.selectedComponentKey) {
        result = true;
        boardState.boardComponents[index] = {
          ...changeComponentProps(component, propsTypes, target, value),
        };
      }
    });

    //cari di innersection
    if (!result) {
      boardState.boardComponents.forEach((component, index) => {
        if (!result) {
          if (component.itemTypes === ItemTypes.INNERSECTION) {
            component.props.children.forEach((child, index2) => {
              if (!result) {
                if (child.key === boardState.selectedComponentKey) {
                  result = true;
                  boardState.boardComponents[index].props.children[index2] = {
                    ...changeComponentProps(child, propsTypes, target, value),
                  };
                }
              }
            });
          }
        }
      });
    }

    //cari di innersectionlayout
    if (!result) {
      boardState.boardComponents.forEach((component, index) => {
        if (!result) {
          if (component.itemTypes === ItemTypes.INNERSECTION) {
            component.props.children.forEach((child, index2) => {
              if (!result) {
                if (child.props.children.length > 0) {
                  child.props.children.forEach((child2, index3) => {
                    if (!result) {
                      if (child2.key === boardState.selectedComponentKey) {
                        result = true;
                        boardState.boardComponents[index].props.children[
                          index2
                        ].props.children[index3] = {
                          ...changeComponentProps(
                            child2,
                            propsTypes,
                            target,
                            value
                          ),
                        };
                      }
                    }
                  });
                }
              }
            });
          }
        }
      });
    }

    //3ger rerender
    setIsRenderBoard(!isRenderBoard);
  };

  const findComponent = (arr, id) => {
    //cari di boardcomponent
    let result = arr.find((props) => {
      return props.key === id;
    });

    if (result) {
      return result;
    } else {
      //cari di innersection
      arr.forEach((element) => {
        if (result) {
          return result;
        } else {
          if (element.itemTypes === ItemTypes.INNERSECTION) {
            result = element.props.children.find((child) => {
              return child.key === id;
            });
          }
        }
      });

      if (result) {
        return result;
      } else {
        //cari di innersectionlayout
        arr.forEach((element) => {
          if (result) {
            return result;
          } else {
            if (element.itemTypes === ItemTypes.INNERSECTION) {
              element.props.children.forEach((element2) => {
                if (result) {
                  return result;
                } else {
                  if (element2.props.children.length > 0) {
                    result = element2.props.children.find((child) => {
                      return child.key === id;
                    });
                  }
                }
              });
            }
          }
        });

        if (result) {
          return result;
        } else {
          return null;
        }
      }
    }
  };

  const handleClick = (itemTypes, key) => {
    if (itemTypes === ItemTypes.COMPONENT_LIST_BUTTON) {
      setEditComponent({
        isEdit: false,
      });
    } else if (itemTypes === ItemTypes.HEADING) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isEdit: true,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.IMAGE) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isEdit: true,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.INNERSECTION) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isEdit: true,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.INNERSECTION_LAYOUT) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isEdit: true,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.TEXT_EDITOR) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isEdit: true,
        selectedComponentItemTypes: itemTypes,
      });
    }
  };

  const handlePublish = () => {};

  const renderComponent = (component) => {
    if (component.itemTypes === ItemTypes.HEADING) {
      return <Heading key={component.key} props={component.props} />;
    } else if (component.itemTypes === ItemTypes.INNERSECTION) {
      return <InnerSection key={component.key} props={component.props} />;
    } else if (component.itemTypes === ItemTypes.IMAGE) {
      return <Image key={component.key} props={component.props} />;
    } else if (component.itemTypes === ItemTypes.TEXT_EDITOR) {
      return <TextEditor key={component.key} props={component.props} />;
    }
  };

  const renderEditComponent = (selectedComponentKey) => {
    const component = findComponent(
      boardState.boardComponents,
      selectedComponentKey
    );
    const itemTypes = component.itemTypes;

    if (itemTypes === ItemTypes.HEADING) {
      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.HEADING,
            componentProps: component.props,
          }}
        />
      );
    } else if (itemTypes === ItemTypes.IMAGE) {
      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.IMAGE,
            componentProps: component.props,
          }}
        />
      );
    } else if (itemTypes === ItemTypes.INNERSECTION) {
      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.INNERSECTION,
            componentProps: component.props,
          }}
        />
      );
    } else if (itemTypes === ItemTypes.INNERSECTION_LAYOUT) {
      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.INNERSECTION_LAYOUT,
            componentProps: component.props,
          }}
        />
      );
    } else if (itemTypes === ItemTypes.TEXT_EDITOR) {
      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.TEXT_EDITOR,
            componentProps: component.props,
          }}
        />
      );
    }
  };

  useEffect(() => {
    document.title = "Pricing";

    return () => {
      boardState.boardComponents = [];
      boardState.boardComponentsKey = -1;
      boardState.getComponentData = false;
      boardState.selectedComponentKey = null;
    };
  }, []);

  console.log("render pricing");

  return (
    <>
      <PageBuilderContext.Provider
        value={{
          boardState,
          addComponentToBoard,
          addComponentToInnerSectionLayout,
          editComponentProps,
          renderComponent,
        }}
      >
        <div className="navbar-margin">
          <div className="page-builder-container">
            <div className="sidebar">
              <div className="sidebar-header">
                {editComponent.isEdit
                  ? "Edit " + editComponent.selectedComponentItemTypes
                  : "Components"}
                <button
                  className="components-button"
                  onClick={() =>
                    handleClick(ItemTypes.COMPONENT_LIST_BUTTON, null)
                  }
                >
                  <FontAwesomeIcon icon={faThList} />
                </button>
              </div>
              <div className="sidebar-container">
                {editComponent.isEdit ? (
                  renderEditComponent(boardState.selectedComponentKey)
                ) : (
                  <>
                    <div className="widgets">
                      <HeadingWidget />
                      <InnerSectionWidget />
                      <ImageWidget />
                      <TextEditorWidget />
                    </div>
                  </>
                )}
              </div>
              <div className="sidebar-footer">
                <button onClick={handlePublish}>Publish</button>
              </div>
            </div>
            <div className="board-container">
              <Board />
            </div>
          </div>
        </div>
      </PageBuilderContext.Provider>
    </>
  );
};

export default Pricing;
