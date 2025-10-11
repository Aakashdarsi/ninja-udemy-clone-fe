import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import "./scss/styles.scss";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import { Login } from "./components/Login";
import AddressForm from "./components/AddressForm";
import CartSummary from "./components/CartSummary";
import { useEffect, useState } from "react";
import ItemForm from "./components/ItemForm";
import { Inventory } from "./components/Inventory";
import { getStorage } from "firebase/storage";
import { auth } from "./lib/firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
function App() {
  {
  }
  const [cartItems, setCartItems] = useState([
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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else {
        console.log("user logged out");
      }
    });
    unsubscribe()
  });
  return (
    <>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/addr" element={<AddressForm />} />
          <Route path="/cart" element={<CartSummary items={cartItems} />} />
          <Route path="/add" element={<ItemForm />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </AppLayout>
    </>
  );
}

export default App;
