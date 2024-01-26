import { motion } from "framer-motion";
import { useContext, useMemo, useState } from "react";
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
  const [currentStepIdx, setCurrentStepIdx] = useState(1);
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
          <BtnPrimary
            className="ml-auto"
            handleClick={applySettings}
            isDisabled={!isApplyAllowed()}
          >
            apply settings
          </BtnPrimary>
        ) : null}
      </div>
    </motion.div>
  );
}

export default Menu;
