import React from "react";
import { ItemTypes } from "../../../utils/ItemTypes";
import { useDrag } from "react-dnd";

const Widget = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.HEADING,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className={"widget " + (isDragging && "widget-dragged")} ref={drag}>
      {ItemTypes.HEADING}
    </div>
  );
};

export default Widget;
