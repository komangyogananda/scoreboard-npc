import React from "react";
import find from "lodash/find";

import changeCase from "change-case";
import TableRow from "../../shared/Table/Row";
import TableCol from "../../shared/Table/Column";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class UserRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contestant: {},
      isLoading: true
    };
  }

  componentDidMount = () => {
    const { team_id: teamId } = this.props.value;
    fetch(`http://18.139.27.220:8000/senior/peserta/team/${teamId}`)
      .then(response => response.json())
      .then(result => {
        this.setState({
          contestant: result,
          isLoading: false
        });
      });
  };

  componentDidUpdate = () => {
    const { team_id: teamId } = this.props.value;
    fetch(`http://18.139.27.220:8000/senior/peserta/team/${teamId}`)
      .then(response => response.json())
      .then(result => {
        this.setState({
          contestant: result,
          isLoading: false
        });
      });
  };

  render() {
    const { contestant, isLoading } = this.state;
    const {
      value: { rank, score, problems },
      firstAcList,
      setSelectedContestant
    } = this.props;

    const values = [];
    problems.map(problem => {
      values.push({ value: problem, type: "problem" });
    });

    return (
      !isLoading && (
        <TableRow>
          <TableCol>
            <span style={{ color: "white" }}>{rank}</span>
          </TableCol>
          <TableCol>
            <Container
              onClick={() => {
                console.log("ayy");
                setSelectedContestant(contestant);
              }}
              style={{ marginHorizontal: 24, cursor: "pointer" }}
            >
              <Row>
                <Col md="auto">
                  <img
                    width={64}
                    height={64}
                    src={`http://18.139.27.220:8000/senior/peserta/logo/${contestant.organization_id}`}
                    alt={contestant.affiliation}
                  />
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <h5>{contestant.name}</h5>
                  <span>{contestant.affiliation}</span>
                </Col>
              </Row>
            </Container>
          </TableCol>
          <TableCol>
            <Container>
              <h5 style={{ fontWeight: "bold" }}>{score.num_solved}</h5>
              <div>{score.total_time}</div>
            </Container>
          </TableCol>
          {values.map((val, idx) => {
            const {
              value: { solved, num_judged, num_pending, time }
            } = val;
            const wrong = !solved && num_judged > 0;
            const pending = !solved && num_pending > 0;
            var x = firstAcList[idx].filter(val => {
              return val == contestant.id;
            });
            const firstSolve = solved && x.length > 0;

            return (
              <TableCol
                senior
                solved={solved}
                wrong={wrong}
                firstSolve={!!firstSolve}
                pending={pending}
              >
                <Container>
                  <h4 style={{ height: 24, color: "white" }}>{time}</h4>
                  {!!num_judged && (
                    <h6 style={{ color: "white" }}>
                      {`${num_judged}`}
                      {!!num_pending && <span>{` + ${num_pending}`}</span>}
                      {num_judged + num_pending > 1 ? " tries" : " try"}
                    </h6>
                  )}
                </Container>
              </TableCol>
            );
          })}
        </TableRow>
      )
    );
  }
}

export default UserRow;
