import { ACTIONS } from "../util/valueIteration";
import { FiChevronUp as ActionUp } from "react-icons/fi";
import { FiChevronLeft as ActionLeft } from "react-icons/fi";
import { FiChevronRight as ActionRight } from "react-icons/fi";
import { FiChevronsLeft as ActionLongLeft } from "react-icons/fi";
import { FiChevronsRight as ActionLongRight } from "react-icons/fi";
import { motion } from "framer-motion";
function BoardCell({
  cellNumber,
  colCount,
  action,
  snakes,
  ladders,
  showSuccessPath,
}) {
  function showAction() {
    if (action === ACTIONS.right) {
      return (
        <span
          className="absolute left-[3px] bottom-[3px] w-[2rem] h-[2rem] board-action"
          // initial={{ scale: 0, opacity: 0 }}
        >
          <ActionRight className="w-full h-full" />
        </span>
      );
    }
    if (action === ACTIONS.longRight) {
      return (
        <span
          className="absolute left-[3px] bottom-[3px] w-[2rem] h-[2rem] board-action"
          // initial={{ scale: 0, opacity: 0 }}
        >
          <ActionLongRight className="w-full h-full" />
        </span>
      );
    }
    if (action === ACTIONS.left) {
      return (
        <span
          className="absolute left-[3px] bottom-[3px] w-[2rem] h-[2rem] board-action"
          // initial={{ scale: 0, opacity: 0 }}
        >
          <ActionLeft className="w-full h-full" />
        </span>
      );
    }
    if (action === ACTIONS.longLeft) {
      return (
        <span
          className="absolute left-[3px] bottom-[3px] w-[2rem] h-[2rem] board-action"
          // initial={{ scale: 0, opacity: 0 }}
        >
          <ActionLongLeft className="w-full h-full" />
        </span>
      );
    }
    if (action === ACTIONS.up) {
      return (
        <span
          className="absolute left-[3px] bottom-[3px] w-[2rem] h-[2rem] board-action"
          // initial={{ scale: 0, opacity: 0 }}
        >
          <ActionUp className="w-full h-full" />
        </span>
      );
    }
    return null;
  }
  function showLadder() {
    const idx = ladders.findIndex(
      (item) => item.top === cellNumber || item.bottom === cellNumber
    );
    if (idx === -1) {
      return null;
    } else {
      const { name, color } = ladders[idx];
      return (
        <span
          // initial={{ scale: 0, opacity: 0 }}
          style={{ backgroundColor: color }}
          className="leading-[2rem] text-center absolute top-[3px] box-content p-[2px] rounded-[100px] w-[2rem] font-[500]  h-[2rem]  text-white left-[3px] text-[1.2rem]  uppercase tracking-[1px] board-badge"
        >
          {name}
        </span>
      );
    }
  }
  function showSnake() {
    const idx = snakes.findIndex(
      (item) => item.head === cellNumber || item.tail === cellNumber
    );
    if (idx === -1) {
      return null;
    } else {
      const { name, color } = snakes[idx];
      return (
        <span
          // initial={{ scale: 0, opacity: 0 }}
          style={{ backgroundColor: color }}
          className="leading-[2rem] text-center absolute top-[3px] box-content p-[2px] rounded-[100px] w-[2rem] font-[500]  h-[2rem]  text-white right-[3px] text-[1.2rem]  uppercase tracking-[1px] board-badge"
        >
          {name}
        </span>
      );
    }
  }
  return (
    <div
      style={{
        width: `${100 / colCount}%`,
        paddingTop: `${100 / colCount}%`,
        height: 0,
      }}
      // initial={{ scale: 0, opacity: 0 }}
      className={`relative ${
        cellNumber % 2 === 0
          ? "bg-primary-light text-white"
          : "bg-white text-primary-light"
      } border-[1px] border-primary board-cell`}
    >
      <div className="absolute w-full h-full top-0 left-0">
        <span className="absolute bottom-[3px] right-[3px] text-[1.2rem] font-bold">
          {cellNumber}
        </span>
        {showLadder()}
        {showSnake()}

        {showSuccessPath ? showAction() : null}

        <motion.div
          className="absolute top-[-2px] bottom-[-2px] left-[-2px] 
          right-[-2px] bg-success/80 cell-overlay cell-overlay-success z-[2]"
          id={`cell-success-${cellNumber}`}
          initial={{ opacity: 0, scale: 0 }}
        ></motion.div>
        <motion.div
          className="absolute top-[-2px] bottom-[-2px] left-[-2px] 
          right-[-2px] bg-danger/60 cell-overlay z-[1]"
          id={`cell-danger-${cellNumber}`}
          initial={{ opacity: 0, scale: 0 }}
        ></motion.div>
      </div>
    </div>
  );
}

export default BoardCell;
