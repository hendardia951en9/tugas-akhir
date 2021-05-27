import React, { useContext } from "react";
import ReactPlayer from "react-player";
import { generateStyle } from "../../../utils/generateStyle";
import { PageBuilderContext } from "../../Pages/Pricing";

//css
import "./video.css";

const Video = ({ componentKey, itemTypes, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  return (
    <div className="video-component-wrapper" style={generateStyle(props.style)}>
      <ReactPlayer
        className="video-component"
        controls={props.controls === "true"}
        height={`${props.style.height.value}${props.style.height.unit}`}
        loop={props.loop === "true"}
        muted={props.muted === "true"}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            pageBuilderContext.handleClick(itemTypes, componentKey);
          }
        }}
        playing={props.playing === "true"}
        url={props.source}
        width={`${props.style.width.value}${props.style.width.unit}`}
      />
    </div>
  );
};

export default Video;
