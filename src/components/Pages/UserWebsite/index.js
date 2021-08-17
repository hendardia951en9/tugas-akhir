import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import axios from "axios";
import { generateFormData } from "../../../utils/generateFormData";
import { ItemTypes } from "../../../utils/ItemTypes";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

//components
import Button from "../../PageBuilder/Button";
import Divider from "../../PageBuilder/Divider";
import Heading from "../../PageBuilder/Heading";
import Icon from "../../PageBuilder/Icon";
import Image from "../../PageBuilder/Image";
import ImageGallery from "../../PageBuilder/ImageGallery";
import UserInnerSection from "../../PageBuilder/UserInnerSection";
import MapComponent from "../../PageBuilder/MapComponent";
import Spacer from "../../PageBuilder/Spacer";
import StarRating from "../../PageBuilder/StarRating";
import TextEditor from "../../PageBuilder/TextEditor";
import UserFooter from "../../PageBuilder/UserFooter";
import UserNavbar from "../../PageBuilder/UserNavbar";
import Video from "../../PageBuilder/Video";

//css
import "./userwebsite.css";

const UserWebsite = () => {
  const appContext = useContext(AppContext);
  const location = useLocation();
  const [siteFooterComponents, setSiteFooterComponents] = useState();
  const [siteNavbarComponents, setSiteNavbarComponents] = useState();
  const [sitePageComponents, setSitePageComponents] = useState();
  const { userEmail } = useParams();
  const { websiteName } = useParams();
  const { websitePage } = useParams();

  const fetchUserWebsite = async () => {
    appContext.setIsLoading(true);

    const formData = generateFormData({
      userEmail: userEmail,
      websiteName: websiteName,
      websitePage: websitePage === undefined ? "home" : websitePage,
    });

    axios
      .post(`${process.env.REACT_APP_SITE_API_URL}/getuserwebsite`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        //success
        appContext.setIsLoading(false);

        if (res.data.status === 200) {
          setSiteFooterComponents(JSON.parse(res.data.result.site_footer_json));
          setSiteNavbarComponents(JSON.parse(res.data.result.site_navbar_json));
          setSitePageComponents(JSON.parse(res.data.result.site_page_json));
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
    } else if (component.itemTypes === ItemTypes.INNERSECTION) {
      return <UserInnerSection key={component.key} props={component.props} />;
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
  }, [location]);

  return (
    <>
      {siteNavbarComponents && (
        <UserNavbar isEdit={false} props={siteNavbarComponents.props} />
      )}

      <div className="site-page-container">
        {sitePageComponents &&
          sitePageComponents.map((component) => {
            return renderComponent(component);
          })}
      </div>

      {siteFooterComponents && (
        <UserFooter isEdit={false} props={siteFooterComponents.props} />
      )}
    </>
  );
};

export default UserWebsite;
