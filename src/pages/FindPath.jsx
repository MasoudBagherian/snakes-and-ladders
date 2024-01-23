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

function FindPath() {
  const { row, col, snakes, ladders } = useContext(BoardContext);

  const [showSuccessPath, setShowSuccessPath] = useState(false);

  const statesArray = useMemo(() => mkStatesArray(row, col), [row, col]);
  const boardArray = useMemo(
    () => implementValueIteration(statesArray, snakes, ladders),
    [row, col, snakes, ladders]
  );
  const successPath = useMemo(
    () => getSuccessPath(statesArray, snakes, ladders),
    [snakes, ladders]
  );
  function handleClickBtn() {
    setShowSuccessPath((prev) => !prev);
  }

  useEffect(() => {
    setShowSuccessPath(false);
  }, [row, col, snakes, ladders]);
  return (
    <>
      <Settings />
      {/* header goes here */}
      <Header />
      <h1 className="my-[4rem] text-center text-[3rem] font-bold uppercase">
        snakes & ladders
      </h1>
      <BoardGuidance snakes={snakes} ladders={ladders} />
      <BtnPrimary handleClick={handleClickBtn}>
        {showSuccessPath ? "reset" : "click to show success path"}
      </BtnPrimary>
      <div className="overflow-x-auto ">
        <div className="min-w-[50rem] max-w-[70rem] mb-[4rem]">
          <Board
            row={row}
            col={col}
            snakes={snakes}
            ladders={ladders}
            boardArray={boardArray}
            successPath={successPath}
            // successPath={[]}
            showSuccessPath={showSuccessPath}
          />
        </div>
      </div>
    </>
  );
}

export default FindPath;
