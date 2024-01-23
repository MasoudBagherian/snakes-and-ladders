import { useContext, useMemo, useState } from "react";
import { BoardContext } from "../board_context/BoardContextProvider";
import Board from "../components/Board";
import { mkStatesArray } from "../util/data";
import { implementValueIteration } from "../util/valueIteration";
import SelectionBox from "../components/SelectionBox";
import Header from "../components/layout/Header";
import Settings from "../components/settings/Settings";
import { BFS } from "../util/search";
const methods = {
  BFS: "BFS method",
  DFS: "DFS method",
};
function SearchBoard() {
  const { row, col, snakes, ladders } = useContext(BoardContext);
  const statesArray = useMemo(() => mkStatesArray(row, col), [row, col]);
  const boardArray = useMemo(
    () => implementValueIteration(statesArray, snakes, ladders),
    [row, col, snakes, ladders]
  );
  const [method, setMethod] = useState(methods.BFS);
  // console.log(BFS(statesArray, snakes, ladders));
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
      <div className="overflow-x-auto">
        <div className="max-w-[60rem] min-w-[50rem] py-[2rem] mb-[2rem]">
          <Board
            row={row}
            col={col}
            boardArray={boardArray}
            snakes={snakes}
            ladders={ladders}
          />
        </div>
      </div>
    </>
  );
}

export default SearchBoard;
