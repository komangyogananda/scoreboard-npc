import React from "react";

import Container from "react-bootstrap/Container";
import TableRow from "../shared/Table/Row";
import TableCol from "../shared/Table/Column";
import UserRow from "./UserRow";
import Table from "react-bootstrap/Table";
import { type, secret, contestJid } from "../constants";

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
    const apiResult = {
      event_id: "string",
      time: "string",
      contest_time: "string",
      state: {
        started: "2019-09-08T11:48:28.093Z",
        ended: "2019-09-08T11:48:28.093Z",
        frozen: "2019-09-08T11:48:28.093Z",
        thawed: "2019-09-08T11:48:28.093Z",
        finalized: "2019-09-08T11:48:28.093Z",
        end_of_updates: "2019-09-08T11:48:28.093Z"
      },
      rows: [
        {
          rank: 0,
          team_id: "string",
          score: {
            num_solved: 0,
            total_time: 0
          },
          problems: [
            {
              label: "string",
              problem_id: "string",
              num_judged: 0,
              num_pending: 0,
              solved: true,
              time: 0
            }
          ]
        }
      ]
    };

    this.setState({
      data: apiResult.rows
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
          <ReactLoading type="spin" color="#fff"></ReactLoading>
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
