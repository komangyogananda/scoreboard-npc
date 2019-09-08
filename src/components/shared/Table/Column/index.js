import React from "react";

import changeCase from "change-case";
import ProgressBar from "react-bootstrap/ProgressBar";
import { isNumber } from "util";

const Column = props => {
  const { style, value, type } = props;

  let accepted = {};
  if (type === "problem" && value === 100) {
    accepted = { backgroundColor: "#42e342" };
  }
  let bold = {};
  if (type === "name") {
    bold = {
      fontSize: 18
    };
  }
  return (
    <td style={{ ...style, ...s.column, ...accepted }}>
      <span style={{ color: "white", ...bold }}>
        {changeCase.isUpperCase(value) ? value : changeCase.titleCase(value)}
      </span>
      {type === "problem" && isNumber(value) && value < 100 ? (
        <ProgressBar>
          <ProgressBar
            striped
            max={100}
            variant="success"
            now={value}
            key={1}
          />
          <ProgressBar variant="danger" max={101} now={101 - value} key={2} />
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
