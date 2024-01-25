import { createRef, useRef } from "react";
import BoardCell from "./BoardCell";
// import { motion, stagger, transform, useAnimate } from "framer-motion";
// import { useContext, useEffect, useState } from "react";
// import { BoardContext } from "../board_context/BoardContextProvider";
// import { colors } from "../util/themeSettings";
// import BoardGuidance from "./BoardGuidance";
function mkBoard(boardArray, row, col) {
  for (let i = 0; i < row; i++) {
    const currentRow = boardArray.slice(i * 10, (i + 1) * 10); // 0->10, 10->20
  }
}
function Board({
  row,
  col,
  snakes = [],
  ladders = [],
  boardArray,
  showSuccessPath,
  successPath = [],
}) {
  // const [scope, animate] = useAnimate();
  // async function handleBoardAnimation() {
  //   await animate(
  //     ".board-cell",
  //     { scale: 1, opacity: 1 },
  //     { delay: stagger(0.1) }
  //   );
  //   await animate(
  //     ".board-badge",
  //     { scale: 1, opacity: 1 },
  //     { delay: stagger(0.1, { from: "last" }) }
  //   );
  //   await animate(
  //     scope.current,
  //     { backgroundColor: colors.primary },
  //     { duration: 0.5 }
  //   );
  //   setIsBtnDisabled(false);
  // }
  // async function handleShowingSuccessPath() {
  //   setIsBtnDisabled((prev) => !prev);
  //   await animate(
  //     ".board-action",
  //     { opacity: 1, scale: 1 },
  //     { delay: stagger(0.1, { from: "last" }) }
  //   );
  //   await animate(
  //     ".board-overlay",
  //     { opacity: 1, scale: 1 },
  //     { delay: stagger(0.3, { from: "last" }) }
  //   );
  //   setIsBtnDisabled((prev) => !prev);
  // }

  // useEffect(() => {
  //   handleBoardAnimation();
  // }, []);
  // useEffect(() => {
  //   if (showSuccessPath) {
  //     handleShowingSuccessPath();
  //   }
  // }, [showSuccessPath]);
  console.log({ successPath });
  return (
    <div
      className="p-[5px] bg-primary"
      // ref={scope}
      // initial={{ backgroundColor: "transparent" }}
    >
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
              isInSuccessPath={successPath.includes(cell.value)}
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
