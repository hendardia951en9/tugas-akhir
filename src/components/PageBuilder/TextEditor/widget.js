import React from "react";
import { ItemTypes } from "../../../utils/ItemTypes";
import { useDrag } from "react-dnd";

const Widget = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TEXT_EDITOR,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className={"widget " + (isDragging && "widget-dragged")} ref={drag}>
      {ItemTypes.TEXT_EDITOR}
    </div>
  );
};

export default Widget;
