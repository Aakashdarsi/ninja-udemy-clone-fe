import { Card, Button, ListGroup } from "react-bootstrap";
import type { OrderSummaryProps } from "../interfaces";

import ShippingProgress from "./ShippingProgress";

const OrderSummary = ({
  items,
  subtotal,
  discount,
  shipping,
  tax,
  total,

  onProceedToPayment,
}: OrderSummaryProps) => {
  const totalItems = items.length;

  return (
    <div style={{ top: "20px", zIndex: 1010 }}>
      <Card>
        <Card.Header className="bg-white">
          <h5 className="mb-0">Order Summary</h5>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush" className="mb-3">
            <ListGroup.Item className="d-flex justify-content-between px-0">
              <span>Subtotal ({totalItems} items)</span>
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

          {shipping > 0 && <ShippingProgress subtotal={subtotal} />}

          <div className="d-grid">
            <Button variant="primary" size="lg" onClick={onProceedToPayment}>
              Proceed to Payment
            </Button>
          </div>

          <div className="text-center mt-3">
            <div className="small text-muted mb-1">
              <i className="bi bi-shield-check me-1"></i>
              Secure checkout guaranteed
            </div>

            <div></div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrderSummary;
