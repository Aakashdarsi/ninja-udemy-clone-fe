import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import axios from "axios";
import { useUserDetails } from "../data_store/user_store";
import { useCartStore } from "../data_store/cart_store";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const uid = useUserDetails((state) => state.userId);
  const cartStore = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://ninja-udemy-clone-be-292768677111.asia-south1.run.app/products/products/${productId}`,
        );

        if (res.data.success) {
          setProduct(res.data.data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to fetch product details");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        `https://ninja-udemy-clone-be-292768677111.asia-south1.run.app/cart/${uid}/cart/add`,
        {
          ...product,
          quantity,
        },
      );
      console.log(response.status);
      cartStore.incrementQty();
      cartStore.addItemsCart({ ...product, quantity });
      alert("Item added successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.quantity) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <Alert variant="danger" className="mt-3">
          {error || "Product not found"}
        </Alert>
        <Button variant="primary" onClick={() => navigate("/products")}>
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Button
        variant="outline-secondary"
        className="mb-3"
        onClick={() => navigate("/products")}
      >
        ← Back to Products
      </Button>

      <Row>
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={product.image}
              style={{ height: "400px", objectFit: "cover" }}
            />
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Badge bg="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="h3">{product.name}</h1>
              <p className="text-muted">{product.description}</p>

              <div className="mb-3">
                <h2 className="text-primary">${product.price}</h2>
                <p
                  className={
                    product.quantity > 0 ? "text-success" : "text-danger"
                  }
                >
                  {product.quantity > 0
                    ? `${product.quantity} in stock`
                    : "Out of stock"}
                </p>
              </div>

              {product.quantity > 0 && (
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={product.quantity}
                    style={{ width: "100px" }}
                  />
                </div>
              )}

              <div className="d-grid gap-2 d-md-flex">
                <Button
                  variant="outline-secondary"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.quantity === 0}
                  className="flex-fill"
                >
                  Add to Cart
                </Button>
              </div>

              <hr className="my-4" />

              <div>
                <h5>Product Details</h5>
                <ul className="list-unstyled">
                  <li>
                    <strong>Product ID:</strong> {product.productId}
                  </li>
                  <li>
                    <strong>Category:</strong> {product.category}
                  </li>
                  <li>
                    <strong>Available Quantity:</strong> {product.quantity}
                  </li>
                  {product.createdAt && (
                    <li>
                      <strong>Added:</strong>{" "}
                      {new Date(product.createdAt).toLocaleDateString()}
                    </li>
                  )}
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
