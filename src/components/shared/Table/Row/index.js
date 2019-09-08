import React from "react";

import TableColumn from "../Column";

const TableRow = props => {
  const { style } = props;

  return <tr style={{ ...style, ...s.row }}>{props.children}</tr>;
};

const s = {
  row: {
    marginHorizontal: 24
  }
};

export default TableRow;
