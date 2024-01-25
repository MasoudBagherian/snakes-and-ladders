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
function AddLadderItem({ row, col, addLadder, snakes, ladders, boardArray }) {
  const validValues = getValidValues(row, col, snakes, ladders);
  const [ladderTop, setLadderTop] = useState(null);
  const [ladderBottom, setLadderBottom] = useState(null);

  const maxBottom = ladderTop === null ? row * col - 2 : ladderTop - 1;
  function checkLadderTop(topVal) {
    setLadderTop(topVal);
    setLadderBottom(null);
  }
  function checkLadderBottom(bottomVal) {
    setLadderBottom(bottomVal);
  }
  function isLadderValid() {
    return ladderTop !== null && ladderBottom !== null;
  }
  function handleAddLadder() {
    addLadder(ladderTop, ladderBottom);
    setLadderTop(null);
    setLadderBottom(null);
  }
  useEffect(() => {
    setLadderTop(null);
    setLadderBottom(null);
  }, [snakes.length, ladders.length]);
  return (
    <div className="relative z-[1] flex flex-wrap items-center mx-[-2rem]">
      <div className="px-[2rem] py-[1rem]">
        <SelectionBox
          value={ladderTop}
          options={validValues.filter((item) => item > 10)}
          onOptionChange={checkLadderTop}
        >
          <Label text="ladder top" />
        </SelectionBox>
      </div>
      <div className="px-[2rem] py-[1rem]">
        <SelectionBox
          value={ladderBottom}
          options={validValues.filter((item) => item <= maxBottom)}
          onOptionChange={checkLadderBottom}
        >
          <Label text="ladder bottom" />
        </SelectionBox>
      </div>
      <div className="px-[2rem] py-[1rem] ml-auto">
        <BtnSecondary
          isDisabled={!isLadderValid()}
          handleClick={handleAddLadder}
        >
          add a ladder
        </BtnSecondary>
      </div>
    </div>
  );
}

export default AddLadderItem;
