import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { generateFormData } from "../../../utils/generateFormData";
import { ItemTypes } from "../../../utils/ItemTypes";
import { useParams } from "react-router-dom";

//components
import Button from "../../PageBuilder/Button";
import Divider from "../../PageBuilder/Divider";
import Heading from "../../PageBuilder/Heading";
import Icon from "../../PageBuilder/Icon";
import Image from "../../PageBuilder/Image";
import ImageGallery from "../../PageBuilder/ImageGallery";
import InnerSection from "../../PageBuilder/InnerSection";
import MapComponent from "../../PageBuilder/MapComponent";
import Spacer from "../../PageBuilder/Spacer";
import StarRating from "../../PageBuilder/StarRating";
import TextEditor from "../../PageBuilder/TextEditor";
import Video from "../../PageBuilder/Video";

const UserWebsite = () => {
  const appContext = useContext(AppContext);
  const { websiteID } = useParams();
  const [components, setComponents] = useState();

  const fetchUserWebsite = async () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      websiteID: websiteID,
    });

    axios
      .post(`${process.env.REACT_APP_SITE_URL}/getuserwebsite`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);

        if (res.data.status === 200) {
          setComponents(JSON.parse(res.data.result));
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

  const renderComponent = (component, isEdit) => {
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
    } else if (component.itemTypes === ItemTypes.INNERSECTION) {
      return (
        <InnerSection
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

  useEffect(() => {
    fetchUserWebsite();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {components &&
        components.map((test) => {
          return renderComponent(test);
        })}
    </div>
  );
};

export default UserWebsite;
