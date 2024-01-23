import { createContext, useState } from "react";
import { defaults } from "../util/data";

export const BoardContext = createContext({
  row: 10,
  col: 10,
  snakes: [],
  ladders: [],
  setRow: () => {},
  setCol: () => {},
  setSnakes: () => {},
  setLadders: () => {},
});
function BoardContextProvider({ children }) {
  const [row, setRow] = useState(defaults.row);
  const [col, setCol] = useState(defaults.col);
  const [snakes, setSnakes] = useState(defaults.snakes);
  const [ladders, setLadders] = useState(defaults.ladders);

  return (
    <BoardContext.Provider
      value={{
        row,
        col,
        snakes,
        ladders,
        setRow,
        setCol,
        setSnakes,
        setLadders,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export default BoardContextProvider;
