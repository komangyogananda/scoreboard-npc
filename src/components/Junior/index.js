import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableRow from "../shared/Table/Row";
import TableCol from "../shared/Table/Column";
import UserRow from "./UserRow";
import Table from "react-bootstrap/Table";
import {
  type,
  secret,
  contestJid,
  timeStart,
  timeEnd,
  timeFreeze
} from "../constants";

import ReactLoading from "react-loading";
import Countdown from "react-countdown-now";

class JuniorScoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true,
      status: 400,
      contestant: [],
      success: false,
      frozen: false,
      time: Date.now(),
      timeStart: timeStart,
      timeEnd: timeEnd,
      timeFreeze: timeFreeze,
      ended: false
    };
  }

  fetchApi = () => {
    // fetch(
    //   "http://junior.npc.portal-schematics2019.com/api/contests/scoreboards/get",
    //   {
    //     method: "POST",
    //     headers: {
    //       Accept: "*/*",
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     body: `type=${type.official}&contestJid=${contestJid}&secret=${secret}`
    //   }
    // )
    const { frozen } = this.state;
    const url = frozen
      ? "http://18.139.27.220:8000/junior-freeze"
      : "http://18.139.27.220:8000/junior-official";
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(result => {
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
          header,
          success: true
        });
      })
      .catch(response => {
        this.setState({
          isLoading: false
        });
      });
  };

  checkFreeze = () => {
    const now = Date.now();
    if (now > timeFreeze) {
      this.setState({
        frozen: true
      });
    }
  };

  componentDidMount = () => {
    this.fetchApi();
    this.checkFreeze();
    this.callApi = setInterval(() => this.fetchApi(), 10000);
    this.checkFreeze = setInterval(this.checkFreeze, 10000);
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
    const { isLoading, data, success, frozen } = this.state;
    return (
      <Container>
        <h2
          style={{ color: "white", marginBottom: 12, fontWeight: "bold" }}
        >{`Penyisihan`}</h2>
        <Row style={{ marginBottom: 24 }}>
          <Col>
            <Row>
              {Date.now() < timeEnd ? (
                <Col>
                  {timeStart > Date.now() ? (
                    <h2>Contest dimulai dalam: </h2>
                  ) : (
                    <h2>Durasi</h2>
                  )}
                </Col>
              ) : null}
              <Col>
                <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
                  <Countdown
                    date={
                      timeStart > Date.now()
                        ? timeStart
                        : timeEnd < Date.now()
                        ? Date.now()
                        : timeEnd
                    }
                    onComplete={() => this.setState({ ended: true })}
                  >
                    <span>Contest Ended</span>
                  </Countdown>
                </h2>
              </Col>
            </Row>
          </Col>

          {frozen && (
            <Col>
              <h2>Scoreboard sudah di freeze</h2>
            </Col>
          )}
        </Row>
        {isLoading ? (
          <ReactLoading type="spin" color="#fff"></ReactLoading>
        ) : success ? (
          <Container>
            <Table striped variant="dark" responsive>
              <thead>{this.renderHeader()}</thead>
              <tbody>
                {data.map(contestant => (
                  <UserRow value={contestant}></UserRow>
                ))}
              </tbody>
            </Table>
          </Container>
        ) : (
          <h2 style={{ color: "white", marginBottom: 36, fontWeight: "bold" }}>
            Contest Belum Dimulai
          </h2>
        )}
      </Container>
    );
  }
}

const s = {};

export default JuniorScoreboard;
