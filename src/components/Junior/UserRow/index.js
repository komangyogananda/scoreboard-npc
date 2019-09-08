import React from "react";

import changeCase from "change-case";
import TableRow from "../../shared/Table/Row";

class UserRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contestant: {},
      isLoading: true
    };
  }

  componentDidMount = () => {
    const { contestantJid } = this.props.value;
    fetch(
      `http://junior.npc.portal-schematics2019.com:2444/api/v1/users/${contestantJid}`
    )
      .then(response => response.json())
      .then(result => {
        this.setState({
          contestant: result
        });
      });
  };

  render() {
    const {
      contestant: { name }
    } = this.state;
    const {
      value: { rank, totalScores, scores }
    } = this.props;
    const values = [];
    values.push({ value: rank, type: "rank" });
    values.push({ value: changeCase.titleCase(name), type: "name" });
    values.push({ value: totalScores, type: "total" });
    scores.map(score => {
      values.push({ value: score, type: "problem" });
    });
    return <TableRow values={values} />;
  }
}

export default UserRow;
