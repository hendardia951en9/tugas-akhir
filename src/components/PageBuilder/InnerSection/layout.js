import React, { useContext } from "react";
import { generateStyle } from "../../../utils/generateStyle";
import { ItemTypes } from "../../../utils/ItemTypes";
import { PageBuilderContext } from "../../Pages/Pricing";
import { useDrop } from "react-dnd";

//css
import "./innersection.css";

const Layout = ({ id, props }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: [
        ItemTypes.MAP_COMPONENT,
        ItemTypes.HEADING,
        ItemTypes.IMAGE,
        ItemTypes.TEXT_EDITOR,
        ItemTypes.VIDEO,
      ],
      drop: (item, monitor) => {
        console.log("add to inner");
        if (monitor.getClientOffset() != null) {
          pageBuilderContext.addComponentToInnerSectionLayout(
            monitor.getItemType(),
            id
          );
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    []
  );

  return (
    <div
      className={`inner-section-component-layout ${
        isOver && "inner-section-component-layout-isOver"
      } ${canDrop && "inner-section-component-layout-canDrop"}`}
      onClick={props.onClick}
      ref={drop}
      style={generateStyle(props.style)}
    >
      {props.children.length > 0
        ? props.children.map((child) => {
            return pageBuilderContext.renderComponent(child);
          })
        : props.text}
    </div>
  );
};

export default Layout;
