import { getStatePosition, mkStatesArray } from "./data";

const statesArray = mkStatesArray(5, 8);
const snakes = [
  { head: 13, tail: 4, name: "s1", color: "#FF9800" },
  { head: 15, tail: 6, name: "s2", color: "#E36414" },
  { head: 14, tail: 3, name: "s3", color: "#E26EE5" },
];
const ladders = [
  { bottom: 8, top: 31, name: "l1", color: "#647D87" },
  { bottom: 2, top: 12, name: "l2", color: "#6DA4AA" },
];
/** testing area */
// console.log({ statesArray });
// const res = getNeighbors(statesArray, 25);
const res = BFS(statesArray, snakes, ladders);
// --------------------------------------------
// const states = [1, 2];
// pushStates(states, [2, 16]);
// console.log({ states });
// --------------------------------------------
console.log(res);
/** end testing area */
export function getNeighbors(statesArray, state, snakes, ladders) {
  const { row, col } = getStatePosition(statesArray, state);
  const snake = snakes.find((item) => item.head === state);
  if (snake) {
    const snakeTail = statesArray.find((item) => item.value === snake.tail);
    return [snakeTail.value];
  }
  const ladder = ladders.find((item) => item.bottom === state);
  if (ladder) {
    const ladderTop = statesArray.find((item) => item.value === ladder.top);
    return [ladderTop.value];
  }
  return statesArray
    .filter(
      (item) =>
        (item.row === row && Math.abs(item.col - col) === 1) ||
        (item.col === col && Math.abs(item.row - row) === 1)
    )
    .map((item) => item.value);
}
function pushStates(queue, states) {
  for (const state of states) {
    queue.push(state);
  }
}
export function BFS(statesArray, snakes, ladders) {
  const goalState = Math.max(...statesArray.map((item) => item.value));
  let neighbors = [];
  // const queue = [1];
  const queue = [{ value: 1, parent: null }];
  const deletedStates = [];
  let k = 1;
  while (1) {
    const currentState = queue.shift();

    deletedStates.push(currentState);

    // if (currentState === goalState) {
    //   break;
    // }
    if (currentState.value === goalState) {
      break;
    }

    // neighbors = getNeighbors(statesArray, currentState, snakes, ladders)
    //   .filter((item) => !queue.includes(item) && !deletedStates.includes(item))
    //   .sort((a, b) => a - b);
    neighbors = getNeighbors(statesArray, currentState.value, snakes, ladders)
      .filter(
        (item) =>
          !queue.map((item) => item.value).includes(item) &&
          !deletedStates.map((item) => item.value).includes(item)
      )
      .sort((a, b) => a - b);
    // pushStates(queue, neighbors)
    pushStates(
      queue,
      neighbors.map((item) => ({ value: item, parent: currentState.value }))
    );

    // console.log("----------------------------");
    // console.log("neighbors", neighbors);
    // console.log("currentState", currentState);
    // console.log(
    //   "deletesStates",
    //   deletedStates.sort((a, b) => a - b)
    // );
    // console.log("queue", queue);
    // console.log("----------------------------");
    k++;
  }
  return deletedStates;
}
