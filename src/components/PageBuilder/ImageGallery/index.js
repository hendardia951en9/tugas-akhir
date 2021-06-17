import React, { useContext } from "react";
import ImageGalleryComponent from "react-image-gallery";
import { generateStyle } from "../../../utils/generateStyle";
import { PageBuilderContext } from "../../Pages/WebGenerator";

//css
import "./imagegallery.css";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageGallery = ({ componentKey, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <div
      className="image-gallery-component-wrapper"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          pageBuilderContext.handleClickPageBuilderComponent(
            itemTypes,
            componentKey
          );
        }
      }}
      style={generateStyle(props.style)}
    >
      <ImageGalleryComponent
        infinite={props.infinite === "true"}
        items={props.images}
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
