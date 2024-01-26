import {
  getSuccessPath,
  implementValueIteration,
} from "../util/valueIteration";
import Board from "../components/Board";
import { mkStatesArray } from "../util/data";
import Settings from "../components/settings/Settings";
import BoardGuidance from "../components/BoardGuidance";
import BtnPrimary from "../components/layout/BtnPrimary";
import { useContext, useEffect, useMemo, useState } from "react";
import { BoardContext } from "../board_context/BoardContextProvider";
import Header from "../components/layout/Header";
import { useAnimate } from "framer-motion";

function FindPath() {
  const [scope, animate] = useAnimate();
  const [isAnimating, setIsAnimating] = useState(false);
  const { row, col, snakes, ladders } = useContext(BoardContext);

  const [showSuccessPath, setShowSuccessPath] = useState(false);

  const statesArray = useMemo(() => mkStatesArray(row, col), [row, col]);
  const boardArray = useMemo(
    () => implementValueIteration(statesArray, snakes, ladders),
    [row, col, snakes, ladders]
  );
  const successPath = useMemo(
    () => getSuccessPath(statesArray, snakes, ladders),
    [row, col, snakes, ladders]
  );
  // console.log({ successPath });
  const successPathCells = successPath.map((item) => `#cell-success-${item}`);
  function hideAllOverlayCells() {
    animate(".cell-overlay", { opacity: 0, scale: 0 }, { duration: 0.01 });
  }
  function handleClickBtn() {
    setShowSuccessPath((prev) => !prev);
  }
  async function showSuccessCells() {
    setIsAnimating(true);
    for (const cell of successPathCells) {
      await animate(cell, { opacity: 1, scale: 1 }, { duration: 0.5 });
    }
    setIsAnimating(false);
  }
  async function hideSuccessCells() {
    setIsAnimating(true);
    for (const cell of successPathCells.reverse()) {
      await animate(cell, { opacity: 0, scale: 0 }, { duration: 0.5 });
    }
    setIsAnimating(false);
  }
  useEffect(() => {
    if (showSuccessPath) {
      showSuccessCells();
    } else {
      hideSuccessCells();
    }
  }, [showSuccessPath]);
  useEffect(() => {
    setShowSuccessPath(false);
    hideAllOverlayCells();
  }, [row, col, snakes, ladders]);
  return (
    <>
      <Settings />
      <Header isAnimating={isAnimating} />
      <h1 className="my-[4rem] text-center text-[3rem] font-bold uppercase">
        snakes & ladders
      </h1>
      <BoardGuidance snakes={snakes} ladders={ladders} />
      <BtnPrimary handleClick={handleClickBtn} isDisabled={isAnimating}>
        {showSuccessPath ? "reset" : "click to show success path"}
      </BtnPrimary>
      <div className="overflow-x-auto ">
        <div ref={scope} className="min-w-[50rem] max-w-[70rem] mb-[4rem]">
          <Board
            row={row}
            col={col}
            snakes={snakes}
            ladders={ladders}
            boardArray={boardArray}
            successPath={successPath}
            showSuccessPath={showSuccessPath}
            settingMode={false}
          />
        </div>
      </div>
    </>
  );
}

export default FindPath;
