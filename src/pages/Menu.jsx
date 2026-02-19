import { useEffect, useState } from "react";

import FoodCard from "../components/FoodCard";
import Spinner from "../components/Spinner";
import { useCart } from "../context/cartContext";
import { api } from "../services/api";

const normalizeMenuResponse = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.menuItems)) return data.menuItems;
  if (Array.isArray(data?.menu)) return data.menu;
  return [];
};

const Menu = () => {
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadMenu = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await api.getMenu();
        if (!cancelled) {
          setMenuItems(normalizeMenuResponse(data));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load menu");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadMenu();
    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="mb-8 text-center text-2xl font-bold sm:mb-10 sm:text-3xl">
        Our Menu
      </h1>

      {loading ? (
        <div className="flex items-center justify-center gap-3 text-gray-600">
          <Spinner />
          <p>Loading menu...</p>
        </div>
      ) : error ? (
        <div className="mx-auto max-w-xl rounded-lg border border-red-200 bg-red-50 p-4 text-center">
          <p className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => setReloadToken((token) => token + 1)}
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
