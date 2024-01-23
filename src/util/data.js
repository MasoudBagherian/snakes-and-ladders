export function getStatePosition(statesArray, state) {
  const statePos = statesArray.find((item) => item.value === state);
  return { row: statePos.row, col: statePos.col };
}
export function mkStatesArray(rowCount, colCount) {
  const cellCount = rowCount * colCount;
  let firstNumber = cellCount;
  let statesArray = [];
  for (let i = 1; i <= rowCount; i++) {
    let currentRow;
    if (i % 2 === 1) {
      currentRow = Array.from({ length: colCount }, (_, idx) => ({
        value: firstNumber - idx,
        row: i,
        col: idx + 1,
      }));
    } else {
      currentRow = Array.from({ length: colCount }, (_, idx) => ({
        value: firstNumber - idx,
        row: i,
        col: colCount - idx,
      }));
    }

    statesArray = [...statesArray, ...currentRow];
    firstNumber = firstNumber - colCount;
  }
  return statesArray;
}
export const boardColors = {
  snakes: ["#FF9800", "#E36414", "#E26EE5", "#141010", "#F70776", "#0A1D56"],
  ladders: ["#647D87", "#6DA4AA", "#FF004D", "#7E2553", "#7D0A0A", "#304D30"],
};
export function getRandomColor(collection) {
  const randomIdx = Math.floor(Math.random() * collection.length);
  return collection[randomIdx];
}
export const defaults = {
  row: 10,
  col: 10,
  ladders: [
    { bottom: 4, top: 56, name: "l1", color: "#647D87" },
    { bottom: 12, top: 50, name: "l2", color: "#6DA4AA" },
    { bottom: 14, top: 55, name: "l3", color: "#FF004D" },
    { bottom: 22, top: 58, name: "l4", color: "#7E2553" },
    { bottom: 41, top: 79, name: "l5", color: "#7D0A0A" },
    { bottom: 54, top: 88, name: "l6", color: "#304D30" },
  ],
  snakes: [
    { head: 37, tail: 3, name: "s1", color: "#FF9800" },
    { head: 25, tail: 10, name: "s2", color: "#E36414" },
    { head: 47, tail: 16, name: "s3", color: "#E26EE5" },
    { head: 75, tail: 32, name: "s4", color: "#141010" },
    { head: 94, tail: 71, name: "s5", color: "#F70776" },
    { head: 96, tail: 42, name: "s6", color: "#0A1D56" },
  ],
};
