import axios from "axios";
import { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row, Table } from "react-bootstrap";
import OrderHistoryShimmer from "./loading/OrderHistoryShimmer";
import {
  formatCurrency,
  formatDate,
  getStatusVariant,
} from "../utils/formatters";
import { useUserDetails } from "../data_store/user_store";
export const OrdersPage = () => {
  const [orders, setOrderData] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);
  const userId = useUserDetails((state) => state.userId);

  useEffect(() => {
    const fetchOrders = async (userId) => {
      try {
        const response = await axios.get(
          `https://ninja-udemy-clone-be-292768677111.asia-south1.run.app/cart/${userId}/orders`,
        );
        setOrderData(response.data.orders);
        setTotalOrders(response.data.totalOrders);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders(userId);
  }, [userId]);
  return (
    <div>
      {loading ? (
        <OrderHistoryShimmer />
      ) : (
        <Container className="my-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Order History</h2>
            <Badge bg="secondary" className="fs-6">
              Total Orders: {totalOrders}
            </Badge>
          </div>

          {orders.map((order, idx) => (
            <Card key={order.orderId} className="mb-4 shadow-sm">
              <Card.Header className="bg-light">
                <Row className="align-items-center">
                  <Col md={6}>
                    <h5 className="mb-1">
                      Order {idx + 1}: {order.orderId}
                    </h5>
                    <small className="text-muted">
                      Created: {formatDate(order.createdAt)}
                    </small>
                  </Col>
                  <Col md={6} className="text-md-end">
                    <Badge bg={getStatusVariant(order.status)} className="fs-6">
                      {order.status.toUpperCase()}
                    </Badge>
                    <div className="mt-2">
                      <strong className="fs-5">
                        {formatCurrency(order.totalAmount)}
                      </strong>
                    </div>
                  </Col>
                </Row>
              </Card.Header>

              <Card.Body>
                <h6 className="mb-3">Order Items</h6>
                <Table responsive striped className="mb-4">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.cartItemId}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                                marginRight: "10px",
                              }}
                            />
                            <div>
                              <div className="fw-bold">{item.name}</div>
                              <small className="text-muted">
                                SKU: {item.productId}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>{item.quantity}</td>
                        <td>{formatCurrency(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <Row>
                  <Col md={6}>
                    <h6>Shipping Address</h6>
                    <div className="text-muted">
                      <div>{order.shippingAddress.fullName}</div>
                      <div>{order.shippingAddress.street}</div>
                      <div>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}{" "}
                        {order.shippingAddress.zipCode}
                      </div>
                      <div>{order.shippingAddress.country}</div>
                      <div className="mt-2">
                        <strong>Phone:</strong> {order.shippingAddress.phone}
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <h6>Payment Information</h6>
                    <div className="text-muted">
                      <div>
                        <strong>Method:</strong>{" "}
                        {order.paymentMethod === "credit_card"
                          ? "Credit Card"
                          : order.paymentMethod.replace("_", " ").toUpperCase()}
                      </div>
                      <div className="mt-2">
                        <strong>Last Updated:</strong>{" "}
                        {formatDate(order.updatedAt)}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Container>
      )}
    </div>
  );
};
