import React from "react";
import ButtonRipple from "../../../ButtonRipple";

//css
import "./websitetheme.css";

const WebsiteTheme = ({ handleClickSetWebsiteTheme }) => {
  return (
    <div className="website-theme">
      <h3>choose how you want to create your website</h3>
      <section>
        <div>
          <h1>create your website with a themes</h1>
          <p>
            start with a template and make it your own, with easy drag and drop.
          </p>
          <ButtonRipple
            onClick={() => handleClickSetWebsiteTheme("theme")}
            text="edit a theme"
          />
        </div>
        <div className="or">or</div>
        <div>
          <h1>create your website with the editor</h1>
          <p>start your website from zero, with easy drag and drop.</p>
          <ButtonRipple
            onClick={() => handleClickSetWebsiteTheme("zero")}
            text="start now"
          />
        </div>
      </section>
    </div>
  );
};

export default WebsiteTheme;
