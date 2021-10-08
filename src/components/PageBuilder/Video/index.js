import React, { useContext } from "react";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateStyle } from "../../../utils/generateStyle";
import { PageBuilderContext } from "../../Pages/WebGenerator";
import ReactPlayer from "react-player";

//component
import ButtonRipple from "../../ButtonRipple";

//css
import "./video.css";

const Video = ({ componentKey, isEdit, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <div
      className={`video-component-wrapper 
      ${props.style.width.unit === "%" && "isPercent"}`}
      style={generateStyle(props.style)}
    >
      {isEdit && (
        <ButtonRipple
          className="video-component-edit-button"
          fa={<FontAwesomeIcon icon={faEdit} />}
          onClick={(e) => {
            pageBuilderContext.handleClickPageBuilderComponent(
              itemTypes,
              componentKey
            );
          }}
        />
      )}
      <ReactPlayer
        className="video-component"
        controls={props.controls === "true"}
        height={`${props.style.height.value}${props.style.height.unit}`}
        loop={props.loop === "true"}
        muted={props.muted === "true"}
        playing={props.playing === "true"}
        url={props.source}
        width={`${props.style.width.value}${props.style.width.unit}`}
      />
    </div>
  );
};

export default Video;
