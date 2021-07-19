import React from "react";
import DOMTreeElement from "./domtreeelement";

import "./domtree.css";

const DOMTree = ({ components }) => {
  return (
    <>
      {components.length > 0
        ? components.map((component) => {
            return (
              <DOMTreeElement
                componentKey={component.key}
                itemTypes={component.itemTypes}
                key={component.key}
                props={component.props}
              />
            );
          })
        : ""}
    </>
  );
};

export default DOMTree;
