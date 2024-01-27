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

import Modal from "../components/layout/Modal";
import { useNavigate } from "react-router-dom";

function FindPath() {
  const navigate = useNavigate();
  const [scope, animate] = useAnimate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { row, col, snakes, ladders } = useContext(BoardContext);

  const [showSuccessPath, setShowSuccessPath] = useState(false);
  function closeModal(e) {
    e.stopPropagation();
    // setShowAlternativePath(true);
    setTimeout(() => {
      navigate("/search-board");
    }, 500);
    setModalIsOpen(false);
  }
  const statesArray = useMemo(() => mkStatesArray(row, col), [row, col]);
  const boardArray = useMemo(
    () => implementValueIteration(statesArray, snakes, ladders),
    [row, col, snakes, ladders]
  );
  let successPath = useMemo(
    () => getSuccessPath(statesArray, snakes, ladders),
    [row, col, snakes, ladders]
  );

  const isSuccessPathInvalid = !successPath.includes(row * col);

  const successPathCells = successPath.map((item) => `#cell-success-${item}`);
  // console.log("successPathCells", successPathCells);
  function hideAllOverlayCells() {
    animate(".cell-overlay", { opacity: 0, scale: 0 }, { duration: 0.01 });
  }
  function handleClickBtn() {
    setShowSuccessPath((prev) => !prev);
  }

  async function showOverlayCells(overlayCells) {
    setIsAnimating(true);
    for (const cell of overlayCells) {
      await animate(cell, { opacity: 1, scale: 1 }, { duration: 0.5 });
    }
    setIsAnimating(false);
  }
  async function hideOverlayCells(overlayCells) {
    setIsAnimating(true);
    for (const cell of overlayCells.reverse()) {
      await animate(cell, { opacity: 0, scale: 0 }, { duration: 0.5 });
    }
    setIsAnimating(false);
  }
  useEffect(() => {
    if (showSuccessPath) {
      showOverlayCells(successPathCells).then(() => {
        if (isSuccessPathInvalid) {
          setModalIsOpen(true);
        }
      });
    } else {
      hideOverlayCells(successPathCells);
    }
  }, [showSuccessPath]);
  useEffect(() => {
    setShowSuccessPath(false);
    hideAllOverlayCells();
  }, [row, col, snakes, ladders]);

  return (
    <>
      <Settings isBtnDisabled={isAnimating} />
      <Modal isOpen={modalIsOpen} handleClick={closeModal} />
      <Header isBtnDisabled={isAnimating} />
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
