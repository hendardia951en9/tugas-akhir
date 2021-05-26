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
import Button from "../../PageBuilder/Button";
import ButtonWidget from "../../PageBuilder/Button/widget";
import Divider from "../../PageBuilder/Divider";
import DividerWidget from "../../PageBuilder/Divider/widget";
import Heading from "../../PageBuilder/Heading";
import HeadingWidget from "../../PageBuilder/Heading/widget";
import Icon from "../../PageBuilder/Icon";
import IconWidget from "../../PageBuilder/Icon/widget";
import Image from "../../PageBuilder/Image";
import ImageWidget from "../../PageBuilder/Image/widget";
import InnerSection from "../../PageBuilder/InnerSection";
import InnerSectionWidget from "../../PageBuilder/InnerSection/widget";
import MapComponent from "../../PageBuilder/MapComponent";
import MapComponentWidget from "../../PageBuilder/MapComponent/widget";
import Spacer from "../../PageBuilder/Spacer";
import SpacerWidget from "../../PageBuilder/Spacer/widget";
import StarRating from "../../PageBuilder/StarRating";
import StarRatingWidget from "../../PageBuilder/StarRating/widget";
import TextEditor from "../../PageBuilder/TextEditor";
import TextEditorWidget from "../../PageBuilder/TextEditor/widget";
import Video from "../../PageBuilder/Video";
import VideoWidget from "../../PageBuilder/Video/widget";

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
  const [mapState, setMapState] = useState({
    latitude: ComponentDefaultProps.MAP_COMPONENT.latitude,
    longitude: ComponentDefaultProps.MAP_COMPONENT.longitude,
  });

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
    if (itemTypes === ItemTypes.BUTTON) {
      arr.push({
        itemTypes: ItemTypes.BUTTON,
        key: key,
        props: {
          buttonAlignment: ComponentDefaultProps.BUTTON.buttonAlignment,
          linkTo: ComponentDefaultProps.BUTTON.linkTo,
          style: ComponentDefaultProps.BUTTON.style,
          text: ComponentDefaultProps.BUTTON.text,
        },
      });
    } else if (itemTypes === ItemTypes.DIVIDER) {
      arr.push({
        itemTypes: ItemTypes.DIVIDER,
        key: key,
        props: {
          dividerStyle: ComponentDefaultProps.DIVIDER.dividerStyle,
          dividerText: ComponentDefaultProps.DIVIDER.dividerText,
          dividerTextContainerStyle:
            ComponentDefaultProps.DIVIDER.dividerTextContainerStyle,
          dividerTextStyle: ComponentDefaultProps.DIVIDER.dividerTextStyle,
          text: ComponentDefaultProps.DIVIDER.text,
        },
      });
    } else if (itemTypes === ItemTypes.HEADING) {
      arr.push({
        itemTypes: ItemTypes.HEADING,
        key: key,
        props: {
          style: ComponentDefaultProps.HEADING.style,
          text: ComponentDefaultProps.HEADING.text,
        },
      });
    } else if (itemTypes === ItemTypes.ICON) {
      arr.push({
        itemTypes: ItemTypes.ICON,
        key: key,
        props: {
          icon: ComponentDefaultProps.ICON.icon,
          linkTo: ComponentDefaultProps.ICON.linkTo,
          style: ComponentDefaultProps.ICON.style,
          text: ComponentDefaultProps.ICON.text,
        },
      });
    } else if (itemTypes === ItemTypes.IMAGE) {
      arr.push({
        itemTypes: ItemTypes.IMAGE,
        key: key,
        props: {
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
                style: ComponentDefaultProps.INNERSECTION_LAYOUT.style,
                text: ComponentDefaultProps.INNERSECTION_LAYOUT.text,
              },
            },
            {
              itemTypes: ItemTypes.INNERSECTION_LAYOUT,
              key: key + 2,
              props: {
                children: [],
                style: ComponentDefaultProps.INNERSECTION_LAYOUT.style,
                text: ComponentDefaultProps.INNERSECTION_LAYOUT.text,
              },
            },
          ],
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
          style: ComponentDefaultProps.INNERSECTION_LAYOUT.style,
          text: ComponentDefaultProps.INNERSECTION_LAYOUT.text,
        },
      });
    } else if (itemTypes === ItemTypes.MAP_COMPONENT) {
      arr.push({
        itemTypes: ItemTypes.MAP_COMPONENT,
        key: key,
        props: {
          location: ComponentDefaultProps.MAP_COMPONENT.location,
          style: ComponentDefaultProps.MAP_COMPONENT.style,
          text: ComponentDefaultProps.MAP_COMPONENT.text,
          zoom: ComponentDefaultProps.MAP_COMPONENT.zoom,
        },
      });
    } else if (itemTypes === ItemTypes.SPACER) {
      arr.push({
        itemTypes: ItemTypes.SPACER,
        key: key,
        props: {
          style: ComponentDefaultProps.SPACER.style,
          text: ComponentDefaultProps.SPACER.text,
        },
      });
    } else if (itemTypes === ItemTypes.STAR_RATING) {
      arr.push({
        itemTypes: ItemTypes.STAR_RATING,
        key: key,
        props: {
          starRatingCap: ComponentDefaultProps.STAR_RATING.starRatingCap,
          starRatingValue: ComponentDefaultProps.STAR_RATING.starRatingValue,
          style: ComponentDefaultProps.STAR_RATING.style,
          text: ComponentDefaultProps.STAR_RATING.text,
        },
      });
    } else if (itemTypes === ItemTypes.TEXT_EDITOR) {
      arr.push({
        itemTypes: ItemTypes.TEXT_EDITOR,
        key: key,
        props: {
          style: ComponentDefaultProps.TEXT_EDITOR.style,
          text: ComponentDefaultProps.TEXT_EDITOR.text,
          textEditorValue: ComponentDefaultProps.TEXT_EDITOR.textEditorValue,
        },
      });
    } else if (itemTypes === ItemTypes.VIDEO) {
      arr.push({
        itemTypes: ItemTypes.VIDEO,
        key: key,
        props: {
          controls: ComponentDefaultProps.VIDEO.controls,
          loop: ComponentDefaultProps.VIDEO.loop,
          muted: ComponentDefaultProps.VIDEO.muted,
          playing: ComponentDefaultProps.VIDEO.playing,
          source: ComponentDefaultProps.VIDEO.source,
          style: ComponentDefaultProps.VIDEO.style,
          text: ComponentDefaultProps.VIDEO.text,
        },
      });
    }
  };

  const changeComponentProps = (component, propsTypes, target, value) => {
    if (propsTypes === PropsTypes.ALIGN_ITEMS) {
      if (editComponent.selectedComponentItemTypes === ItemTypes.DIVIDER) {
        component = {
          ...component,
          props: {
            ...component.props,
            dividerTextContainerStyle: {
              ...component.props.dividerTextContainerStyle,
              alignItems: value,
            },
          },
        };
      } else {
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
      }
    } else if (propsTypes === PropsTypes.BACKGROUND_COLOR) {
      if (editComponent.selectedComponentItemTypes === ItemTypes.DIVIDER) {
        component = {
          ...component,
          props: {
            ...component.props,
            dividerTextStyle: {
              ...component.props.dividerTextStyle,
              backgroundColor: value,
            },
          },
        };
      } else {
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
      }
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
    } else if (propsTypes === PropsTypes.BORDER_COLOR) {
      if (editComponent.selectedComponentItemTypes === ItemTypes.DIVIDER) {
        component = {
          ...component,
          props: {
            ...component.props,
            dividerStyle: {
              ...component.props.dividerStyle,
              borderProps: {
                ...component.props.dividerStyle.borderProps,
                borderColor: value,
              },
            },
          },
        };
      } else {
        component = {
          ...component,
          props: {
            ...component.props,
            style: {
              ...component.props.style,
              borderColor: value,
            },
          },
        };
      }
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
      if (editComponent.selectedComponentItemTypes === ItemTypes.DIVIDER) {
        component = {
          ...component,
          props: {
            ...component.props,
            dividerStyle: {
              ...component.props.dividerStyle,
              borderProps: {
                ...component.props.dividerStyle.borderProps,
                borderStyle: value,
              },
            },
          },
        };
      } else {
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
      }
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
    } else if (propsTypes === PropsTypes.BORDER_WEIGHT) {
      component = {
        ...component,
        props: {
          ...component.props,
          dividerStyle: {
            ...component.props.dividerStyle,
            borderProps: {
              ...component.props.dividerStyle.borderProps,
              borderWeight: {
                ...component.props.dividerStyle.borderProps.borderWeight,
                [target]: value,
              },
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
    } else if (propsTypes === PropsTypes.BOX_SHADOW_COLOR) {
      component = {
        ...component,
        props: {
          ...component.props,
          style: {
            ...component.props.style,
            boxShadowProps: {
              ...component.props.style.boxShadowProps,
              boxShadowColor: value,
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
    } else if (propsTypes === PropsTypes.BUTTON_ALIGNMENT) {
      component = {
        ...component,
        props: {
          ...component.props,
          buttonAlignment: value,
        },
      };
    } else if (propsTypes === PropsTypes.COLOR) {
      if (editComponent.selectedComponentItemTypes === ItemTypes.DIVIDER) {
        component = {
          ...component,
          props: {
            ...component.props,
            dividerTextContainerStyle: {
              ...component.props.dividerTextContainerStyle,
              color: value,
            },
          },
        };
      } else {
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
      }
    } else if (propsTypes === PropsTypes.CONTROLS) {
      component = {
        ...component,
        props: {
          ...component.props,
          controls: value,
        },
      };
    } else if (propsTypes === PropsTypes.DIVIDER_TEXT) {
      component = {
        ...component,
        props: {
          ...component.props,
          dividerText: value,
        },
      };
    } else if (propsTypes === PropsTypes.FONT_SIZE) {
      if (editComponent.selectedComponentItemTypes === ItemTypes.DIVIDER) {
        component = {
          ...component,
          props: {
            ...component.props,
            dividerTextContainerStyle: {
              ...component.props.dividerTextContainerStyle,
              fontSize: {
                ...component.props.dividerTextContainerStyle.fontSize,
                [target]: value,
              },
            },
          },
        };
      } else {
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
      }
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
    } else if (propsTypes === PropsTypes.ICON) {
      component = {
        ...component,
        props: {
          ...component.props,
          icon: value,
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
      if (editComponent.selectedComponentItemTypes === ItemTypes.DIVIDER) {
        component = {
          ...component,
          props: {
            ...component.props,
            dividerTextContainerStyle: {
              ...component.props.dividerTextContainerStyle,
              justifyContent: value,
            },
          },
        };
      } else {
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
      }
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
    } else if (propsTypes === PropsTypes.LOCATION) {
      component = {
        ...component,
        props: {
          ...component.props,
          location: {
            ...component.props.location,
            latitude: mapState.latitude,
            longitude: mapState.longitude,
          },
        },
      };
    } else if (propsTypes === PropsTypes.LOOP) {
      component = {
        ...component,
        props: {
          ...component.props,
          loop: value,
        },
      };
    } else if (propsTypes === PropsTypes.MARGIN_BOTTOM) {
      if (editComponent.selectedComponentItemTypes === ItemTypes.DIVIDER) {
        component = {
          ...component,
          props: {
            ...component.props,
            dividerStyle: {
              ...component.props.dividerStyle,
              marginBottom: {
                ...component.props.dividerStyle.marginBottom,
                [target]: value,
              },
            },
          },
        };
      } else {
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
      }
    } else if (propsTypes === PropsTypes.MARGIN_LEFT) {
      if (editComponent.selectedComponentItemTypes === ItemTypes.DIVIDER) {
        component = {
          ...component,
          props: {
            ...component.props,
            dividerStyle: {
              ...component.props.dividerStyle,
              marginLeft: {
                ...component.props.dividerStyle.marginLeft,
                [target]: value,
              },
            },
          },
        };
      } else {
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
      }
    } else if (propsTypes === PropsTypes.MARGIN_RIGHT) {
      if (editComponent.selectedComponentItemTypes === ItemTypes.DIVIDER) {
        component = {
          ...component,
          props: {
            ...component.props,
            dividerStyle: {
              ...component.props.dividerStyle,
              marginRight: {
                ...component.props.dividerStyle.marginRight,
                [target]: value,
              },
            },
          },
        };
      } else {
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
      }
    } else if (propsTypes === PropsTypes.MARGIN_TOP) {
      if (editComponent.selectedComponentItemTypes === ItemTypes.DIVIDER) {
        component = {
          ...component,
          props: {
            ...component.props,
            dividerStyle: {
              ...component.props.dividerStyle,
              marginTop: {
                ...component.props.dividerStyle.marginTop,
                [target]: value,
              },
            },
          },
        };
      } else {
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
      }
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
    } else if (propsTypes === PropsTypes.MUTED) {
      component = {
        ...component,
        props: {
          ...component.props,
          muted: value,
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
      if (editComponent.selectedComponentItemTypes === ItemTypes.DIVIDER) {
        component = {
          ...component,
          props: {
            ...component.props,
            dividerStyle: {
              ...component.props.dividerStyle,
              paddingBottom: {
                ...component.props.dividerStyle.paddingBottom,
                [target]: value,
              },
            },
          },
        };
      } else {
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
      }
    } else if (propsTypes === PropsTypes.PADDING_LEFT) {
      if (editComponent.selectedComponentItemTypes === ItemTypes.DIVIDER) {
        component = {
          ...component,
          props: {
            ...component.props,
            dividerStyle: {
              ...component.props.dividerStyle,
              paddingLeft: {
                ...component.props.dividerStyle.paddingLeft,
                [target]: value,
              },
            },
          },
        };
      } else {
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
      }
    } else if (propsTypes === PropsTypes.PADDING_RIGHT) {
      if (editComponent.selectedComponentItemTypes === ItemTypes.DIVIDER) {
        component = {
          ...component,
          props: {
            ...component.props,
            dividerStyle: {
              ...component.props.dividerStyle,
              paddingRight: {
                ...component.props.dividerStyle.paddingRight,
                [target]: value,
              },
            },
          },
        };
      } else {
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
      }
    } else if (propsTypes === PropsTypes.PADDING_TOP) {
      if (editComponent.selectedComponentItemTypes === ItemTypes.DIVIDER) {
        component = {
          ...component,
          props: {
            ...component.props,
            dividerStyle: {
              ...component.props.dividerStyle,
              paddingTop: {
                ...component.props.dividerStyle.paddingTop,
                [target]: value,
              },
            },
          },
        };
      } else {
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
      }
    } else if (propsTypes === PropsTypes.PLAYING) {
      component = {
        ...component,
        props: {
          ...component.props,
          playing: value,
        },
      };
    } else if (propsTypes === PropsTypes.SOURCE) {
      component = {
        ...component,
        props: {
          ...component.props,
          source: value,
        },
      };
    } else if (propsTypes === PropsTypes.STAR_RATING_CAP) {
      component = {
        ...component,
        props: {
          ...component.props,
          starRatingCap: value,
        },
      };
    } else if (propsTypes === PropsTypes.STAR_RATING_VALUE) {
      component = {
        ...component,
        props: {
          ...component.props,
          starRatingValue: value,
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

  const changeMapState = (newLatitude, newLongitude) => {
    setMapState({ latitude: newLatitude, longitude: newLongitude });
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
    if (itemTypes === ItemTypes.BUTTON) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isEdit: true,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.COMPONENT_LIST_BUTTON) {
      setEditComponent({
        isEdit: false,
      });
    } else if (itemTypes === ItemTypes.DIVIDER) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isEdit: true,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.HEADING) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isEdit: true,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.ICON) {
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
    } else if (itemTypes === ItemTypes.MAP_COMPONENT) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isEdit: true,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.SPACER) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isEdit: true,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.STAR_RATING) {
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
    } else if (itemTypes === ItemTypes.VIDEO) {
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
    if (component.itemTypes === ItemTypes.BUTTON) {
      return (
        <Button
          key={component.key}
          componentKey={component.key}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.DIVIDER) {
      return (
        <Divider
          key={component.key}
          componentKey={component.key}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.HEADING) {
      return (
        <Heading
          key={component.key}
          componentKey={component.key}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.ICON) {
      return (
        <Icon
          key={component.key}
          componentKey={component.key}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.INNERSECTION) {
      return (
        <InnerSection
          key={component.key}
          componentKey={component.key}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.IMAGE) {
      return (
        <Image
          key={component.key}
          componentKey={component.key}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.MAP_COMPONENT) {
      return (
        <MapComponent
          key={component.key}
          componentKey={component.key}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.SPACER) {
      return (
        <Spacer
          key={component.key}
          componentKey={component.key}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.STAR_RATING) {
      return (
        <StarRating
          key={component.key}
          componentKey={component.key}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.TEXT_EDITOR) {
      return (
        <TextEditor
          key={component.key}
          componentKey={component.key}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.VIDEO) {
      return (
        <Video
          key={component.key}
          componentKey={component.key}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    }
  };

  const renderEditComponent = (selectedComponentKey) => {
    const component = findComponent(
      boardState.boardComponents,
      selectedComponentKey
    );
    const itemTypes = component.itemTypes;

    if (itemTypes === ItemTypes.BUTTON) {
      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.BUTTON,
            componentProps: component.props,
          }}
        />
      );
    } else if (itemTypes === ItemTypes.DIVIDER) {
      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.DIVIDER,
            componentProps: component.props,
            itemTypes: itemTypes,
          }}
        />
      );
    } else if (itemTypes === ItemTypes.HEADING) {
      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.HEADING,
            componentProps: component.props,
            itemTypes: itemTypes,
          }}
        />
      );
    } else if (itemTypes === ItemTypes.ICON) {
      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.ICON,
            componentProps: component.props,
            itemTypes: itemTypes,
          }}
        />
      );
    } else if (itemTypes === ItemTypes.IMAGE) {
      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.IMAGE,
            componentProps: component.props,
            itemTypes: itemTypes,
          }}
        />
      );
    } else if (itemTypes === ItemTypes.INNERSECTION) {
      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.INNERSECTION,
            componentProps: component.props,
            itemTypes: itemTypes,
          }}
        />
      );
    } else if (itemTypes === ItemTypes.INNERSECTION_LAYOUT) {
      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.INNERSECTION_LAYOUT,
            componentProps: component.props,
            itemTypes: itemTypes,
          }}
        />
      );
    } else if (itemTypes === ItemTypes.MAP_COMPONENT) {
      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.MAP_COMPONENT,
            componentProps: component.props,
            itemTypes: itemTypes,
          }}
        />
      );
    } else if (itemTypes === ItemTypes.SPACER) {
      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.SPACER,
            componentProps: component.props,
            itemTypes: itemTypes,
          }}
        />
      );
    } else if (itemTypes === ItemTypes.STAR_RATING) {
      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.STAR_RATING,
            componentProps: component.props,
            itemTypes: itemTypes,
          }}
        />
      );
    } else if (itemTypes === ItemTypes.TEXT_EDITOR) {
      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.TEXT_EDITOR,
            componentProps: component.props,
            itemTypes: itemTypes,
          }}
        />
      );
    } else if (itemTypes === ItemTypes.VIDEO) {
      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.VIDEO,
            componentProps: component.props,
            itemTypes: itemTypes,
          }}
        />
      );
    }
  };

  useEffect(() => {
    document.title = "Pricing";

    return () => {
      // boardState.boardComponents = [];
      // boardState.boardComponentsKey = -1;
      // boardState.getComponentData = false;
      // boardState.selectedComponentKey = null;
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
          changeMapState,
          editComponentProps,
          handleClick,
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
                      <ButtonWidget />
                      <DividerWidget />
                      <HeadingWidget />
                      <IconWidget />
                      <ImageWidget />
                      <InnerSectionWidget />
                      <MapComponentWidget />
                      <SpacerWidget />
                      <StarRatingWidget />
                      <TextEditorWidget />
                      <VideoWidget />
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
