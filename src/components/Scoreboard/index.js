import React from "react";

import JuniorScoreboard from "../Junior";
import SeniorScoreboard from "../Senior";

const Scoreboard = props => {
  const { contestType } = props;
  if (contestType === "junior") {
    return <JuniorScoreboard />;
  }
  if (contestType === "senior") {
    return <SeniorScoreboard />;
  }
  return <h1>Pilih Kategori Kompetisi</h1>;
};

export default Scoreboard;
