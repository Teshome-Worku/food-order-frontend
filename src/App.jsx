import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Success from "./pages/Success";

import { API_ENDPOINTS, ROUTES } from "./constants";

const App = () => {
  const navigate = useNavigate();

  const handlePlaceOrder = async (order) => {
    try {
      const res = await fetch(API_ENDPOINTS.ORDERS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || "Failed to place order");
      }
  
      navigate(ROUTES.SUCCESS, {
        state: { orderId: data.orderId },
      });
    } catch (error) {
      console.error("Place order error:", error);
      throw error; // important → Cart.jsx handles toast
    }
  };
  
  
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 pt-16">
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.MENU} element={<Menu />} />
          <Route
            path={ROUTES.CART}
            element={<Cart onPlaceOrder={handlePlaceOrder} />}
          />
          <Route path={ROUTES.SUCCESS} element={<Success />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
