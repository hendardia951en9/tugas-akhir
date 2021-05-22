import React from "react";
import ReactPlayer from "react-player";
import { generateStyle } from "../../../utils/generateStyle";

const Video = ({ props }) => {
  return (
    <div className="video-somponent-wrapper" style={generateStyle(props.style)}>
      <div onClick={props.onClick} className="click-me">
        click me to edit
      </div>
      <ReactPlayer
        controls={props.controls === "true"}
        loop={props.loop === "true"}
        muted={props.muted === "true"}
        playing={props.playing === "true"}
        url={props.source}
      />
    </div>
  );
};

export default Video;
