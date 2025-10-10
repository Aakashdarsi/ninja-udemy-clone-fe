import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Alert,
  Badge,
  ListGroup,
  Container,
} from "react-bootstrap";
import type { CartItem, CartProps } from "../interfaces";
import { useCartStore } from "../data_store/cart_store";

const CartSummary: React.FC<CartProps> = ({ items }) => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");

  // Calculate cart totals
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const discount = appliedCoupon ? subtotal * 0.1 : 0; // 10% discount for demo
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal - discount + shipping + tax;

  const qty = useCartStore((state) => state.overallQty);

  // Handle quantity changes
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const item = items.find((item) => item.id === itemId);
    if (item && newQuantity > item.maxQuantity) return;
  };

  // Handle coupon application
  const handleApplyCoupon = () => {
    setCouponError("");
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    // Simulate coupon validation
    const validCoupons = ["SAVE10", "WELCOME15", "FREESHIP"];
    if (validCoupons.includes(couponCode.toUpperCase())) {
      setAppliedCoupon(couponCode.toUpperCase());
      setCouponCode("");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  // Handle remove coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
  };

  // Handle proceed to payment
  const handleProceedToPayment = () => {
    if (items.length === 0) return;
  };

  if (items.length === 0) {
    return (
      <Container className="py-5">
        <Card className="p-4 text-center">
          <Card.Body>
            <div
              className="mb-3"
              style={{ fontSize: "3rem", color: "#6c757d" }}
            >
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
  }

  return (
    <Container fluid className="py-4">
      <Row>
        <Col lg={8} className="pe-lg-4">
          <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <Card>
              <Card.Header className="bg-white" style={{ zIndex: 1020 }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Shopping Cart ({qty} items)</h4>
                  <Badge bg="primary" pill>
                    {items.reduce((total, item) => total + item.quantity, 0)}{" "}
                    items
                  </Badge>
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                {items.map((item) => (
                  <div key={item.id} className="cart-item border-bottom p-3">
                    <Row className="align-items-center">
                      <Col md={3}>
                        <div
                          className="cart-item-image bg-light rounded"
                          style={{
                            width: "100%",
                            height: "120px",
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      </Col>
                      <Col md={9}>
                        <Row className="align-items-center">
                          <Col sm={6}>
                            <h6 className="mb-1">{item.name}</h6>
                            <p className="text-muted small mb-2">
                              {item.description}
                            </p>
                            <Badge bg="outline-secondary" className="mb-2">
                              {item.category}
                            </Badge>
                            <div className="d-flex align-items-center">
                              {item.originalPrice &&
                              item.originalPrice > item.price ? (
                                <>
                                  <span className="text-danger fw-bold me-2">
                                    ${item.price.toFixed(2)}
                                  </span>
                                  <span className="text-muted text-decoration-line-through small">
                                    ${item.originalPrice.toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                <span className="fw-bold">
                                  ${item.price.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </Col>
                          <Col sm={3}>
                            <div className="d-flex align-items-center">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity - 1,
                                  )
                                }
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <Form.Control
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    item.id,
                                    parseInt(e.target.value) || 1,
                                  )
                                }
                                min={1}
                                max={item.maxQuantity}
                                className="mx-2 text-center"
                                style={{ width: "60px" }}
                              />
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity + 1,
                                  )
                                }
                                disabled={item.quantity >= item.maxQuantity}
                              >
                                +
                              </Button>
                            </div>
                            <div className="text-muted small text-center mt-1">
                              Max: {item.maxQuantity}
                            </div>
                          </Col>
                          <Col sm={2} className="text-center">
                            <div className="fw-bold h6 mb-2">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <Button variant="outline-danger" size="sm">
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </div>
        </Col>

        {/* Order Summary Pane - Fixed */}
        <Col lg={4}>
          <div style={{ top: "20px", zIndex: 1010 }}>
            <Card>
              <Card.Header className="bg-white">
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                {/* Coupon Section */}
                <div className="mb-3">
                  {appliedCoupon ? (
                    <Alert variant="success" className="py-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>
                          Coupon applied: <strong>{appliedCoupon}</strong>
                        </span>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={handleRemoveCoupon}
                        >
                          Remove
                        </Button>
                      </div>
                    </Alert>
                  ) : (
                    <>
                      <Form.Group className="mb-2">
                        <Form.Label className="small">Coupon Code</Form.Label>
                        <div className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder="Enter coupon"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            size="sm"
                          />
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="ms-2"
                            onClick={handleApplyCoupon}
                          >
                            Apply
                          </Button>
                        </div>
                      </Form.Group>
                      {couponError && (
                        <Alert variant="danger" className="py-2 small">
                          {couponError}
                        </Alert>
                      )}
                    </>
                  )}
                </div>
                \{" "}
                <ListGroup variant="flush" className="mb-3">
                  <ListGroup.Item className="d-flex justify-content-between px-0">
                    <span>
                      Subtotal (
                      {items.reduce((total, item) => total + item.quantity, 0)}{" "}
                      items)
                    </span>
                    <span>${subtotal.toFixed(2)}</span>
                  </ListGroup.Item>

                  {discount > 0 && (
                    <ListGroup.Item className="d-flex justify-content-between px-0 text-success">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className="d-flex justify-content-between px-0">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-success">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </ListGroup.Item>

                  <ListGroup.Item className="d-flex justify-content-between px-0">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </ListGroup.Item>

                  <ListGroup.Item className="d-flex justify-content-between px-0 fw-bold fs-5">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </ListGroup.Item>
                </ListGroup>
                {shipping > 0 && (
                  <div className="mb-3 p-3 bg-light rounded">
                    <div className="small text-muted mb-2">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                    </div>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar"
                        style={{
                          width: `${Math.min((subtotal / 50) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
                {/* Proceed to Payment Button */}
                <div className="d-grid">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleProceedToPayment}
                  ></Button>
                </div>
                {/* Security Badge */}
                <div className="text-center mt-3">
                  <div className="small text-muted mb-1">
                    <i className="bi bi-shield-check me-1"></i>
                    Secure checkout guaranteed
                  </div>
                  <div className="small">
                    <img
                      src="/assets/credit-cards.png"
                      alt="Accepted payment methods"
                      style={{ height: "20px" }}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartSummary;
