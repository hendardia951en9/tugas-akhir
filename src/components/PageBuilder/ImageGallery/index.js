import React, { useContext } from "react";
import ButtonRipple from "../../ButtonRipple";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      style={generateStyle(editStyle(props.style, props.imageGalleryAlignment))}
    >
      {isEdit && (
        <ButtonRipple
          className="image-gallery-component-edit-button"
          fa={<FontAwesomeIcon icon={faEdit} />}
          onClick={(e) => {
            pageBuilderContext.handleClickPageBuilderComponent(
              itemTypes,
              componentKey
            );
          }}
        />
      )}
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
