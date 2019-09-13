import React from "react";

import Container from "react-bootstrap/Container";
import TableRow from "../shared/Table/Row";
import TableCol from "../shared/Table/Column";
import UserRow from "./UserRow";
import Table from "react-bootstrap/Table";
import { type, secret, contestJid } from "../constants";

import ReactLoading from "react-loading";

class JuniorScoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true,
      status: 400,
      contestant: [],
      success: false
    };
  }

  componentDidMount = () => {
    fetch(
      "http://junior.npc.portal-schematics2019.com/api/contests/scoreboards/get",
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `type=${type.official}&contestJid=${contestJid}&secret=${secret}`
      }
    )
      .then(response => {
        console.log(
          "TCL: JuniorScoreboard -> componentDidMount -> response.json()",
          response.json()
        );
        response.json();
      })
      .then(result => {
        console.log(
          "TCL: JuniorScoreboard -> componentDidMount -> result",
          result
        );
        const header = [
          { value: "Rank", type: "header" },
          { value: "Name", type: "header" },
          { value: "Total Scores", type: "header" }
        ];
        result.scoreboard.config.problemAliases.map(problem => {
          header.push({ value: problem });
        });
        const data = result.scoreboard.content.entries;

        this.setState({
          isLoading: false,
          data,
          header
        });
      })
      .catch(response => {
        this.setState({
          isLoading: false
        });
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
    const { isLoading, data, success } = this.state;
    return (
      <Container>
        <h2
          style={{ color: "white", marginBottom: 36, fontWeight: "bold" }}
        >{`Penyisihan`}</h2>

        {isLoading ? (
          <ReactLoading type="spin" color="#fff"></ReactLoading>
        ) : success ? (
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
        ) : (
          <h2 style={{ color: "white", marginBottom: 36, fontWeight: "bold" }}>
            Contest Belum Tersedia
          </h2>
        )}
      </Container>
    );
  }
}

export default JuniorScoreboard;
