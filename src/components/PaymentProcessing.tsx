import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../data_store/cart_store";
import { useUserDetails } from "../data_store/user_store";

const PaymentProcessing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get("session_id");
  const [payment, setPayment] = useState(false);
  const cartStore = useCartStore();
  const [customerDetails, setCustomerDetails] = useState({});
  const [sessionData, setSessionData] = useState({});
  const userId = useUserDetails((state) => state.userId);

  const mapStripeToOrderPayload = (stripeData) => {
    const customerDetails = stripeData?.session?.customer_details;
    const paymentIntent = stripeData?.session?.payment_intent;
    const paymentMethod = paymentIntent?.payment_method_types?.[0] || "card";

    const cardLastFour = paymentIntent?.payment_method?.slice(-4) || "4242";
    const cardType = paymentMethod === "card" ? "visa" : paymentMethod;

    return {
      shippingAddress: {
        fullName: customerDetails?.name || "",
        street:
          `${customerDetails?.address?.line1 || ""} ${customerDetails?.address?.line2 || ""}`.trim(),
        city: customerDetails?.address?.city || "",
        state: customerDetails?.address?.state || "",
        zipCode: customerDetails?.address?.postal_code || "",
        country: customerDetails?.address?.country || "",
        phone: customerDetails?.phone || "+1-555-0123",
      },
      paymentMethod: paymentMethod === "card" ? "credit_card" : paymentMethod,
      paymentDetails: {
        cardLastFour: cardLastFour,
        cardType: cardType,
      },
      shippingMethod: "express",
      notes: "Please leave package at front door",
    };
  };

  useEffect(() => {
    const processOrder = async (stripeData) => {
      try {
        if (!stripeData?.session) return;

        const orderPayload = mapStripeToOrderPayload(stripeData);
        console.log("Order Payload:", orderPayload);

        const order_process = await axios.post(
          `https://ninja-udemy-clone-be-292768677111.asia-south1.run.app/cart/${userId}/orders/create`,
          orderPayload,
        );
        alert("order processed successfully");
      } catch (err) {
        console.log("Error processing order:", err);
      }
    };

    const getSessionDetails = async (sessionId) => {
      if (!sessionId) return;
      try {
        const response = await axios.get(
          `https://ninja-udemy-clone-be-292768677111.asia-south1.run.app/pay/session-status?session_id=${sessionId}`,
        );
        setSessionData(response.data);
        setCustomerDetails(response.data?.session?.customer_details);
        cartStore.setCartQty(0);
        setPayment(true);

        await processOrder(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getSessionDetails(sessionId);
  }, [sessionId]);

  return (
    <div>
      {payment ? (
        <>
          <Container className="mt-5">
            <Row className="justify-content-center">
              <Col md={8} lg={6}>
                <Card className="shadow-sm border-0">
                  <Card.Body className="text-center p-5">
                    <div className="mb-4"></div>

                    <Alert variant="success" className="border-0 bg-light">
                      <Alert.Heading className="h4 text-success mb-3">
                        Order Completed Successfully!
                      </Alert.Heading>
                      <p className="mb-0 text-muted">
                        Thank you for your purchase! Your order has been
                        processed successfully.
                      </p>
                    </Alert>

                    <div className="my-4">
                      <p className="text-muted">
                        You will receive a confirmation email shortly with your
                        order details.
                      </p>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="px-4"
                      onClick={() => navigate("/orders")}
                    >
                      View Your Orders
                    </Button>

                    <div className="mt-3">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => navigate("/")}
                      >
                        Continue Shopping
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <>Loading, please wait...</>
      )}
    </div>
  );
};

export default PaymentProcessing;
