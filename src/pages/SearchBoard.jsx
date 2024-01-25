import { useContext, useMemo, useState } from "react";
import { BoardContext } from "../board_context/BoardContextProvider";
import Board from "../components/Board";
import { mkStatesArray } from "../util/data";
import SelectionBox from "../components/SelectionBox";
import Header from "../components/layout/Header";
import Settings from "../components/settings/Settings";
import { getBFSPath, implementDFS } from "../util/search";
import BtnPrimary from "../components/layout/BtnPrimary";
const methods = {
  BFS: "BFS method",
  DFS: "DFS method",
};

function SearchBoard() {
  const { row, col, snakes, ladders } = useContext(BoardContext);
  const [method, setMethod] = useState(methods.BFS);
  const [showSuccessPath, setShowSuccessPath] = useState(false);
  const statesArray = useMemo(() => mkStatesArray(row, col), [row, col]);
  const successPath =
    method === methods.BFS
      ? getBFSPath(statesArray, snakes, ladders)
      : implementDFS(statesArray, snakes, ladders);
  function toggleShowSuccessPath() {
    setShowSuccessPath((prev) => !prev);
  }
  return (
    <>
      <Settings />
      <Header />
      <div className="my-[2rem]">
        <SelectionBox
          options={[methods.BFS, methods.DFS]}
          value={method}
          onOptionChange={setMethod}
        >
          <h2 className="mb-[1rem] text-[2rem]">select a method</h2>
        </SelectionBox>
      </div>
      <BtnPrimary handleClick={toggleShowSuccessPath}>
        {showSuccessPath
          ? "reset"
          : `click to show ${method === methods.BFS ? "BFS" : "DFS"} path`}
      </BtnPrimary>
      <div className="overflow-x-auto">
        <div className="max-w-[60rem] min-w-[50rem] pb-[2rem] mb-[2rem]">
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
