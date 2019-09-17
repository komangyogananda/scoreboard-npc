import React from "react";
import find from "lodash";

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
          contestant: result
        });
      });
  };

  render() {
    const { contestant } = this.state;
    const {
      value: { rank, score, problems },
      firstAcList
    } = this.props;

    const values = [];
    problems.map(problem => {
      values.push({ value: problem, type: "problem" });
    });

    return (
      <TableRow>
        <TableCol>
          <span style={{ color: "white" }}>{rank}</span>
        </TableCol>
        <TableCol>
          <Container style={{ marginHorizontal: 24 }}>
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
          const firstSolve = solved && find(firstAcList[idx], contestant.id);
          return (
            <TableCol
              senior
              solved={solved}
              wrong={wrong}
              firstSolve={firstSolve}
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
    );
  }
}

export default UserRow;
