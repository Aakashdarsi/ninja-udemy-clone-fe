import React from "react";
import { Card, Row, Col, Container, Placeholder } from "react-bootstrap";

const OrderHistoryShimmer = () => {
  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Placeholder as="h2" animation="glow">
          <Placeholder xs={4} />
        </Placeholder>
        <Placeholder as="div" animation="glow">
          <Placeholder xs={3} style={{ height: "24px" }} />
        </Placeholder>
      </div>

      {[1, 2, 3].map((orderIndex) => (
        <Card key={orderIndex} className="mb-4 shadow-sm">
          <Card.Header className="bg-light">
            <Row className="align-items-center">
              <Col md={6}>
                <Placeholder as="h5" animation="glow" className="mb-2">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as="small" animation="glow">
                  <Placeholder xs={4} />
                </Placeholder>
              </Col>
              <Col md={6} className="text-md-end">
                <Placeholder as="div" animation="glow" className="mb-2">
                  <Placeholder xs={3} style={{ height: "24px" }} />
                </Placeholder>
                <Placeholder as="div" animation="glow">
                  <Placeholder xs={4} style={{ height: "28px" }} />
                </Placeholder>
              </Col>
            </Row>
          </Card.Header>

          <Card.Body>
            <Placeholder as="h6" animation="glow" className="mb-3">
              <Placeholder xs={3} />
            </Placeholder>

            <div className="mb-4">
              <Row className="mb-3">
                <Col md={4}>
                  <Placeholder animation="glow">
                    <Placeholder xs={2} />
                  </Placeholder>
                </Col>
                <Col md={2}>
                  <Placeholder animation="glow">
                    <Placeholder xs={2} />
                  </Placeholder>
                </Col>
                <Col md={2}>
                  <Placeholder animation="glow">
                    <Placeholder xs={2} />
                  </Placeholder>
                </Col>
                <Col md={2}>
                  <Placeholder animation="glow">
                    <Placeholder xs={2} />
                  </Placeholder>
                </Col>
              </Row>

              {[1, 2, 3].map((itemIndex) => (
                <Row key={itemIndex} className="mb-3 align-items-center">
                  <Col md={4}>
                    <div className="d-flex align-items-center">
                      <Placeholder animation="glow" className="me-3">
                        <Placeholder
                          style={{ width: "50px", height: "50px" }}
                        />
                      </Placeholder>
                      <div style={{ flex: 1 }}>
                        <Placeholder animation="glow" className="mb-2">
                          <Placeholder xs={4} />
                        </Placeholder>
                        <Placeholder animation="glow">
                          <Placeholder xs={3} />
                        </Placeholder>
                      </div>
                    </div>
                  </Col>
                  <Col md={2}>
                    <Placeholder animation="glow">
                      <Placeholder xs={3} />
                    </Placeholder>
                  </Col>
                  <Col md={2}>
                    <Placeholder animation="glow">
                      <Placeholder xs={2} />
                    </Placeholder>
                  </Col>
                  <Col md={2}>
                    <Placeholder animation="glow">
                      <Placeholder xs={3} />
                    </Placeholder>
                  </Col>
                </Row>
              ))}
            </div>

            <Row>
              <Col md={6} className="mb-3 mb-md-0">
                <Placeholder as="h6" animation="glow" className="mb-3">
                  <Placeholder xs={4} />
                </Placeholder>
                <div>
                  <Placeholder animation="glow" className="mb-2">
                    <Placeholder xs={3} />
                  </Placeholder>
                  <Placeholder animation="glow" className="mb-2">
                    <Placeholder xs={4} />
                  </Placeholder>
                  <Placeholder animation="glow" className="mb-2">
                    <Placeholder xs={5} />
                  </Placeholder>
                  <Placeholder animation="glow" className="mb-2">
                    <Placeholder xs={3} />
                  </Placeholder>
                  <Placeholder animation="glow">
                    <Placeholder xs={4} />
                  </Placeholder>
                </div>
              </Col>
              <Col md={6}>
                <Placeholder as="h6" animation="glow" className="mb-3">
                  <Placeholder xs={5} />
                </Placeholder>
                <div>
                  <Placeholder animation="glow" className="mb-2">
                    <Placeholder xs={4} />
                  </Placeholder>
                  <Placeholder animation="glow">
                    <Placeholder xs={5} />
                  </Placeholder>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default OrderHistoryShimmer;
