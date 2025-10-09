import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import "./scss/styles.scss";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import { Login } from "./components/Login";
import AddressForm from "./components/AddressForm";
import CartSummary from "./components/CartSummary";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      price: 99.99,
      originalPrice: 129.99,
      quantity: 1,
      image: "/assets/headphones.jpg",
      description: "Noise cancelling wireless headphones",
      category: "Electronics",
      maxQuantity: 5,
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      price: 199.99,
      quantity: 2,
      image: "/assets/smartwatch.jpg",
      description: "Advanced fitness tracking watch",
      category: "Wearables",
      maxQuantity: 3,
    },
    {
      id: "3",
      name: "USB-C Charging Cable",
      price: 19.99,
      quantity: 3,
      image: "/assets/cable.jpg",
      description: "Fast charging 6ft USB-C cable",
      category: "Accessories",
      maxQuantity: 10,
    },
    {
      id: "445",
      name: "USB-C Charging Cable",
      price: 19.99,
      quantity: 3,
      image: "/assets/cable.jpg",
      description: "Fast charging 6ft USB-C cable",
      category: "Accessories",
      maxQuantity: 10,
    },
    {
      id: "3323",
      name: "USB-C Charging Cable",
      price: 19.99,
      quantity: 3,
      image: "/assets/cable.jpg",
      description: "Fast charging 6ft USB-C cable",
      category: "Accessories",
      maxQuantity: 10,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  return (
    <>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/addr" element={<AddressForm />} />
          <Route path="/cart" element={<CartSummary items={cartItems} />} />
        </Routes>
      </AppLayout>
    </>
  );
}

export default App;
