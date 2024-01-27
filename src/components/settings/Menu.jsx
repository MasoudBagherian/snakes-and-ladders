import { motion, AnimatePresence } from "framer-motion";
import { useContext, useMemo, useRef, useState } from "react";
import {
  boardColors,
  defaults,
  getRandomColor,
  mkStatesArray,
} from "../../util/data";
import BtnPrimary from "../layout/BtnPrimary";
import BoardSizeSettings from "./BoardSizeSettings";
import BoardDetailSettings from "./BoardDetailSettings";
import { BoardContext } from "../../board_context/BoardContextProvider";

export function mkNumericList(min, max) {
  return Array.from({ length: max - min + 1 }, (_, idx) => min + idx);
}
function Menu({ onToggleMenu }) {
  const { setRow, setCol, setSnakes, setLadders } = useContext(BoardContext);
  const [tempRow, setTempRow] = useState(5);
  const [tempCol, setTempCol] = useState(5);
  const [tempSnakes, setTempSnakes] = useState([]);
  const [tempLadders, setTempLadders] = useState([]);
  const [isAlertShow, setIsAlertShow] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(1);
  const menuContainerRef = useRef();
  const boardArray = useMemo(
    () => mkStatesArray(tempRow, tempCol),
    [tempRow, tempCol]
  );
  function addSnakeItem(head, tail) {
    setTempSnakes((prev) => [
      ...prev,
      {
        head,
        tail,
        name:
          prev.length === 0
            ? "s1"
            : `s${+prev[prev.length - 1].name.split("")[1] + 1}`,
        color: getRandomColor(boardColors.snakes),
      },
    ]);
  }
  function deleteSnakeItem(name) {
    setTempSnakes((prev) => prev.filter((item) => item.name !== name));
  }
  function addLadderItem(top, bottom) {
    setTempLadders((prev) => [
      ...prev,
      {
        top,
        bottom,
        name:
          prev.length === 0
            ? "l1"
            : `l${+prev[prev.length - 1].name.split("")[1] + 1}`,
        color: getRandomColor(boardColors.ladders),
      },
    ]);
  }
  function deleteLadderItem(name) {
    setTempLadders((prev) => prev.filter((item) => item.name !== name));
  }
  function isApplyAllowed() {
    return tempSnakes.length >= 2 && tempLadders.length >= 2;
  }
  function applySettings() {
    if (!isApplyAllowed()) {
      return;
    }
    onToggleMenu();
    setRow(tempRow);
    setCol(tempCol);
    setSnakes(tempSnakes);
    setLadders(tempLadders);
  }
  function backToDefaults() {
    onToggleMenu();
    setRow(defaults.row);
    setCol(defaults.col);
    setSnakes(defaults.snakes);
    setLadders(defaults.ladders);
  }
  function showSettingStep(index) {
    if (index === 1) {
      return (
        <BoardSizeSettings
          row={tempRow}
          col={tempCol}
          updateRow={setTempRow}
          updateCol={setTempCol}
          boardArray={boardArray}
          containerRef={menuContainerRef}
        />
      );
    }
    if (index === 2) {
      return (
        <BoardDetailSettings
          row={tempRow}
          col={tempCol}
          boardArray={boardArray}
          addSnake={addSnakeItem}
          addLadder={addLadderItem}
          deleteSnake={deleteSnakeItem}
          deleteLadder={deleteLadderItem}
          snakes={tempSnakes}
          ladders={tempLadders}
          containerRef={menuContainerRef}
        />
      );
    }
  }
  function changeStep() {
    setTempLadders([]);
    setTempSnakes([]);
    if (currentStepIdx === 1) {
      setCurrentStepIdx(2);
    } else {
      setCurrentStepIdx(1);
    }
  }
  return (
    <motion.div
      ref={menuContainerRef}
      className="fixed z-[10] pb-[4rem] px-[2rem] top-0 left-0 w-full h-full bg-white overflow-y-auto"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
    >
      <div className="flex justify-end py-[2rem]">
        <BtnPrimary handleClick={backToDefaults}>back to defaults</BtnPrimary>
      </div>
      {showSettingStep(currentStepIdx)}
      <div className="flex flex-wrap max-w-[50rem]">
        <BtnPrimary handleClick={changeStep}>
          {currentStepIdx === 1 ? "next" : "back"}
        </BtnPrimary>
        {currentStepIdx === 2 ? (
          <button
            className={`btn-primary ml-auto relative ${
              !isApplyAllowed()
                ? " bg-gray-400 border-gray-500 text-white cursor-not-allowed"
                : "hover:bg-white hover:text-primary"
            }`}
            onClick={applySettings}
            onMouseEnter={() => setIsAlertShow(true)}
            onMouseLeave={() => setIsAlertShow(false)}
          >
            apply settings
            <AnimatePresence>
              {!isApplyAllowed() && isAlertShow ? (
                <motion.span
                  className="min-w-[18rem] mt-[15px] rounded-[5px] p-[3px] text-[1.2rem] absolute top-[100%] left-[50%] bg-danger/80 text-white  before:absolute before:w-0 before:h-0 before:border-[10px] before:border-b-danger/80 before:border-t-transparent before:border-l-transparent before:border-r-transparent before:left-[50%] before:translate-x-[-50%] before:bottom-[100%]"
                  initial={{ opacity: 0, y: 50, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, y: 50, x: "-50%" }}
                >
                  At least 2 snakes & 2 ladders needed
                </motion.span>
              ) : null}
            </AnimatePresence>
          </button>
        ) : null}
      </div>
    </motion.div>
  );
}

export default Menu;
