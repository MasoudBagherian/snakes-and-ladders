import { useEffect, useState } from "react";
import SelectionBox from "../SelectionBox";
import BtnSecondary from "../layout/BtnSecondary";
import Label from "../layout/Label";
function getValidValues(row, col, snakes, ladders) {
  const allValues = Array.from({ length: row * col - 1 }, (_, idx) => idx + 1);
  const invalidValues = [];
  for (const snake of snakes) {
    invalidValues.push(snake.head);
    invalidValues.push(snake.tail);
  }
  for (const ladder of ladders) {
    invalidValues.push(ladder.top);
    invalidValues.push(ladder.bottom);
  }
  return allValues.filter((item) => !invalidValues.includes(item));
}
function AddSnakeItem({ row, col, addSnake, snakes, ladders, boardArray }) {
  // console.log("AddLadderItem: ", { boardArray });

  const validValues = getValidValues(row, col, snakes, ladders);
  const [snakeHead, setSnakeHead] = useState(null);
  const [snakeTail, setSnakeTail] = useState(null);

  const maxTail = snakeHead === null ? row * col - 2 : snakeHead - 1;
  function checkSnakeHead(headVal) {
    setSnakeHead(headVal);
    setSnakeTail(null);
  }
  function checkSnakeTail(tailVal) {
    setSnakeTail(tailVal);
  }
  function isSnakeValid() {
    return snakeHead !== null && snakeTail !== null;
  }
  function handleAddSnake() {
    addSnake(snakeHead, snakeTail);
    setSnakeHead(null);
    setSnakeTail(null);
  }
  useEffect(() => {
    setSnakeHead(null);
    setSnakeTail(null);
  }, [snakes.length, ladders.length]);
  return (
    <div
      className="relative z-[2]  flex flex-wrap   items-center mx-[-2rem]
     "
    >
      <div className="px-[2rem] py-[1rem]">
        <SelectionBox
          value={snakeHead}
          options={validValues.filter((item) => item > 10)}
          onOptionChange={checkSnakeHead}
        >
          <Label text="snake head" />
        </SelectionBox>
      </div>
      <div className="px-[2rem] py-[1rem]">
        <SelectionBox
          value={snakeTail}
          options={validValues.filter((item) => item <= maxTail)}
          onOptionChange={checkSnakeTail}
        >
          <Label text="snake tail" />
        </SelectionBox>
      </div>
      <div className="px-[2rem] py-[1rem] ml-auto">
        <BtnSecondary isDisabled={!isSnakeValid()} handleClick={handleAddSnake}>
          add a snake
        </BtnSecondary>
      </div>
    </div>
  );
}

export default AddSnakeItem;
