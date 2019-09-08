import React from "react";

import TableColumn from "../Column";

const TableRow = props => {
  const { style, values } = props;

  return (
    <tr style={{ ...style, ...s.row }}>
      {values.map(value => (
        <TableColumn value={value.value} type={value.type}></TableColumn>
      ))}
    </tr>
  );
};

const s = {
  row: {
    marginHorizontal: 24
  }
};

export default TableRow;
