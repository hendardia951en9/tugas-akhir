import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { ComponentDefaultProps } from "../../../utils/ComponentDefaultProps";
import { ComponentEditableProps } from "../../../utils/ComponentEditableProps";
import { faThList } from "@fortawesome/free-solid-svg-icons";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateFormData } from "../../../utils/generateFormData";
import { ItemTypes } from "../../../utils/ItemTypes";
import { PropsTypes } from "../../../utils/PropsTypes";

//components
import DOMTree from "../../DOMTree";
import UploadImage from "../../PageBuilder/UploadImage";

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
import ImageGallery from "../../PageBuilder/ImageGallery";
import ImageGalleryWidget from "../../PageBuilder/ImageGallery/widget";
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
import "./webgenerator.css";

export const PageBuilderContext = React.createContext();

const boardState = {
  boardComponents: {},
  boardComponentsKey: -1,
  boardNavbar: null,
  boardFooter: null,
  getComponentData: false,
  selectedComponentKey: null,
  selectedSitePageID: -1,
};

const WebGenerator = () => {
  const appContext = useContext(AppContext);
  const [editComponent, setEditComponent] = useState({
    isChoosePage: false,
    isDOMTree: false,
    isEdit: false,
    isListComponent: true,
    selectedComponentItemTypes: null,
  });
  const [isRerenderPage, setIsRerenderPage] = useState(false);
  const [isUploadImage, setIsUploadImage] = useState(false);
  const [uploadImageLocation, setUploadImageLocation] = useState("");
  const [isUploadImageMultiple, setIsUploadImageMultiple] = useState(false);
  const [mapState, setMapState] = useState({
    latitude: ComponentDefaultProps.MAP_COMPONENT.location.latitude,
    longitude: ComponentDefaultProps.MAP_COMPONENT.location.longitude,
  });
  const [sitePages, setSitePages] = useState([]);

  const addComponentToBoard = (itemTypes) => {
    boardState.boardComponentsKey += 1;
    addItems(
      boardState.boardComponents[boardState.selectedSitePageID],
      itemTypes,
      boardState.boardComponentsKey
    );

    setIsRerenderPage(!isRerenderPage);
  };

  const addComponentToInnerSectionLayout = (itemTypes, id) => {
    boardState.boardComponentsKey += 1;
    const component = findComponent(
      boardState.boardComponents[boardState.selectedSitePageID],
      id
    );
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
        props: ComponentDefaultProps.BUTTON,
      });
    } else if (itemTypes === ItemTypes.DIVIDER) {
      arr.push({
        itemTypes: ItemTypes.DIVIDER,
        key: key,
        props: ComponentDefaultProps.DIVIDER,
      });
    } else if (itemTypes === ItemTypes.HEADING) {
      arr.push({
        itemTypes: ItemTypes.HEADING,
        key: key,
        props: ComponentDefaultProps.HEADING,
      });
    } else if (itemTypes === ItemTypes.ICON) {
      arr.push({
        itemTypes: ItemTypes.ICON,
        key: key,
        props: ComponentDefaultProps.ICON,
      });
    } else if (itemTypes === ItemTypes.IMAGE) {
      arr.push({
        itemTypes: ItemTypes.IMAGE,
        key: key,
        props: ComponentDefaultProps.IMAGE,
      });
    } else if (itemTypes === ItemTypes.IMAGE_GALLERY) {
      arr.push({
        itemTypes: ItemTypes.IMAGE_GALLERY,
        key: key,
        props: ComponentDefaultProps.IMAGE_GALLERY,
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
        props: ComponentDefaultProps.INNERSECTION_LAYOUT,
      });
    } else if (itemTypes === ItemTypes.MAP_COMPONENT) {
      arr.push({
        itemTypes: ItemTypes.MAP_COMPONENT,
        key: key,
        props: ComponentDefaultProps.MAP_COMPONENT,
      });
    } else if (itemTypes === ItemTypes.SPACER) {
      arr.push({
        itemTypes: ItemTypes.SPACER,
        key: key,
        props: ComponentDefaultProps.SPACER,
      });
    } else if (itemTypes === ItemTypes.STAR_RATING) {
      arr.push({
        itemTypes: ItemTypes.STAR_RATING,
        key: key,
        props: ComponentDefaultProps.STAR_RATING,
      });
    } else if (itemTypes === ItemTypes.TEXT_EDITOR) {
      arr.push({
        itemTypes: ItemTypes.TEXT_EDITOR,
        key: key,
        props: ComponentDefaultProps.TEXT_EDITOR,
      });
    } else if (itemTypes === ItemTypes.VIDEO) {
      arr.push({
        itemTypes: ItemTypes.VIDEO,
        key: key,
        props: ComponentDefaultProps.VIDEO,
      });
    }
  };

  const addNavbarMenu = () => {
    boardState.boardNavbar.props.menu.push({
      props: {
        linkTo: "lorem",
        text: "lorem",
      },
      submenu: [],
    });

    //3ger rerender
    setIsRerenderPage(!isRerenderPage);
  };

  const addNavbarSubMenu = (location) => {
    boardState.boardNavbar.props.menu[location[1]].submenu.push({
      itemTypes: ItemTypes.USER_NAVBAR_SUBMENU,
      props: {
        linkTo: "lorem",
        text: "lorem",
      },
    });

    //3ger rerender
    setIsRerenderPage(!isRerenderPage);
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
    } else if (propsTypes === PropsTypes.IMAGE_GALLERY_ALIGNMENT) {
      component = {
        ...component,
        props: {
          ...component.props,
          imageGalleryAlignment: value,
        },
      };
    } else if (propsTypes === PropsTypes.IMAGE_GALLERY_IMAGES) {
      component = {
        ...component,
        props: {
          ...component.props,
          imageGalleryImages: value,
        },
      };
    } else if (propsTypes === PropsTypes.INFINITE) {
      component = {
        ...component,
        props: {
          ...component.props,
          infinite: value,
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
    } else if (propsTypes === PropsTypes.SHOW_BULLETS) {
      component = {
        ...component,
        props: {
          ...component.props,
          showBullets: value,
        },
      };
    } else if (propsTypes === PropsTypes.SHOW_FULLSCREEN_BUTTON) {
      component = {
        ...component,
        props: {
          ...component.props,
          showFullscreenButton: value,
        },
      };
    } else if (propsTypes === PropsTypes.SHOW_NAV) {
      component = {
        ...component,
        props: {
          ...component.props,
          showNav: value,
        },
      };
    } else if (propsTypes === PropsTypes.SHOW_PLAY_BUTTON) {
      component = {
        ...component,
        props: {
          ...component.props,
          showPlayButton: value,
        },
      };
    } else if (propsTypes === PropsTypes.SHOW_THUMBNAILS) {
      component = {
        ...component,
        props: {
          ...component.props,
          showThumbnails: value,
        },
      };
    } else if (propsTypes === PropsTypes.SLIDE_INTERVAL) {
      component = {
        ...component,
        props: {
          ...component.props,
          slideInterval: value,
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
    } else if (propsTypes === PropsTypes.THUMBNAIL_POSITION) {
      component = {
        ...component,
        props: {
          ...component.props,
          thumbnailPosition: value,
        },
      };
    } else if (propsTypes === PropsTypes.USER_NAVBAR_LOGO) {
      component = {
        ...component,
        props: {
          ...component.props,
          userNavbarLogo: value,
        },
      };
      console.log(component);
    } else if (propsTypes === PropsTypes.USER_NAVBAR_LOGO_IS_SHOW) {
      component = {
        ...component,
        props: {
          ...component.props,
          userNavbarLogoIsShow: value === "true",
        },
      };
    } else if (propsTypes === PropsTypes.USER_NAVBAR_LOGO_MAX_HEIGHT) {
      component = {
        ...component,
        props: {
          ...component.props,
          userNavbarLogoMaxHeight: {
            ...component.props.userNavbarLogoMaxHeight,
            [target]: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.USER_NAVBAR_LOGO_MAX_WIDTH) {
      component = {
        ...component,
        props: {
          ...component.props,
          userNavbarLogoMaxWidth: {
            ...component.props.userNavbarLogoMaxWidth,
            [target]: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.USER_NAVBAR_MENU_COLOR) {
      component = {
        ...component,
        props: {
          ...component.props,
          menuStyle: {
            ...component.props.menuStyle,
            color: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.USER_NAVBAR_SUBMENU_BACKGROUND_COLOR) {
      component = {
        ...component,
        props: {
          ...component.props,
          subMenuStyle: {
            ...component.props.subMenuStyle,
            backgroundColor: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.USER_NAVBAR_SUBMENU_COLOR) {
      component = {
        ...component,
        props: {
          ...component.props,
          subMenuStyle: {
            ...component.props.subMenuStyle,
            color: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.USER_NAVBAR_SUBMENU_FONT_SIZE) {
      component = {
        ...component,
        props: {
          ...component.props,
          subMenuStyle: {
            ...component.props.subMenuStyle,
            fontSize: {
              ...component.props.subMenuStyle.fontSize,
              [target]: value,
            },
          },
        },
      };
      console.log(component);
    } else if (propsTypes === PropsTypes.USER_NAVBAR_SUBMENU_FONT_WEIGHT) {
      component = {
        ...component,
        props: {
          ...component.props,
          subMenuStyle: {
            ...component.props.subMenuStyle,
            fontWeight: value,
          },
        },
      };
    } else if (propsTypes === PropsTypes.USER_NAVBAR_SUBMENU_GAP) {
      component = {
        ...component,
        props: {
          ...component.props,
          subMenuStyle: {
            ...component.props.subMenuStyle,
            gap: {
              ...component.props.subMenuStyle.gap,
              [target]: value,
            },
          },
        },
      };
    } else if (propsTypes === PropsTypes.USER_NAVBAR_SUBMENU_TEXT_TRANSFORM) {
      component = {
        ...component,
        props: {
          ...component.props,
          subMenuStyle: {
            ...component.props.subMenuStyle,
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

  const closeUploadImage = () => {
    setIsUploadImage(false);
  };

  const editComponentProps = (propsTypes, target, value, location) => {
    if (Array.isArray(location)) {
      console.log(location);
      if (location[0] === ItemTypes.USER_NAVBAR_MENU) {
        boardState.boardNavbar.props.menu[location[1]] = changeComponentProps(
          boardState.boardNavbar.props.menu[location[1]],
          propsTypes,
          target,
          value
        );
      } else if (location[0] === ItemTypes.USER_NAVBAR_SUBMENU) {
        boardState.boardNavbar.props.menu[location[1]].submenu[location[2]] =
          changeComponentProps(
            boardState.boardNavbar.props.menu[location[1]].submenu[location[2]],
            propsTypes,
            target,
            value
          );
      }
    } else if (location === ItemTypes.USER_NAVBAR) {
      boardState.boardNavbar = changeComponentProps(
        boardState.boardNavbar,
        propsTypes,
        target,
        value
      );
    } else {
      let result = false;

      //cari di boardcomponent
      boardState.boardComponents[boardState.selectedSitePageID].forEach(
        (component, index) => {
          if (component.key === boardState.selectedComponentKey) {
            result = true;
            boardState.boardComponents[boardState.selectedSitePageID][index] = {
              ...changeComponentProps(component, propsTypes, target, value),
            };
          }
        }
      );

      //cari di innersection
      if (!result) {
        boardState.boardComponents[boardState.selectedSitePageID].forEach(
          (component, index) => {
            if (!result) {
              if (component.itemTypes === ItemTypes.INNERSECTION) {
                component.props.children.forEach((child, index2) => {
                  if (!result) {
                    if (child.key === boardState.selectedComponentKey) {
                      result = true;
                      boardState.boardComponents[boardState.selectedSitePageID][
                        index
                      ].props.children[index2] = {
                        ...changeComponentProps(
                          child,
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
          }
        );
      }

      //cari di innersectionlayout
      if (!result) {
        boardState.boardComponents[boardState.selectedSitePageID].forEach(
          (component, index) => {
            if (!result) {
              if (component.itemTypes === ItemTypes.INNERSECTION) {
                component.props.children.forEach((child, index2) => {
                  if (!result) {
                    if (child.props.children.length > 0) {
                      child.props.children.forEach((child2, index3) => {
                        if (!result) {
                          if (child2.key === boardState.selectedComponentKey) {
                            result = true;
                            boardState.boardComponents[
                              boardState.selectedSitePageID
                            ][index].props.children[index2].props.children[
                              index3
                            ] = {
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
          }
        );
      }
    }

    //3ger rerender
    setIsRerenderPage(!isRerenderPage);
  };

  const fetchUserSiteData = async () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      siteID: localStorage.getItem("site_id"),
    });

    axios
      .post(`${process.env.REACT_APP_SITE_URL}/getusersitedata`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);

        if (res.data.status === 200) {
          const { site_components_key, site_navbar_json, site_footer_json } =
            res.data.result;
          boardState.boardComponentsKey = parseInt(site_components_key);
          boardState.boardNavbar = JSON.parse(site_navbar_json);
          boardState.boardFooter = JSON.parse(site_footer_json);
          fetchUserSitePages();
        }
      })
      .catch((err) => {
        //error
        if (err.response) {
          console.log("res error", err.response.data);
        } else if (err.request) {
          console.log("req error", err.request.data);
        } else {
          console.log("Error", err.message);
        }
        appContext.setIsLoading(false);
      });
  };

  const fetchUserSitePages = async () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      siteID: localStorage.getItem("site_id"),
    });

    axios
      .post(`${process.env.REACT_APP_SITE_URL}/getusersitepages`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);

        if (res.data.status === 200) {
          setSitePages(res.data.result);
          boardState.boardComponents = {};
          boardState.getComponentData = false;
          boardState.selectedComponentKey = null;
          boardState.selectedSitePageID = -1;

          setEditComponent({
            isChoosePage: false,
            isEdit: false,
            isListComponent: true,
            selectedComponentItemTypes: null,
          });

          res.data.result.forEach((element, index) => {
            const { site_page_id, site_page_json } = element;
            boardState.boardComponents[`${site_page_id}`] =
              JSON.parse(site_page_json);

            if (index === 0) {
              boardState.selectedSitePageID = parseInt(site_page_id);
            }
          });

          setIsRerenderPage(!isRerenderPage);
        }
      })
      .catch((err) => {
        //error
        if (err.response) {
          console.log("res error", err.response.data);
        } else if (err.request) {
          console.log("req error", err.request.data);
        } else {
          console.log("Error", err.message);
        }
        appContext.setIsLoading(false);
      });
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

  const handleClickPageBuilderComponent = (itemTypes, key) => {
    if (itemTypes === ItemTypes.BUTTON) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isChoosePage: false,
        isDOMTree: false,
        isEdit: true,
        isListComponent: false,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.CHOOSE_PAGE_BUTTON) {
      setEditComponent({
        isChoosePage: true,
        isDOMTree: false,
        isEdit: false,
        isListComponent: false,
      });
    } else if (itemTypes === ItemTypes.COMPONENT_LIST_BUTTON) {
      setEditComponent({
        isChoosePage: false,
        isDOMTree: false,
        isEdit: false,
        isListComponent: true,
      });
    } else if (itemTypes === ItemTypes.DOM_TREE_BUTTON) {
      setEditComponent({
        isChoosePage: false,
        isDOMTree: true,
        isEdit: false,
        isListComponent: false,
      });
    } else if (itemTypes === ItemTypes.DIVIDER) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isChoosePage: false,
        isEdit: true,
        isListComponent: false,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.HEADING) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isChoosePage: false,
        isEdit: true,
        isListComponent: false,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.ICON) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isChoosePage: false,
        isEdit: true,
        isListComponent: false,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.IMAGE) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isChoosePage: false,
        isEdit: true,
        isListComponent: false,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.IMAGE_GALLERY) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isChoosePage: false,
        isEdit: true,
        isListComponent: false,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.INNERSECTION) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isChoosePage: false,
        isEdit: true,
        isListComponent: false,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.INNERSECTION_LAYOUT) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isChoosePage: false,
        isEdit: true,
        isListComponent: false,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.MAP_COMPONENT) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isChoosePage: false,
        isEdit: true,
        isListComponent: false,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.SPACER) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isChoosePage: false,
        isEdit: true,
        isListComponent: false,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.STAR_RATING) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isChoosePage: false,
        isEdit: true,
        isListComponent: false,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.TEXT_EDITOR) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isChoosePage: false,
        isEdit: true,
        isListComponent: false,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.USER_NAVBAR) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isChoosePage: false,
        isDOMTree: false,
        isEdit: true,
        isListComponent: false,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.USER_NAVBAR_MENU) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isChoosePage: false,
        isDOMTree: false,
        isEdit: true,
        isListComponent: false,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.USER_NAVBAR_SUBMENU) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isChoosePage: false,
        isDOMTree: false,
        isEdit: true,
        isListComponent: false,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.USER_FOOTER) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isChoosePage: false,
        isDOMTree: false,
        isEdit: true,
        isListComponent: false,
        selectedComponentItemTypes: itemTypes,
      });
    } else if (itemTypes === ItemTypes.VIDEO) {
      boardState.selectedComponentKey = key;
      boardState.getComponentData = true;
      setEditComponent({
        isChoosePage: false,
        isEdit: true,
        isListComponent: false,
        selectedComponentItemTypes: itemTypes,
      });
    }
  };

  const handleClickSitePage = (site_page_id) => {
    boardState.selectedSitePageID = site_page_id;

    //3ger rerender
    setIsRerenderPage(!isRerenderPage);
  };

  const handleClickUploadImage = (isMultiple, propsTypes) => {
    setIsUploadImage(true);
    setIsUploadImageMultiple(isMultiple);
    setUploadImageLocation(propsTypes);
  };

  const renderComponent = (component) => {
    if (component.itemTypes === ItemTypes.BUTTON) {
      return (
        <Button
          key={component.key}
          componentKey={component.key}
          isEdit={true}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.DIVIDER) {
      return (
        <Divider
          key={component.key}
          componentKey={component.key}
          isEdit={true}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.HEADING) {
      return (
        <Heading
          key={component.key}
          componentKey={component.key}
          isEdit={true}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.ICON) {
      return (
        <Icon
          key={component.key}
          componentKey={component.key}
          isEdit={true}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.INNERSECTION) {
      return (
        <InnerSection
          key={component.key}
          componentKey={component.key}
          isEdit={true}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.IMAGE) {
      return (
        <Image
          key={component.key}
          componentKey={component.key}
          isEdit={true}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.IMAGE_GALLERY) {
      return (
        <ImageGallery
          key={component.key}
          componentKey={component.key}
          isEdit={true}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.MAP_COMPONENT) {
      return (
        <MapComponent
          key={component.key}
          componentKey={component.key}
          isEdit={true}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.SPACER) {
      return (
        <Spacer
          key={component.key}
          componentKey={component.key}
          isEdit={true}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.STAR_RATING) {
      return (
        <StarRating
          key={component.key}
          componentKey={component.key}
          isEdit={true}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.TEXT_EDITOR) {
      return (
        <TextEditor
          key={component.key}
          componentKey={component.key}
          isEdit={true}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    } else if (component.itemTypes === ItemTypes.VIDEO) {
      return (
        <Video
          key={component.key}
          componentKey={component.key}
          isEdit={true}
          itemTypes={component.itemTypes}
          props={component.props}
        />
      );
    }
  };

  const renderEditComponent = (selectedComponentKey) => {
    if (Array.isArray(selectedComponentKey)) {
      if (selectedComponentKey[0] === ItemTypes.USER_NAVBAR_MENU) {
        const component =
          boardState.boardNavbar.props.menu[selectedComponentKey[1]];
        const location = [ItemTypes.USER_NAVBAR_MENU, selectedComponentKey[1]];

        return (
          <EditComponent
            props={{
              componentEditableProps: ComponentEditableProps.USER_NAVBAR_MENU,
              componentProps: component.props,
              itemTypes: component.itemTypes,
              location: location,
            }}
          />
        );
      } else if (selectedComponentKey[0] === ItemTypes.USER_NAVBAR_SUBMENU) {
        const component =
          boardState.boardNavbar.props.menu[selectedComponentKey[1]].submenu[
            selectedComponentKey[2]
          ];
        const location = [
          ItemTypes.USER_NAVBAR_SUBMENU,
          selectedComponentKey[1],
          selectedComponentKey[2],
        ];

        return (
          <EditComponent
            props={{
              componentEditableProps:
                ComponentEditableProps.USER_NAVBAR_SUBMENU,
              componentProps: component.props,
              itemTypes: component.itemTypes,
              location: location,
            }}
          />
        );
      }
    } else if (selectedComponentKey === ItemTypes.USER_NAVBAR) {
      const component = boardState.boardNavbar;
      const location = ItemTypes.USER_NAVBAR;

      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.USER_NAVBAR,
            componentProps: component.props,
            itemTypes: component.itemTypes,
            location: location,
          }}
        />
      );
    } else if (selectedComponentKey === ItemTypes.USER_FOOTER) {
      const component = boardState.boardFooter;
      const location = ItemTypes.USER_FOOTER;

      return (
        <EditComponent
          props={{
            componentEditableProps: ComponentEditableProps.USER_FOOTER,
            componentProps: component,
            itemTypes: component.itemTypes,
            location: location,
          }}
        />
      );
    } else {
      const component = findComponent(
        boardState.boardComponents[boardState.selectedSitePageID],
        selectedComponentKey
      );
      const itemTypes = component.itemTypes;
      const location = ItemTypes.BOARD;

      if (itemTypes === ItemTypes.BUTTON) {
        return (
          <EditComponent
            props={{
              componentEditableProps: ComponentEditableProps.BUTTON,
              componentProps: component.props,
              itemTypes: itemTypes,
              location: location,
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
              location: location,
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
              location: location,
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
              location: location,
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
              location: location,
            }}
          />
        );
      } else if (itemTypes === ItemTypes.IMAGE_GALLERY) {
        return (
          <EditComponent
            props={{
              componentEditableProps: ComponentEditableProps.IMAGE_GALLERY,
              componentProps: component.props,
              itemTypes: itemTypes,
              location: location,
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
              location: location,
            }}
          />
        );
      } else if (itemTypes === ItemTypes.INNERSECTION_LAYOUT) {
        return (
          <EditComponent
            props={{
              componentEditableProps:
                ComponentEditableProps.INNERSECTION_LAYOUT,
              componentProps: component.props,
              itemTypes: itemTypes,
              location: location,
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
              location: location,
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
              location: location,
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
              location: location,
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
              location: location,
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
              location: location,
            }}
          />
        );
      }
    }
  };

  const reorderComponent = (componentKey, direction) => {
    let found = false;

    //cari di boardcomponent
    boardState.boardComponents[boardState.selectedSitePageID].forEach(
      (element, index) => {
        if (element.key === componentKey) {
          found = true;

          const indexFound = index;
          const tempArr = [
            ...boardState.boardComponents[boardState.selectedSitePageID],
          ];

          if (direction === "UP") {
            if (indexFound > 0) {
              const componentToMove = tempArr.splice(index, 1)[0];
              tempArr.splice(indexFound - 1, 0, componentToMove);
              boardState.boardComponents[boardState.selectedSitePageID] =
                tempArr;
              setIsRerenderPage(!isRerenderPage);
            }
          } else if (direction === "DOWN") {
            if (
              indexFound <
              boardState.boardComponents[boardState.selectedSitePageID].length
            ) {
              const componentToMove = tempArr.splice(index, 1)[0];
              tempArr.splice(indexFound + 1, 0, componentToMove);
              boardState.boardComponents[boardState.selectedSitePageID] =
                tempArr;
              setIsRerenderPage(!isRerenderPage);
            }
          }
        }
      }
    );

    //cari di innersection
    if (found === false) {
      boardState.boardComponents[boardState.selectedSitePageID].forEach(
        (element, index) => {
          if (found === true) {
            return;
          } else {
            if (element.itemTypes === ItemTypes.INNERSECTION) {
              element.props.children.forEach((element2, index2) => {
                if (element2.key === componentKey) {
                  found = true;

                  const indexFound = index2;
                  const tempArr = [
                    ...boardState.boardComponents[
                      boardState.selectedSitePageID
                    ][index].props.children,
                  ];

                  if (direction === "UP") {
                    if (indexFound > 0) {
                      const componentToMove = tempArr.splice(index2, 1)[0];
                      tempArr.splice(indexFound - 1, 0, componentToMove);
                      boardState.boardComponents[boardState.selectedSitePageID][
                        index
                      ].props.children = tempArr;
                      setIsRerenderPage(!isRerenderPage);
                    }
                  } else if (direction === "DOWN") {
                    if (
                      indexFound <
                      boardState.boardComponents[boardState.selectedSitePageID][
                        index
                      ].props.children.length
                    ) {
                      const componentToMove = tempArr.splice(index2, 1)[0];
                      tempArr.splice(indexFound + 1, 0, componentToMove);
                      boardState.boardComponents[boardState.selectedSitePageID][
                        index
                      ].props.children = tempArr;
                      setIsRerenderPage(!isRerenderPage);
                    }
                  }
                }
              });
            }
          }
        }
      );
    }

    //cari di innersection layout
    if (found === false) {
      boardState.boardComponents[boardState.selectedSitePageID].forEach(
        (element, index) => {
          if (found) {
            return;
          } else {
            if (element.itemTypes === ItemTypes.INNERSECTION) {
              element.props.children.forEach((element2, index2) => {
                if (found) {
                  return;
                } else {
                  element2.props.children.forEach((element3, index3) => {
                    if (element3.key === componentKey) {
                      found = true;

                      const indexFound = index3;
                      const tempArr = [
                        ...boardState.boardComponents[
                          boardState.selectedSitePageID
                        ][index].props.children[index2].props.children,
                      ];

                      if (direction === "UP") {
                        if (indexFound > 0) {
                          const componentToMove = tempArr.splice(index3, 1)[0];
                          tempArr.splice(indexFound - 1, 0, componentToMove);
                          boardState.boardComponents[
                            boardState.selectedSitePageID
                          ][index].props.children[index2].props.children =
                            tempArr;
                          setIsRerenderPage(!isRerenderPage);
                        }
                      } else if (direction === "DOWN") {
                        if (
                          indexFound <
                          boardState.boardComponents[
                            boardState.selectedSitePageID
                          ][index].props.children[index2].props.children.length
                        ) {
                          const componentToMove = tempArr.splice(index3, 1)[0];
                          tempArr.splice(indexFound + 1, 0, componentToMove);
                          boardState.boardComponents[
                            boardState.selectedSitePageID
                          ][index].props.children[index2].props.children =
                            tempArr;
                          setIsRerenderPage(!isRerenderPage);
                        }
                      }
                    }
                  });
                }
              });
            }
          }
        }
      );
    }
  };

  const saveSite = async () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      siteID: localStorage.getItem("site_id"),
      siteComponentsKey: boardState.boardComponentsKey.toString(),
      siteJSON: JSON.stringify(boardState.boardComponents),
      siteNavbarJSON: JSON.stringify(boardState.boardNavbar),
      siteFooterJSON: JSON.stringify(boardState.boardFooter),
    });

    axios
      .post(`${process.env.REACT_APP_SITE_URL}/savesite`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);
      })
      .catch((err) => {
        //error
        if (err.response) {
          console.log("res error", err.response.data);
        } else if (err.request) {
          console.log("req error", err.request.data);
        } else {
          console.log("Error", err.message);
        }
        appContext.setIsLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Web Generator";
    fetchUserSiteData();

    return () => {
      boardState.boardComponents = {};
      boardState.boardComponentsKey = -1;
      boardState.boardNavbar = null;
      boardState.boardFooter = null;
      boardState.getComponentData = false;
      boardState.selectedComponentKey = null;
      boardState.selectedSitePageID = -1;

      setEditComponent({
        isChoosePage: false,
        isEdit: false,
        isListComponent: true,
        selectedComponentItemTypes: null,
      });

      localStorage.removeItem("site_id");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <PageBuilderContext.Provider
        value={{
          boardState,
          addComponentToBoard,
          addComponentToInnerSectionLayout,
          addNavbarMenu,
          addNavbarSubMenu,
          changeMapState,
          closeUploadImage,
          editComponentProps,
          handleClickPageBuilderComponent,
          handleClickUploadImage,
          renderComponent,
          reorderComponent,
        }}
      >
        {isUploadImage && (
          <UploadImage
            isMultiple={isUploadImageMultiple}
            location={uploadImageLocation}
          />
        )}

        <div className="navbar-margin">
          <div className="page-builder-container">
            <div className="sidebar">
              <div className="sidebar-header">
                <button
                  className="choose-page-button"
                  onClick={() =>
                    handleClickPageBuilderComponent(
                      ItemTypes.CHOOSE_PAGE_BUTTON,
                      null
                    )
                  }
                >
                  <FontAwesomeIcon icon={faWindowRestore} />
                </button>
                <button
                  className="dom-tree-button"
                  onClick={() =>
                    handleClickPageBuilderComponent(
                      ItemTypes.DOM_TREE_BUTTON,
                      null
                    )
                  }
                >
                  <FontAwesomeIcon icon={faWindowRestore} />
                </button>
                <div className="title">
                  {editComponent.isChoosePage
                    ? "Choose Page"
                    : editComponent.isDOMTree
                    ? "DOM Tree"
                    : editComponent.isEdit
                    ? "Edit " + editComponent.selectedComponentItemTypes
                    : editComponent.isListComponent
                    ? "Components"
                    : ""}
                </div>
                <button
                  className="components-button"
                  onClick={() =>
                    handleClickPageBuilderComponent(
                      ItemTypes.COMPONENT_LIST_BUTTON,
                      null
                    )
                  }
                >
                  <FontAwesomeIcon icon={faThList} />
                </button>
              </div>
              <div className="sidebar-container">
                {editComponent.isChoosePage ? (
                  sitePages.map((props) => {
                    const { site_page_id, site_page_name } = props;
                    return (
                      <div
                        key={site_page_id}
                        onClick={() => handleClickSitePage(site_page_id)}
                      >
                        {site_page_name}
                      </div>
                    );
                  })
                ) : editComponent.isDOMTree ? (
                  <DOMTree
                    components={
                      boardState.boardComponents[boardState.selectedSitePageID]
                    }
                  />
                ) : editComponent.isEdit ? (
                  renderEditComponent(boardState.selectedComponentKey)
                ) : editComponent.isListComponent ? (
                  <div className="widgets">
                    <ButtonWidget />
                    <DividerWidget />
                    <HeadingWidget />
                    <IconWidget />
                    <ImageWidget />
                    <ImageGalleryWidget />
                    <InnerSectionWidget />
                    <MapComponentWidget />
                    <SpacerWidget />
                    <StarRatingWidget />
                    <TextEditorWidget />
                    <VideoWidget />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="sidebar-footer">
                <button onClick={saveSite}>Save</button>
                <button onClick={fetchUserSiteData}>Load</button>
              </div>
            </div>
            <div className="board-container">
              <Board
                boardComponents={
                  boardState.boardComponents[boardState.selectedSitePageID]
                }
                boardNavbar={boardState.boardNavbar}
                boardFooter={boardState.boardFooter}
              />
            </div>
          </div>
        </div>
      </PageBuilderContext.Provider>
    </>
  );
};

export default WebGenerator;
