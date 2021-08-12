import React, { useContext } from "react";
import { ItemTypes } from "../../../utils/ItemTypes";
import { PageBuilderContext } from "../../Pages/WebGenerator";
import { useDrop } from "react-dnd";
import UserNavbar from "../UserNavbar";
import UserFooter from "../UserFooter";

//css
import "./board.css";

const Board = ({ boardComponents, boardNavbar, boardFooter }) => {
  const pageBuilderContext = useContext(PageBuilderContext);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: [
        ItemTypes.BUTTON,
        ItemTypes.DIVIDER,
        ItemTypes.HEADING,
        ItemTypes.ICON,
        ItemTypes.IMAGE,
        ItemTypes.IMAGE_GALLERY,
        ItemTypes.INNERSECTION,
        ItemTypes.MAP_COMPONENT,
        ItemTypes.SPACER,
        ItemTypes.STAR_RATING,
        ItemTypes.TEXT_EDITOR,
        ItemTypes.VIDEO,
      ],
      drop: (item, monitor) => {
        if (monitor.getClientOffset() != null) {
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

  return (
    <>
      {boardNavbar && (
        <UserNavbar
          componentKey={boardNavbar.itemTypes}
          isEdit={true}
          itemTypes={boardNavbar.itemTypes}
          props={boardNavbar.props}
        />
      )}
      <div
        className={`board ${isOver && "board-isOver"} ${
          canDrop && "board-canDrop"
        }`}
        ref={drop}
      >
        {
          //eslint-disable-next-line
          boardComponents &&
            boardComponents.map((component) => {
              return pageBuilderContext.renderComponent(component);
            })
        }
      </div>

      {boardFooter && (
        <UserFooter
          componentKey={boardFooter.itemTypes}
          isEdit={true}
          itemTypes={boardFooter.itemTypes}
          props={boardFooter.props}
        />
      )}
    </>
  );
};

export default Board;
