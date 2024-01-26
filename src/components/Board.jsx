import { createRef, useEffect, useRef, useState } from "react";
import BoardCell from "./BoardCell";
import { stagger, useAnimate } from "framer-motion";
// import { useContext, useEffect, useState } from "react";
// import { BoardContext } from "../board_context/BoardContextProvider";
// import { colors } from "../util/themeSettings";
// import BoardGuidance from "./BoardGuidance";

function Board({
  row,
  col,
  snakes = [],
  ladders = [],
  boardArray,
  showSuccessPath,
  successPath = [],
  settingMode,
}) {
  return (
    <div className="p-[5px] bg-primary">
      {Array.from({ length: row }, (_, idx) =>
        boardArray.slice(idx * col, (idx + 1) * col)
      ).map((rowArray, idx) => (
        <div
          key={`row-${idx}`}
          className={`flex ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
        >
          {rowArray.map((cell) => (
            <BoardCell
              key={cell.value}
              cellNumber={cell.value}
              colCount={col}
              action={cell.action}
              showSuccessPath={showSuccessPath}
              snakes={snakes}
              ladders={ladders}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
