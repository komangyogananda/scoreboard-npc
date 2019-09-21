import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import ModalUser from "./ModalUser";
import TableRow from "../shared/Table/Row";
import TableCol from "../shared/Table/Column";
import UserRow from "./UserRow";
import Table from "react-bootstrap/Table";

import ReactLoading from "react-loading";

class SeniorScoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeInfo: {},
      rows: [],
      problems: [],
      header: {},
      isLoading: true,
      contestant: [],
      success: false,
      modalShow: false,
      selectedContestant: {
        members: ""
      }
    };
  }

  setModalShow = x => {
    this.setState({
      modalShow: x
    });
  };

  setSelectedContestant = contestant => {
    this.setState({
      selectedContestant: contestant,
      modalShow: true
    });
  };

  fetchApi = () => {
    fetch("http://18.139.27.220:8000/senior/scoreboard")
      .then(response => {
        return response.json();
      })
      .then(result => {
        const rows = result.rows;
        const header = [
          { value: "Rank", type: "header" },
          { value: "Team", type: "header" },
          { value: "Score", type: "header" }
        ];
        result.rows[0].problems.forEach(problem => {
          header.push({ value: problem.label, type: "problem" });
        });

        const timeInfo = result.state;
        this.setState({
          rows,
          header,
          timeInfo,
          problems: result.rows[0].problems,
          isLoading: false,
          success: true
        });
      })
      .catch(response => {
        this.setState({
          isLoading: false
        });
      });
  };

  componentDidMount = () => {
    this.fetchApi();
    this.callApi = setInterval(() => this.fetchApi(), 10000);
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

  checkFirstAc = () => {
    const { rows, problems } = this.state;
    const minAc = [];
    const idMinAc = [];
    problems.forEach(problem => {
      minAc.push(1000000000);
      idMinAc.push([]);
    });
    rows.forEach(row => {
      const problems = row.problems;
      for (let i = 0; i < minAc.length; i++) {
        if (!!problems[i].time) {
          if (problems[i].time < minAc[i]) {
            minAc[i] = problems[i].time;
            idMinAc[i] = [];
            idMinAc[i].push(row.team_id);
          } else if (problems[i].time === minAc[i]) {
            idMinAc[i].push(row.team_id);
          }
        }
      }
    });
    return idMinAc;
  };

  render() {
    const {
      isLoading,
      rows,
      success,
      modalShow,
      selectedContestant
    } = this.state;
    const firstAcList = this.checkFirstAc();
    return (
      <>
        <ModalUser
          show={modalShow}
          contestant={selectedContestant}
          onHide={() => this.setModalShow(false)}
        ></ModalUser>
        <Container>
          <h2
            style={{ color: "white", marginBottom: 12, fontWeight: "bold" }}
          >{`Penyisihan`}</h2>

          {isLoading ? (
            <ReactLoading type="spin" color="#fff"></ReactLoading>
          ) : success ? (
            <Container>
              <Table striped variant="dark" responsive>
                <thead>{this.renderHeader()}</thead>
                <tbody>
                  {rows.map(row => (
                    <UserRow
                      value={row}
                      firstAcList={firstAcList}
                      setSelectedContestant={this.setSelectedContestant}
                    ></UserRow>
                  ))}
                </tbody>
              </Table>
            </Container>
          ) : (
            <h2
              style={{ color: "white", marginBottom: 36, fontWeight: "bold" }}
            >
              Contest Belum Dimulai
            </h2>
          )}
        </Container>
      </>
    );
  }
}

const s = {};

export default SeniorScoreboard;
