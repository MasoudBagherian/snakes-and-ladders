import { useContext, useEffect, useMemo, useState } from "react";
import { BoardContext } from "../board_context/BoardContextProvider";
import Board from "../components/Board";
import { mkStatesArray } from "../util/data";
import SelectionBox from "../components/SelectionBox";
import Header from "../components/layout/Header";
import Settings from "../components/settings/Settings";
import { getBFSPath, implementBFS, implementDFS } from "../util/search";
import BtnPrimary from "../components/layout/BtnPrimary";
import { useAnimate } from "framer-motion";
const methods = {
  BFS: "BFS method",
  DFS: "DFS method",
};

function SearchBoard() {
  const [scope, animate] = useAnimate();
  const { row, col, snakes, ladders } = useContext(BoardContext);
  const [isAnimating, setIsAnimating] = useState(false);
  const [method, setMethod] = useState(methods.BFS);
  const [showSuccessPath, setShowSuccessPath] = useState(false);
  const statesArray = useMemo(() => mkStatesArray(row, col), [row, col]);
  const successPath =
    method === methods.BFS
      ? getBFSPath(statesArray, snakes, ladders)
      : implementDFS(statesArray, snakes, ladders).successPath;
  function toggleShowSuccessPath() {
    setShowSuccessPath((prev) => !prev);
  }
  function hideAllOverlayCells() {
    animate(".cell-overlay", { opacity: 0, scale: 0 }, { duration: 0.01 });
  }
  const methodPath =
    method === methods.BFS
      ? implementBFS(statesArray, snakes, ladders).map((item) => item.value)
      : implementDFS(statesArray, snakes, ladders).methodPath;
  const methodPathCells = methodPath.map((item) => `#cell-danger-${item}`);
  const successPathCells = successPath.map((item) => `#cell-success-${item}`);
  console.log({ successPath });
  console.log({ methodPath });
  async function showSuccessCells() {
    for (const cell of successPathCells) {
      await animate(cell, { opacity: 1, scale: 1 }, { duration: 0.1 });
    }

    animate(
      ".cell-overlay-success",
      { opacity: 0, scale: 0 },
      { duration: 0.5, repeat: Infinity, repeatType: "mirror" }
    );
  }
  async function hideSuccessCells() {
    for (const cell of successPathCells.reverse()) {
      await animate(cell, { opacity: 0, scale: 0 }, { duration: 0.1 });
    }
  }

  async function showMethodCells() {
    for (const cell of methodPathCells) {
      await animate(cell, { opacity: 1, scale: 1 }, { duration: 0.1 });
    }
  }

  async function showPathCells() {
    setIsAnimating(true);
    await showMethodCells();
    await showSuccessCells();
    setIsAnimating(false);
  }

  useEffect(() => {
    if (showSuccessPath) {
      showPathCells();
    } else {
      hideAllOverlayCells();
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
      <div className="my-[2rem]">
        <SelectionBox
          options={[methods.BFS, methods.DFS]}
          value={method}
          onOptionChange={setMethod}
          isDisabled={isAnimating}
        >
          <h2 className="mb-[1rem] text-[2rem]">select a method</h2>
        </SelectionBox>
      </div>
      <BtnPrimary handleClick={toggleShowSuccessPath} isDisabled={isAnimating}>
        {showSuccessPath
          ? "reset"
          : `click to show ${method === methods.BFS ? "BFS" : "DFS"} path`}
      </BtnPrimary>
      <div className="overflow-x-auto">
        <div
          ref={scope}
          className="max-w-[60rem] min-w-[50rem] pb-[2rem] mb-[2rem]"
        >
          <Board
            row={row}
            col={col}
            boardArray={statesArray}
            successPath={successPath}
            showSuccessPath={showSuccessPath}
            snakes={snakes}
            ladders={ladders}
          />
        </div>
      </div>
    </>
  );
}

export default SearchBoard;
