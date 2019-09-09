import React from "react";

import changeCase from "change-case";
import TableRow from "../../shared/Table/Row";
import TableCol from "../../shared/Table/Column";

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
      `https://junior.npc.portal-schematics2019.com:2444/api/v1/users/${contestantJid}`
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

    return (
      <TableRow>
        {values.map(val => {
          const { value, type } = val;
          const solved = type === "problem" && value === 100;
          const solvedPartial = type === "problem" ? value : null;
          return (
            <TableCol solved={solved} solvedPartial={solvedPartial}>
              <span style={{ color: "white" }}>
                {changeCase.isUpperCase(value ? value : "")
                  ? value
                  : changeCase.titleCase(value ? value : "")}
              </span>
            </TableCol>
          );
        })}
      </TableRow>
    );
  }
}

export default UserRow;
