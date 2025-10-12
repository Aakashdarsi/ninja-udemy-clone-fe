const ShippingProgress = ({ subtotal }) => {
  return (
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
  );
};

export default ShippingProgress;
