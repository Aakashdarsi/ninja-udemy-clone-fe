import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Nav,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(
            "https://ninja-udemy-clone-be-292768677111.asia-south1.run.app/products/products",
          ),
          axios.get(
            "https://ninja-udemy-clone-be-292768677111.asia-south1.run.app/products/categories",
          ),
        ]);

        if (productsRes.data.success) {
          setProducts(productsRes.data.data);
          setFilteredProducts(productsRes.data.data);
        }

        if (categoriesRes.data.success) {
          setCategories(categoriesRes.data.data);
        }
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterByCategory = async (category) => {
    try {
      setLoading(true);
      setSelectedCategory(category);

      if (category === "All") {
        const res = await axios.get(
          "https://ninja-udemy-clone-be-292768677111.asia-south1.run.app/products/products",
        );
        if (res.data.success) {
          setFilteredProducts(res.data.data);
        }
      } else {
        const res = await axios.get(
          `https://ninja-udemy-clone-be-292768677111.asia-south1.run.app/products/products/category/${category}`,
        );
        if (res.data.success) {
          setFilteredProducts(res.data.data);
        }
      }
    } catch (err) {
      setError("Failed to filter products");
      console.error("Error filtering products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading && products.length === 0) {
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

  if (error) {
    return (
      <Container>
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row>
        <Col lg={3}>
          <Card style={{ top: "20px" }}>
            <Card.Header>
              <h5 className="mb-0">Categories</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    active={selectedCategory === "All"}
                    onClick={() => filterByCategory("All")}
                    style={{ cursor: "pointer" }}
                  >
                    All Products
                  </Nav.Link>
                </Nav.Item>
                {categories.map((category) => (
                  <Nav.Item key={category}>
                    <Nav.Link
                      active={selectedCategory === category}
                      onClick={() => filterByCategory(category)}
                      style={{ cursor: "pointer" }}
                    >
                      {category}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              {selectedCategory === "All" ? "All Products" : selectedCategory}
              <small className="text-muted d-block fs-6">
                ({filteredProducts.length} products found)
              </small>
            </h2>
          </div>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p className="mt-2">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <Alert variant="info">No products found in this category.</Alert>
          ) : (
            <Row>
              {filteredProducts.map((product) => (
                <Col key={product.id} md={6} lg={4} className="mb-4">
                  <Card
                    className="h-100 product-card"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleProductClick(product.id)}
                  >
                    <Card.Img
                      variant="top"
                      src={product.image}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="h6">{product.name}</Card.Title>
                      <Card.Text className="text-muted small flex-grow-1">
                        {product.description.length > 100
                          ? `${product.description.substring(0, 100)}...`
                          : product.description}
                      </Card.Text>
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <strong className="text-primary h5">
                            ${product.price}
                          </strong>
                          <small
                            className={`badge ${product.quantity > 10 ? "bg-success" : product.quantity > 0 ? "bg-warning" : "bg-danger"}`}
                          >
                            {product.quantity > 0
                              ? `${product.quantity} in stock`
                              : "Out of stock"}
                          </small>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
