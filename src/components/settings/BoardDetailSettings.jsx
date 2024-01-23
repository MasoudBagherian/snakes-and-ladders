import React from "react";
import Board from "../Board";
import SettinsHeader from "./SettinsHeader";
import AddSnakeItem from "./AddSnakeItem";
import AddLadderItem from "./AddLadderItem";
import SnakesList from "./SnakesList";
import LaddersList from "./LaddersList";
export const boardItemTypes = {
  SNAKE: "snake",
  LADDER: "ladder",
};

function BoardDetailSettings({
  row,
  col,
  boardArray,
  snakes,
  ladders,
  addSnake,
  addLadder,
  deleteSnake,
  deleteLadder,
}) {
  return (
    <>
      <SettinsHeader text="set snakes and ladders position(at least 2 snakes and 2 ladders)" />
      <div className="">
        <div className="mb-[2rem] max-w-[50rem] flex flex-col ">
          <div className="border-b-[1px] border-b-gray-400 py-[1rem]">
            <AddSnakeItem
              row={row}
              col={col}
              addSnake={addSnake}
              snakes={snakes}
              ladders={ladders}
              boardArray={boardArray}
            />
          </div>
          <div className="border-b-[1px] border-b-gray-400 py-[1rem]">
            <AddLadderItem
              row={row}
              col={col}
              addLadder={addLadder}
              snakes={snakes}
              ladders={ladders}
              boardArray={boardArray}
            />
          </div>
        </div>
        <SnakesList snakes={snakes} deleteSnake={deleteSnake} />
        <LaddersList ladders={ladders} deleteLadder={deleteLadder} />
        <div className="overflow-x-auto">
          <div className="max-w-[40rem] min-w-[30rem] mt-[2rem] mb-[4rem]">
            <Board
              row={row}
              col={col}
              boardArray={boardArray}
              snakes={snakes}
              ladders={ladders}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardDetailSettings;
