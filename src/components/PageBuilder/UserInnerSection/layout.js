import React from "react";
import { generateStyle } from "../../../utils/generateStyle";
import { ItemTypes } from "../../../utils/ItemTypes";

//components
import Button from "../../PageBuilder/Button";
import Divider from "../../PageBuilder/Divider";
import Heading from "../../PageBuilder/Heading";
import Icon from "../../PageBuilder/Icon";
import Image from "../../PageBuilder/Image";
import ImageGallery from "../../PageBuilder/ImageGallery";
import MapComponent from "../../PageBuilder/MapComponent";
import Spacer from "../../PageBuilder/Spacer";
import StarRating from "../../PageBuilder/StarRating";
import TextEditor from "../../PageBuilder/TextEditor";
import Video from "../../PageBuilder/Video";

const renderComponent = (component) => {
  if (component.itemTypes === ItemTypes.BUTTON) {
    return (
      <Button
        key={component.key}
        componentKey={component.key}
        isEdit={false}
        itemTypes={component.itemTypes}
        props={component.props}
      />
    );
  } else if (component.itemTypes === ItemTypes.DIVIDER) {
    return (
      <Divider
        key={component.key}
        componentKey={component.key}
        isEdit={false}
        itemTypes={component.itemTypes}
        props={component.props}
      />
    );
  } else if (component.itemTypes === ItemTypes.HEADING) {
    return (
      <Heading
        key={component.key}
        componentKey={component.key}
        isEdit={false}
        itemTypes={component.itemTypes}
        props={component.props}
      />
    );
  } else if (component.itemTypes === ItemTypes.ICON) {
    return (
      <Icon
        key={component.key}
        componentKey={component.key}
        isEdit={false}
        itemTypes={component.itemTypes}
        props={component.props}
      />
    );
  } else if (component.itemTypes === ItemTypes.IMAGE) {
    return (
      <Image
        key={component.key}
        componentKey={component.key}
        isEdit={false}
        itemTypes={component.itemTypes}
        props={component.props}
      />
    );
  } else if (component.itemTypes === ItemTypes.IMAGE_GALLERY) {
    return (
      <ImageGallery
        key={component.key}
        componentKey={component.key}
        isEdit={false}
        itemTypes={component.itemTypes}
        props={component.props}
      />
    );
  } else if (component.itemTypes === ItemTypes.MAP_COMPONENT) {
    return (
      <MapComponent
        key={component.key}
        componentKey={component.key}
        isEdit={false}
        itemTypes={component.itemTypes}
        props={component.props}
      />
    );
  } else if (component.itemTypes === ItemTypes.SPACER) {
    return (
      <Spacer
        key={component.key}
        componentKey={component.key}
        isEdit={false}
        itemTypes={component.itemTypes}
        props={component.props}
      />
    );
  } else if (component.itemTypes === ItemTypes.STAR_RATING) {
    return (
      <StarRating
        key={component.key}
        componentKey={component.key}
        isEdit={false}
        itemTypes={component.itemTypes}
        props={component.props}
      />
    );
  } else if (component.itemTypes === ItemTypes.TEXT_EDITOR) {
    return (
      <TextEditor
        key={component.key}
        componentKey={component.key}
        isEdit={false}
        itemTypes={component.itemTypes}
        props={component.props}
      />
    );
  } else if (component.itemTypes === ItemTypes.VIDEO) {
    return (
      <Video
        key={component.key}
        componentKey={component.key}
        isEdit={false}
        itemTypes={component.itemTypes}
        props={component.props}
      />
    );
  }
};

const Layout = ({ props }) => {
  return (
    <div
      className="inner-section-component-layout"
      style={generateStyle(props.style)}
    >
      {props.children.length > 0
        ? props.children.map((child) => {
            return renderComponent(child);
          })
        : props.text}
    </div>
  );
};

export default Layout;
