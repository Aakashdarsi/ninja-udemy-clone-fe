import Badge from "react-bootstrap/Badge";
import { useCartStore } from "../state";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const counter = useCartStore((state) => state.counter);
  const navigate = useNavigate();

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      className="mt-2"
    >
      <img
        src="/bag.svg"
        alt="Shopping cart"
        onClick={() => navigate("/cart")}
      />
      <Badge
        bg="primary"
        style={{
          position: "absolute",
          top: "-12px",
          right: "-12px",
          borderRadius: "50%",
        }}
      >
        {counter}
      </Badge>
    </div>
  );
};

export default Cart;
