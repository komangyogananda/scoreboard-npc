import React from "react";

import Container from "react-bootstrap/Container";
import TableRow from "../shared/Table/Row";
import TableCol from "../shared/Table/Column";
import UserRow from "./UserRow";
import Table from "react-bootstrap/Table";
import { seniorContestId } from "../constants";

import ReactLoading from "react-loading";

class SeniorScoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true,
      status: 400,
      contestant: []
    };
  }

  componentDidMount = () => {
    fetch(
      `http://122.248.32.181/domjudge/api/v4/contests/${seniorContestId}/scoreboard?public=true`,
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(result => {
        console.log(
          "TCL: SeniorScoreboard -> componentDidMount -> result",
          result
        );
      });
  };

  renderHeader = () => {
    const { header } = this.state;
    return (
      <TableRow>
        {header.map(headerVal => {
          return (
            <TableCol>
              <strong>{headerVal.value}</strong>
            </TableCol>
          );
        })}
      </TableRow>
    );
  };

  render() {
    const { isLoading, data } = this.state;
    return (
      <Container>
        <h2
          style={{ color: "white", marginBottom: 36, fontWeight: "bold" }}
        >{`Penyisihan`}</h2>

        {isLoading ? (
          <h1>Belum tersedia</h1>
        ) : (
          <>
            <Table striped variant="dark" responsive>
              <thead>{this.renderHeader()}</thead>
              <tbody>
                {data.map(contestant => (
                  <UserRow value={contestant}></UserRow>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    );
  }
}

export default SeniorScoreboard;
