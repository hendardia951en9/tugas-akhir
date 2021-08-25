import React from "react";
import { ItemTypes } from "../../../utils/ItemTypes";
import { useDrag } from "react-dnd";

const Widget = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.IMAGE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className={"widget " + (isDragging && "widget-dragged")} ref={drag}>
      <img src="/assets/images/page_builder/image_widget.png" alt="" />
    </div>
  );
};

export default Widget;
