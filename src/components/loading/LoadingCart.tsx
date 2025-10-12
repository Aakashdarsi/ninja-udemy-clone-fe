import React from "react";
import { Container, Card } from "react-bootstrap";

const LoadingCart = () => {
  return (
    <Container className="py-5">
      <Card className="p-4 text-center">
        <Card.Body>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <Card.Title className="mt-3">Loading Cart...</Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoadingCart;
