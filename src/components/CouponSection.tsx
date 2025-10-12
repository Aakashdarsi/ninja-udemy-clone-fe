import React from "react";
import { Alert, Button, Form } from "react-bootstrap";

interface CouponSectionProps {
  couponCode: string;
  appliedCoupon: string | null;
  couponError: string;
  onCouponCodeChange: (code: string) => void;
  onApplyCoupon: () => void;
  onRemoveCoupon: () => void;
}

const CouponSection: React.FC<CouponSectionProps> = ({
  couponCode,
  appliedCoupon,
  couponError,
  onCouponCodeChange,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  return (
    <div className="mb-3">
      {appliedCoupon ? (
        <Alert variant="success" className="py-2">
          <div className="d-flex justify-content-between align-items-center">
            <span>
              Coupon applied: <strong>{appliedCoupon}</strong>
            </span>
            <Button variant="outline-danger" size="sm" onClick={onRemoveCoupon}>
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
                onChange={(e) => onCouponCodeChange(e.target.value)}
                size="sm"
              />
              <Button
                variant="outline-primary"
                size="sm"
                className="ms-2"
                onClick={onApplyCoupon}
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
  );
};

export default CouponSection;
