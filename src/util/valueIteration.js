// import { defaults, mkStatesArray } from "./data";

import { getStatePosition } from "./data";

// const { ladders, snakes } = defaults;
const p = 0.7;
const gama = 0.1;
export const ACTIONS = {
  right: "right",
  longRight: "long-right",
  left: "left",
  longLeft: "long-left",
  up: "up",
  ladder: "ladder",
  snake: "snake",
};

/** testing area */
// const states = mkStatesArray(10, 10);

// const res = transition(states, 51, ACTIONS.longRight);

// const res = getNextStates(states,snakes, ladders 5, ACTIONS.longRight);
// const res = getSingleNextState(states, snakes, ladders,38, ACTIONS.up);
// const res = transition(states, snakes, ladders, 100, ACTIONS.right, 99);
// const res = reward(states, 6, ACTIONS.longRight, 8);
// const res = getNearestLadders(ladders, 54);
// const res = getBestActionToState(states,snakes, ladders, 4, 4);
// const res = getAllowedActions(states, snakes, ladders,46);
// const res = states
//   .filter((item, _, arr) =>
//     getAllowedActions(arr, snakes, ladders,item.value).includes(ACTIONS.longRight)
//   )
//   .map((item) => item.value)
//   .sort((a, b) => (a > b ? 1 : -1));
// const res = implementValueIteration(states, snakes, ladders);
// const res = getSuccessPath(states, snakes, ladders);
// console.log({ res });
/** end testing area */

function getStatesArraySize(statesArray) {
  const rowCount = Math.max(...statesArray.map((item) => item.row));
  const colCount = Math.max(...statesArray.map((item) => item.col));
  return { rowCount, colCount };
}
// function getStatePosition(statesArray, state) {
//   const statePos = statesArray.find((item) => item.value === state);
//   return { row: statePos.row, col: statePos.col };
// }
function getAllowedActions(statesArray, snakes, ladders, state) {
  const { colCount } = getStatesArraySize(statesArray);
  const { row: stateRow, col: stateCol } = getStatePosition(statesArray, state);
  const snakeState = snakes.find((item) => item.head === state);
  const ladderState = ladders.find((item) => item.bottom === state);

  if (snakeState) {
    return [ACTIONS.snake];
  }
  if (ladderState) {
    return [ACTIONS.ladder];
  }
  if (stateCol === 1) {
    if (stateRow === 1) {
      return [ACTIONS.right, ACTIONS.longRight];
    } else {
      return [ACTIONS.right, ACTIONS.longRight, ACTIONS.up];
    }
  }
  if (stateCol === colCount) {
    if (stateRow === 1) {
      return [ACTIONS.left, ACTIONS.longLeft];
    } else {
      return [ACTIONS.left, ACTIONS.longLeft, ACTIONS.up];
    }
  }
  if (stateCol === 2) {
    return [ACTIONS.left, ACTIONS.right, ACTIONS.longRight];
  }
  if (stateCol === colCount - 1) {
    return [ACTIONS.left, ACTIONS.right, ACTIONS.longLeft];
  }
  return [ACTIONS.left, ACTIONS.right, ACTIONS.longLeft, ACTIONS.longRight];
}
export function getNextStates(
  statesArray,
  snakes,
  ladders,
  currentState,
  action
) {
  const allowedActions = getAllowedActions(
    statesArray,
    snakes,
    ladders,
    currentState
  );
  const { row: currentStateRow, col: currentStateCol } = getStatePosition(
    statesArray,
    currentState
  );
  // // check if we are in snake head state or ladder bottom state
  const snakeState = snakes.find((item) => item.head === currentState);
  const ladderState = ladders.find((item) => item.bottom === currentState);
  if (snakeState && action === ACTIONS.snake) {
    return [snakeState.tail];
  }
  if (ladderState && action === ACTIONS.ladder) {
    return [ladderState.top];
  }
  if (
    (action === ACTIONS.right && allowedActions.includes(ACTIONS.right)) ||
    (action === ACTIONS.left && allowedActions.includes(ACTIONS.left))
  ) {
    return statesArray
      .filter(
        (item) =>
          item.row === currentStateRow &&
          Math.abs(item.col - currentStateCol) === 1
      )
      .map((item) => item.value);
  }
  if (
    (action === ACTIONS.longRight &&
      allowedActions.includes(ACTIONS.longRight)) ||
    (action === ACTIONS.longLeft && allowedActions.includes(ACTIONS.longLeft))
  ) {
    return statesArray
      .filter(
        (item) =>
          item.row === currentStateRow &&
          Math.abs(item.col - currentStateCol) === 2
      )
      .map((item) => item.value);
  }
  if (action === ACTIONS.up && allowedActions.includes(ACTIONS.up)) {
    return statesArray
      .filter(
        (item) =>
          item.col === currentStateCol &&
          Math.abs(item.row - currentStateRow) === 1
      )
      .map((item) => item.value);
  }
  return [];
}
function getSingleNextState(
  statesArray,
  snakes,
  ladders,
  currentState,
  action
) {
  const { row: currentStateRow, col: currentStateCol } = getStatePosition(
    statesArray,
    currentState
  );
  const allowedActions = getAllowedActions(
    statesArray,
    snakes,
    ladders,
    currentState
  );

  const nextStatesArray = getNextStates(
    statesArray,
    snakes,
    ladders,
    currentState,
    action
  );

  if (action === ACTIONS.up && allowedActions.includes(ACTIONS.up)) {
    return statesArray
      .filter(
        (item) =>
          item.col === currentStateCol && item.row === currentStateRow - 1
      )
      .map((item) => item.value)[0];
  }
  if (action === ACTIONS.right && allowedActions.includes(ACTIONS.right)) {
    return statesArray
      .filter(
        (item) =>
          item.row === currentStateRow && item.col === currentStateCol + 1
      )
      .map((item) => item.value)[0];
  }
  if (action === ACTIONS.left && allowedActions.includes(ACTIONS.left)) {
    return statesArray
      .filter(
        (item) =>
          item.row === currentStateRow && item.col === currentStateCol - 1
      )
      .map((item) => item.value)[0];
  }
  if (
    action === ACTIONS.longRight &&
    allowedActions.includes(ACTIONS.longRight)
  ) {
    return statesArray
      .filter(
        (item) =>
          item.row === currentStateRow && item.col === currentStateCol + 2
      )
      .map((item) => item.value)[0];
  }
  if (
    action === ACTIONS.longLeft &&
    allowedActions.includes(ACTIONS.longLeft)
  ) {
    return statesArray
      .filter(
        (item) =>
          item.row === currentStateRow && item.col === currentStateCol - 2
      )
      .map((item) => item.value)[0];
  }
  return null;
}

function getNextStateDetails(
  statesArray,
  snakes,
  ladders,
  currentState,
  action
) {
  // nextStatesDetails = {value, row, col}
  return getNextStates(statesArray, snakes, ladders, currentState, action).map(
    (item) => ({
      value: item,
      ...getStatePosition(statesArray, item),
    })
  );
}
function transition(
  statesArray,
  snakes,
  ladders,
  currentState,
  action,
  nextState
) {
  const { rowCount, colCount } = getStatesArraySize(statesArray);
  const { row: currentStateRow, col: currentStateCol } = getStatePosition(
    statesArray,
    currentState
  );
  const nextStates = getNextStates(
    statesArray,
    snakes,
    ladders,
    currentState,
    action
  );
  if (!nextStates.includes(nextState)) {
    // next state passed to this function is not in next states list
    return 0;
  }
  const nextStatesDetails = getNextStateDetails(
    statesArray,
    snakes,
    ladders,
    currentState,
    action
  );

  if (action === ACTIONS.snake) {
    // we are in snake head state
    return 1;
  }
  if (action === ACTIONS.ladder) {
    // we are in ladder bottom state
    return 1;
  }
  if (action === ACTIONS.right) {
    if (currentStateCol === 1) {
      return 1;
    } else {
      const { col: nextStateCol } = nextStatesDetails.find(
        (item) => nextState === item.value
      );
      if (currentStateCol < nextStateCol) {
        return p;
      } else {
        return 1 - p;
      }
    }
  }
  if (action === ACTIONS.longRight) {
    if (currentStateCol <= 2) {
      return 1;
    } else {
      const { col: nextStateCol } = nextStatesDetails.find(
        (item) => nextState === item.value
      );

      if (currentStateCol < nextStateCol) {
        return p;
      } else {
        return 1 - p;
      }
    }
  }

  if (action === ACTIONS.left) {
    if (currentStateCol === colCount) {
      return 1;
    } else {
      const { col: nextStateCol } = nextStatesDetails.find(
        (item) => nextState === item.value
      );
      if (currentStateCol > nextStateCol) {
        return p;
      } else {
        return 1 - p;
      }
    }
  }
  if (action === ACTIONS.longLeft) {
    if (currentStateCol > colCount - 2) {
      return 1;
    } else {
      const { col: nextStateCol } = nextStatesDetails.find(
        (item) => nextState === item.value
      );
      if (currentStateCol > nextStateCol) {
        return p;
      } else {
        return 1 - p;
      }
    }
  }

  if (action === ACTIONS.up) {
    if (currentStateCol === 1 || currentStateCol === colCount) {
      if (currentStateRow === rowCount) {
        return 1;
      } else {
        const { row: nextStateRow } = nextStatesDetails.find(
          (item) => nextState === item.value
        );
        if (currentStateRow > nextStateRow) {
          return p;
        } else {
          return 1 - p;
        }
      }
    } else {
      return 0;
    }
  }
}
function getBestActionToState(
  statesArray,
  snakes,
  ladders,
  currentState,
  goalState
) {
  const allowedActions = getAllowedActions(
    statesArray,
    snakes,
    ladders,
    currentState
  );
  const nextStatesDetails = allowedActions.map((action) => ({
    action,
    nextState: getSingleNextState(
      statesArray,
      snakes,
      ladders,
      currentState,
      action
    ),
  }));
  // console.log({ nextStatesDetails });
  if (allowedActions.includes(ACTIONS.ladder)) {
    return ACTIONS.ladder;
  }
  if (allowedActions.includes(ACTIONS.snake)) {
    return ACTIONS.snake;
  }
  let bestAction = null;
  let diffDetails = nextStatesDetails
    .map((item) => ({
      ...item,
      diff: goalState - item.nextState,
    }))
    .filter((item) =>
      currentState < goalState ? item.diff >= 0 : item.diff <= 0
    );
  if (currentState <= goalState) {
    diffDetails = [...diffDetails].filter((item) => item.diff >= 0);
    const minDiff = Math.min(...diffDetails.map((item) => item.diff));
    bestAction = diffDetails.find((item) => item.diff === minDiff).action;
  } else {
    diffDetails = [...diffDetails].filter((item) => item.diff <= 0);
    const maxDiff = Math.max(...diffDetails.map((item) => item.diff));
    bestAction = diffDetails.find((item) => item.diff === maxDiff).action;
  }
  // console.log({ diffDetails, goalState });
  return bestAction;
}
function reward(statesArray, snakes, ladders, currentState, action, nextState) {
  const goalState = Math.max(...statesArray.map((item) => item.value));
  const allowedActions = getAllowedActions(
    statesArray,
    snakes,
    ladders,
    currentState
  );
  const snakeHeads = snakes.map((item) => item.head);
  // const ladderBottoms = ladders
  //   .map((item) => item.bottom)
  //   .sort((a, b) => a - b);
  // const firstLadderBottom = Math.min(...ladderBottoms);
  // const lastLadderBottom = Math.max(...ladderBottoms);

  const sortedLadders = [...ladders]
    .sort((a, b) => a.bottom - b.bottom)
    .map((item) => ({ bottom: item.bottom, top: item.top }));
  const firstLadder = sortedLadders[0];
  const lastLadder = sortedLadders[sortedLadders.length - 1];

  const nextStatesArray = getNextStates(
    statesArray,
    snakes,
    ladders,
    currentState,
    action
  );
  if (!nextStatesArray.includes(nextState)) {
    return 0;
  }
  // next state is snake head state
  if (snakeHeads.includes(nextState)) {
    return -100;
  }

  const nearestLadders = getNearestLadders(ladders, currentState);
  // console.log({ nearestLadders, currentState });
  if (nearestLadders.length === 1) {
    const nearestLadder = nearestLadders[0];
    // currentState is before first ladder
    if (nearestLadder.bottom === firstLadder.bottom) {
      const bestAction = getBestActionToState(
        statesArray,
        snakes,
        ladders,
        currentState,
        firstLadder.bottom
      );
      if (action === bestAction) {
        // console.log({ bestAction });
        return 100;
      }
      // currentState is after last ladder
    } else if (nearestLadder.bottom === lastLadder.bottom) {
      const bestAction = getBestActionToState(
        statesArray,
        snakes,
        ladders,
        currentState,
        goalState
      );
      if (action === bestAction) {
        // console.log({ bestAction });
        return 100;
      }
    }
  } else {
    // current state is between to middle ladders

    // console.log({ nearestLadders });
    const distanceDetails = nearestLadders.map((item) => ({
      ...item,
      diff: Math.abs(currentState - item.bottom),
    }));
    // difference of distances between current state and bottom of two middle ladders
    // console.log({ distanceDetails });
    const diffDistance = Math.abs(
      distanceDetails[0].diff - distanceDetails[1].diff
    );
    let bestAction;
    if (diffDistance < 10) {
      // go to bottom of ladder with higher top state
      const ladderWithHighterTop = [...distanceDetails].sort(
        (a, b) => a.top - b.top
      )[1];
      bestAction = getBestActionToState(
        statesArray,
        snakes,
        ladders,
        currentState,
        ladderWithHighterTop.bottom
      );
    } else {
      // go to the nearest ladder bottom state
      const LadderWithNearestBottom = [...distanceDetails].sort(
        (a, b) => a.diff - b.diff
      )[0];
      bestAction = getBestActionToState(
        statesArray,
        snakes,
        ladders,
        currentState,
        LadderWithNearestBottom.bottom
      );
    }
    // console.log({ diffDistance, distanceDetails });
    if (action === bestAction) {
      return 100;
    }
  }

  if (action === ACTIONS.up) {
    if (nextState > currentState) {
      return 1;
    } else {
      return -1;
    }
  } else {
    return nextState - currentState;
  }
}

function getNearestLadders(ladders, currentState) {
  const sortedLadders = [...ladders]
    .sort((a, b) => a.bottom - b.bottom)
    .map((item) => ({ bottom: item.bottom, top: item.top }));
  const firstLadder = sortedLadders[0];
  const lastLadder = sortedLadders[sortedLadders.length - 1];
  if (currentState <= firstLadder.bottom) {
    return [firstLadder];
  } else if (currentState < lastLadder.bottom) {
    const ladderBottomIdx = sortedLadders.findIndex(
      (item) => item.bottom > currentState
    );
    return [sortedLadders[ladderBottomIdx - 1], sortedLadders[ladderBottomIdx]];
  } else {
    return [lastLadder];
  }
}
export function implementValueIteration(statesArray, snakes, ladders) {
  let newValues = statesArray.map((item) => 0);
  let QstatesArray = statesArray.map((item) => null);
  const goalState = statesArray[0].value;
  let k = 0;
  while (1) {
    k++;
    let oldValues = [...newValues];
    for (let currentState = 1; currentState < goalState; currentState++) {
      // console.log({ currentState });
      const stateIdx = statesArray.findIndex(
        (item) => item.value === currentState
      );
      const stateActions = getAllowedActions(
        statesArray,
        snakes,
        ladders,
        currentState
      );
      const QstateValues = [];
      for (const action of stateActions) {
        const nextStatesArray = getNextStates(
          statesArray,
          snakes,
          ladders,
          currentState,
          action
        );

        let Qstate = 0;
        for (const nextState of nextStatesArray) {
          // Qstate(currentState, action)
          const t = transition(
            statesArray,
            snakes,
            ladders,
            currentState,
            action,
            nextState
          );
          const r = reward(
            statesArray,
            snakes,
            ladders,
            currentState,
            action,
            nextState
          );
          Qstate = Qstate + t * (r + gama * oldValues[stateIdx]);
        }
        QstateValues.push({ action, Qstate });
      }

      const { max, action } = getMaxQstate(QstateValues);
      newValues[stateIdx] = max;
      QstatesArray[stateIdx] = action;
    }

    if (isConverged(newValues, oldValues)) {
      break;
    }
  }
  // console.log("newValues", newValues);
  // console.log(statesArray.map((item) => item.value));
  // console.log("QStatesArray", QstatesArray);
  // console.log({ k });
  return statesArray.map((item, idx) => ({
    ...item,
    action: QstatesArray[idx],
  }));
}
function isConverged(newValues, oldValues) {
  for (let i = 0; i < newValues.length; i++) {
    if (Math.abs(newValues[i] - oldValues[i]) >= 0.000001) {
      return false;
    }
  }
  return true;
}
function getMaxQstate(QstateValues) {
  const max = Math.max(...QstateValues.map((item) => item.Qstate));
  const optimalAction = QstateValues.find((item) => item.Qstate === max).action;
  return { max: max, action: optimalAction };
}
export function getSuccessPath(statesArray, snakes, ladders) {
  let currentState = 1;
  const goalState = Math.max(...statesArray.map((item) => item.value));

  const pathStates = [];
  const actionDetails = implementValueIteration(statesArray, snakes, ladders);
  let k = 1;
  while (1) {
    pathStates.push(currentState);
    if (currentState === goalState) {
      break;
    }
    if (k === goalState) {
      return pathStates;
    }
    const { row, col } = getStatePosition(statesArray, currentState);
    const { action } = actionDetails.find(
      (item) => item.value === currentState
    );
    if (action === ACTIONS.ladder) {
      const { top } = ladders.find((item) => item.bottom === currentState);
      currentState = top;
    }
    if (action === ACTIONS.snake) {
      const { tail } = snakes.find((item) => item.head === currentState);
      currentState = tail;
    }
    if (action === ACTIONS.right) {
      const { value } = actionDetails.find(
        (item) => item.row === row && item.col === col + 1
      );
      currentState = value;
    }
    if (action === ACTIONS.longRight) {
      const { value } = actionDetails.find(
        (item) => item.row === row && item.col === col + 2
      );
      currentState = value;
    }
    if (action === ACTIONS.left) {
      const { value } = actionDetails.find(
        (item) => item.row === row && item.col === col - 1
      );
      currentState = value;
    }
    if (action === ACTIONS.longLeft) {
      const { value } = actionDetails.find(
        (item) => item.row === row && item.col === col - 2
      );
      currentState = value;
    }
    if (action === ACTIONS.up) {
      const { value } = actionDetails.find(
        (item) => item.col === col && item.row === row - 1
      );
      currentState = value;
    }
    k++;
  }
  return pathStates;
}
