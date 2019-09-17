import React from "react";

import ProgressBar from "react-bootstrap/ProgressBar";
import { isNumber } from "util";

const Column = props => {
  const {
    style,
    solved,
    firstSolve,
    wrong,
    solvedPartial,
    senior,
    pending
  } = props;

  let background = {};
  if (solved) {
    background = { backgroundColor: "#42e342" };
    if (senior) {
      background = { backgroundColor: "#60E760" };
    }
  }
  if (wrong) {
    background = { backgroundColor: "#D40F37" };
    if (senior) {
      background = { backgroundColor: "#E87272" };
    }
  }
  if (pending) {
    background = { backgroundColor: "#6666FF" };
  }
  if (firstSolve) {
    background = { backgroundColor: "#1DAA1D" };
  }

  return (
    <td style={{ ...style, ...s.column, ...background }}>
      {props.children}
      {solvedPartial !== null &&
      isNumber(solvedPartial) &&
      solvedPartial < 100 &&
      solvedPartial > 0 ? (
        <ProgressBar>
          <ProgressBar
            striped
            max={100}
            variant="success"
            now={solvedPartial}
            key={1}
          />
          <ProgressBar
            variant="danger"
            max={101}
            now={101 - solvedPartial}
            key={2}
          />
        </ProgressBar>
      ) : null}
    </td>
  );
};

const s = {
  column: {
    padding: 12,
    margin: 0,
    border: "2px solid white"
  }
};

export default Column;
