import { Route, Routes } from "react-router-dom";
import "./scss/styles.scss";
import "./App.css";
import Home from "./components/Home";
import { Login } from "./components/Login";
import { useEffect, Suspense, lazy } from "react";
import { auth } from "./lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useUserDetails } from "./data_store/user_store";
import { useCartStore } from "./data_store/cart_store";
import axios from "axios";

const CartSummary = lazy(() => import("./components/CartSummary"));
const Inventory = lazy(() => import("./components/Inventory"));
const Products = lazy(() => import("./components/Products"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const AppLayout = lazy(() => import("./components/layout/AppLayout"));
const PaymentProcessing = lazy(() => import("./components/PaymentProcessing"));

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

function App() {
  const cartStore = useCartStore();
  const userLoggedin = useUserDetails();
  const getCartQuantity = async (userId) => {
    try {
      const quant = await axios.get(
        `https://ninja-udemy-clone-be-292768677111.asia-south1.run.app/cart/${userId}/cart/quantity`,
      );
      const length = quant.data.length ? quant.data.length : 0;
      cartStore.setCartQty(length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName } = user;
        userLoggedin.setUser(uid, displayName);
        getCartQuantity(uid);
      } else {
        userLoggedin.logOutUser();
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<CartSummary />} />
          <Route path="/orders" element={<Inventory />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/success" element={<PaymentProcessing />} />
        </Routes>
      </AppLayout>
    </Suspense>
  );
}

export default App;
