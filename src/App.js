import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import logoWhite from "./logo-white.png";
import maskot from "./maskot.png";
import maskot2 from "./npc-ngoding.png";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import JuniorScoreboard from "./components/Junior";
import "./App.css";
import ContestType from "./components/shared/ContestType";

const App = () => {
  const [contestType, setContestType] = useState("junior");
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Row style={s.logo}>
            <Col>
              <img src={logoWhite} className="App-logo" alt="logo" />
            </Col>
            <Col>
              <img src={maskot2} className="App-logo" alt="logo" />
              <img src={maskot} className="App-logo" alt="logo" />
            </Col>
          </Row>
          <h1 style={s.header}>Public Scoreboard - Schematics NPC 2019</h1>
          <ContestType active={contestType} callback={setContestType} />
          <Switch>
            <div style={s.center}>
              <Route path="/junior/" component={JuniorScoreboard} />
              <Route path="/senior/" component={null} />
            </div>
          </Switch>
        </header>
      </Router>
    </div>
  );
};

const s = {
  header: {
    margin: 24,
    fontWeight: "bold",
    color: "white",
    fontSize: 48,
    lineHeight: 1.25,
    textAlign: "center"
  },
  logo: {
    margin: 24
  },
  center: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  }
};

export default App;
