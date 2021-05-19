import React, { useContext } from "react";
import { ItemTypes } from "../../../utils/ItemTypes";
import { PageBuilderContext } from "../../Pages/Pricing";
import { useDrop } from "react-dnd";

//css
import "./board.css";

const Board = () => {
  const pageBuilderContext = useContext(PageBuilderContext);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: [
        ItemTypes.HEADING,
        ItemTypes.IMAGE,
        ItemTypes.INNERSECTION,
        ItemTypes.TEXT_EDITOR,
      ],
      drop: (item, monitor) => {
        if (monitor.getClientOffset() != null) {
          console.log("add to board");
          pageBuilderContext.addComponentToBoard(monitor.getItemType());
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    []
  );

  console.log("render board");

  return (
    <>
      <div
        className={`board ${isOver && "board-isOver"} ${
          canDrop && "board-canDrop"
        }`}
        ref={drop}
      >
        {
          //eslint-disable-next-line
          pageBuilderContext.boardState.boardComponents.map((component) => {
            return pageBuilderContext.renderComponent(component);
          })
        }
      </div>
    </>
  );
};

export default Board;
