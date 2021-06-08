import React, { useState } from "react";
import ButtonRipple from "../../ButtonRipple";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WebstiteKind from "./WebsiteKind";
import WebsiteName from "./WebsiteName";
import WebsiteTheme from "./WebsiteTheme";

//css
import "./gettingstarted.css";

const GettingStarted = () => {
  const [gettingStartedIndex, setGettingStartedIndex] = useState(0);
  const [websiteKind, setWebsiteKind] = useState(null);
  const [websiteTheme, setWebsiteTheme] = useState(null);
  const [websiteName, setWebsiteName] = useState(null);

  const handleClickButtonBack = () => {
    setGettingStartedIndex((prevState) => {
      return prevState - 1;
    });
  };

  const handleClickSetWebsiteKind = (params) => {
    setWebsiteKind(params);
    setGettingStartedIndex(1);
  };

  const handleClickSetWebsiteTheme = (params) => {
    setWebsiteTheme(params);
    setGettingStartedIndex(2);
  };

  const handleClickSetWebsiteName = (params) => {
    setWebsiteName(params);
  };

  return (
    <div className="navbar-margin getting-started">
      {gettingStartedIndex === 0 ? (
        <WebstiteKind handleClickSetWebsiteKind={handleClickSetWebsiteKind} />
      ) : gettingStartedIndex === 1 ? (
        <>
          <WebsiteTheme
            handleClickSetWebsiteTheme={handleClickSetWebsiteTheme}
          />
          <ButtonRipple
            className="button-back"
            fa={<FontAwesomeIcon icon={faArrowLeft} />}
            iconIsLeft={true}
            onClick={handleClickButtonBack}
            text="back"
          />
        </>
      ) : gettingStartedIndex === 2 ? (
        <>
          <WebsiteName handleClickSetWebsiteName={handleClickSetWebsiteName} />
          <ButtonRipple
            className="button-back"
            fa={<FontAwesomeIcon icon={faArrowLeft} />}
            iconIsLeft={true}
            onClick={handleClickButtonBack}
            text="back"
          />
        </>
      ) : (
        <div>3</div>
      )}
    </div>
  );
};

export default GettingStarted;
