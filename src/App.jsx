import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Success from "./pages/Success";

import { ROUTES } from "./constants";

const App = () => {
  const navigate = useNavigate();

  const handlePlaceOrder = (order) => {
    // Later this will send `order` to the backend
    console.log("New order:", order);
    navigate(ROUTES.SUCCESS);
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
