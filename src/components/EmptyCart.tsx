import { Container, Card, Button } from "react-bootstrap";

const EmptyCart = () => {
  return (
    <Container className="py-5">
      <Card className="p-4 text-center">
        <Card.Body>
          <div className="mb-3" style={{ fontSize: "3rem", color: "#6c757d" }}>
            🛒
          </div>
          <Card.Title>Your Cart is Empty</Card.Title>
          <Card.Text className="text-muted">
            Add some items to your cart to get started!
          </Card.Text>
          <Button variant="primary" href="/products">
            Continue Shopping
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmptyCart;
