import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Spinner from "../../components/Spinner";
import { api } from "../../services/api";
import { CURRENCY, ROUTES, STORAGE_KEYS } from "../../constants";

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
    if (!token) {
      navigate(ROUTES.ADMIN_LOGIN, { replace: true });
      return;
    }

    const controller = new AbortController();

    const loadOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await api.getOrders();
        const nextOrders = Array.isArray(data) ? data : data?.orders ?? [];
        setOrders(Array.isArray(nextOrders) ? nextOrders : []);
      } catch (err) {
        if (err?.message?.includes("401") || err?.message?.includes("403")) {
          localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
          navigate(ROUTES.ADMIN_LOGIN, { replace: true });
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
    return () => controller.abort();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-gray-700">
        <Spinner />
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
        No orders yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Orders</h1>
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold">Order #{order.id}</h3>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                order.status === "pending"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {order.status}
            </span>
          </div>

          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <p>Name: {order.customer?.name}</p>
            <p>Phone: {order.customer?.phone}</p>
            {order.customer?.address && (
              <p>Address: {order.customer.address}</p>
            )}
          </div>

          <ul className="mt-3 divide-y divide-gray-100">
            {(order.items || []).map((item, idx) => (
              <li key={idx} className="flex justify-between py-2 text-sm">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>
                  {item.price * item.qty} {CURRENCY}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-3 border-t pt-3 font-semibold text-orange-600">
            Total: {order.total} {CURRENCY}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
