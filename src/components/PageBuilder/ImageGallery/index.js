import React, { useContext } from "react";
import ImageGalleryComponent from "react-image-gallery";
import { generateStyle } from "../../../utils/generateStyle";
import { PageBuilderContext } from "../../Pages/WebGenerator";

//css
import "./imagegallery.css";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageGallery = ({ componentKey, isEdit, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  const editStyle = (style, imageAlignment) => {
    if (imageAlignment === "center") {
      style = {
        ...style,
        marginLeft: {
          ...style.marginLeft,
          unit: "auto",
        },
      };
      style = {
        ...style,
        marginRight: {
          ...style.marginRight,
          unit: "auto",
        },
      };
    } else if (imageAlignment === "left") {
      style = {
        ...style,
        marginRight: {
          ...style.marginRight,
          unit: "auto",
        },
      };
    } else if (imageAlignment === "right") {
      style = {
        ...style,
        marginLeft: {
          ...style.marginLeft,
          unit: "auto",
        },
      };
    }

    return style;
  };

  return (
    <div
      className="image-gallery-component-wrapper"
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
      style={generateStyle(editStyle(props.style, props.imageGalleryAlignment))}
    >
      <ImageGalleryComponent
        infinite={props.infinite === "true"}
        items={props.imageGalleryImages}
        showBullets={props.showBullets === "true"}
        showFullscreenButton={props.showFullscreenButton === "true"}
        showNav={props.showNav === "true"}
        showPlayButton={props.showPlayButton === "true"}
        showThumbnails={props.showThumbnails === "true"}
        slideInterval={parseInt(props.slideInterval)}
        thumbnailPosition={props.thumbnailPosition}
      />
    </div>
  );
};

export default ImageGallery;
