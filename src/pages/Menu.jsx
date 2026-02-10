import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import FoodCard from "../components/FoodCard";
import { API_ENDPOINTS } from "../constants";

const Menu = () => {
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadMenu = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(API_ENDPOINTS.MENU, { signal: controller.signal });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || `Failed to load menu (${res.status})`);
        }

        const items = Array.isArray(data) ? data : data?.menuItems || data?.menuData || [];
        setMenuItems(items);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Failed to load menu");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadMenu();

    return () => controller.abort();
  }, [reloadToken]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="mb-8 text-center text-2xl font-bold sm:mb-10 sm:text-3xl">
        Our Menu
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading menu...</p>
      ) : error ? (
        <div className="mx-auto max-w-xl rounded-lg border border-red-200 bg-red-50 p-4 text-center">
          <p className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => setReloadToken((t) => t + 1)}
            className="mt-3 inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      ) : menuItems.length === 0 ? (
        <p className="text-center text-gray-600">No menu items available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {menuItems.map((food) => (
            <FoodCard key={food.id} food={food} onAddToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
