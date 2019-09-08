import React from "react";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import TableRow from "./Row";

const TableScoreBoard = props => {
  const { header, entries } = props;
  return (
    <Container>
      <Table responsive>
        <thead>
          <TableRow value={header} isHeader></TableRow>
        </thead>
        <tbody>
          {entries.map(entry => (
            <TableRow value={entry}></TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TableScoreBoard;
