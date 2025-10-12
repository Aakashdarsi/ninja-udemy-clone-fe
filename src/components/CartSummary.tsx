import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import type { CartItem, CartApiResponse, Order } from "../interfaces";
import { useCartStore } from "../data_store/cart_store";
import axios from "axios";
import OrderSummary from "./OrderSummary";
import EmptyCart from "./EmptyCart";
import LoadingCart from "./loading/LoadingCart";
import CartItemsList from "./CartItemsList";
import { useUserDetails } from "../data_store/user_store";

const CartSummary = () => {
  const [apiCartItems, setApiCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = useUserDetails((state) => state.userId);

  const transformApiToCartItem = (apiItem): CartItem => ({
    id: apiItem.cartItemId,
    productId: apiItem.productId,
    name: apiItem.name,
    description: "",
    price: apiItem.price,
    originalPrice: apiItem.price,
    quantity: apiItem.quantity,
    maxQuantity: 10,
    image: apiItem.image,
    category: "",
  });

  const subtotal = apiCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = subtotal * 0.1;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const cartStore = useCartStore();

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    try {
      if (newQuantity < 1) return;
      const item = apiCartItems.find((item) => item.id === itemId);
      if (item && newQuantity > item.maxQuantity) return;

      await axios.put(
        `https://ninja-udemy-clone-be-292768677111.asia-south1.run.app/cart/${userId}/cart/update/${itemId}`,
        { quantity: newQuantity },
      );

      setApiCartItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item,
        ),
      );
      alert("updated succesfully");
    } catch (err) {
      alert(err);
      console.error("Error updating item quantity:", err);
    }
  };

  const handleRemoveItem = async (cartItemId: string) => {
    try {
      await axios.delete(
        `https://ninja-udemy-clone-be-292768677111.asia-south1.run.app/cart/${userId}/cart/remove/${cartItemId}`,
      );
      setApiCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
      cartStore.decrementQty();
      alert("Item removal successful");
    } catch (err) {
      console.log("Error removing item:", err);
    }
  };

  useEffect(() => {
    const getCartData = async () => {
      try {
        if (!userId) {
          setLoading(false);
          return;
        }
        setLoading(true);
        const res = await axios.get<CartApiResponse>(
          `https://ninja-udemy-clone-be-292768677111.asia-south1.run.app/cart/${userId}/cart`,
        );

        const transformedItems = Array.isArray(res.data.cart)
          ? res.data.cart.map(transformApiToCartItem)
          : [];
        setApiCartItems(transformedItems);

        console.log("Cart data loaded:", res.data);
      } catch (err) {
        console.log("Error fetching cart data:", err);
      } finally {
        setLoading(false);
      }
    };

    getCartData();
  }, [userId]);

  const handleProceedToPayment = async () => {
    if (apiCartItems.length === 0) return;

    try {
      const response = await axios.post(
        "https://ninja-udemy-clone-be-292768677111.asia-south1.run.app/pay/create-checkout-session",
        {
          items: apiCartItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          amount: Math.round(total * 100),
        },
      );
      console.log(response.data.url.url);
      if (response.data) {
        const { url } = response.data;
        if (url) {
          window.location.href = url.url;
        }
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return;
    }
  };

  if (loading) {
    return <LoadingCart />;
  }

  if (apiCartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Container fluid className="py-4">
      <Row>
        <Col lg={8} className="pe-lg-4">
          <CartItemsList
            items={apiCartItems}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
          />
        </Col>

        <Col lg={4}>
          <OrderSummary
            items={apiCartItems}
            subtotal={subtotal}
            discount={discount}
            shipping={shipping}
            tax={tax}
            total={total}
            onProceedToPayment={handleProceedToPayment}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CartSummary;
