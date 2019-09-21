import React from "react";
import Modal from "react-bootstrap/Modal";

import changecase from "change-case";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ModalUser = props => {
  const { contestant } = props;
  const members = contestant.members.split("\r\n");

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Row>
                <Col>
                  <h2 style={{ marginBottom: "24px" }}>{contestant.name}</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    Institusi: <strong>{contestant.affiliation}</strong>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Members: </p>
                  {members.map(member => {
                    return (
                      <div style={{ marginBottom: "10px" }}>
                        <strong>{changecase.titleCase(member)}</strong>
                      </div>
                    );
                  })}
                </Col>
              </Row>
            </Col>
            <Col
              className="align-self-center"
              style={{
                textAlign: "center"
              }}
            >
              <img
                width={128}
                height={128}
                src={`http://18.139.27.220:8000/senior/peserta/logo/${contestant.organization_id}`}
                alt={contestant.affiliation}
              />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ModalUser;
