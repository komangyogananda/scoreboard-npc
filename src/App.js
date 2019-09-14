import React, { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import logoWhite from "./logo-white.png";
import maskot from "./maskot.png";
import maskot2 from "./npc-ngoding.png";

import Scoreboard from "./components/Scoreboard";
import "./App.css";
import ContestType from "./components/shared/ContestType";

const App = () => {
  const [contestType, setContestType] = useState("junior");
  return (
    <div className="App">
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

        <div style={s.center}>
          <Scoreboard contestType={contestType}></Scoreboard>
        </div>
      </header>
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
