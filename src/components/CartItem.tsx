import React from "react";
import { Row, Col, Button, Form, Badge } from "react-bootstrap";
import type { CartItem as CartItemType } from "../interfaces";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemoveItem,
}) => {
  return (
    <div className="cart-item border-bottom p-3">
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
                {item.description || "Product description not available"}
              </p>
              <Badge bg="outline-secondary" className="mb-2">
                {item.category || "Uncategorized"}
              </Badge>
              <div className="d-flex align-items-center">
                {item.originalPrice && item.originalPrice > item.price ? (
                  <>
                    <span className="text-danger fw-bold me-2">
                      ${item.price.toFixed(2)}
                    </span>
                    <span className="text-muted text-decoration-line-through small">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="fw-bold">${item.price.toFixed(2)}</span>
                )}
              </div>
            </Col>
            <Col sm={3}>
              <div className="d-flex align-items-center">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <Form.Control
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    onQuantityChange(item.id, parseInt(e.target.value) || 1)
                  }
                  min={1}
                  max={item.maxQuantity}
                  className="mx-2 text-center"
                  style={{ width: "60px" }}
                />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => onQuantityChange(item.id, item.quantity + 1)}
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
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onRemoveItem(item.id)}
              >
                Remove
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CartItem;
