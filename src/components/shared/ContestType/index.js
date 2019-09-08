import React from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const ContestType = props => {
  return (
    <Col style={{ marginBottom: 36 }}>
      <ButtonGroup size="lg" className="mr-2">
        <Button
          variant="danger"
          active={props.active === "junior"}
          onClick={() => {
            props.callback("junior");
            // props.history.push("/junior/");
          }}
        >
          Junior
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            props.callback("senior");
            // props.history.push("/senior/");
          }}
          active={props.active === "senior"}
        >
          Senior
        </Button>
      </ButtonGroup>
    </Col>
  );
};

ContestType.propTypes = {
  history: PropTypes.shape.isRequired,
  callback: PropTypes.func
};

ContestType.defaultProps = {
  callback: () => null
};

export default ContestType;
