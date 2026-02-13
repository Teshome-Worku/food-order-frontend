import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Spinner from "../../components/Spinner";
import { api } from "../../services/api";
import {
  CURRENCY,
  ORDER_STATUSES,
  ROUTES,
  STORAGE_KEYS,
} from "../../constants";

const STATUS_BADGE_STYLES = {
  pending: "bg-amber-100 text-amber-800",
  preparing: "bg-blue-100 text-blue-800",
  ready: "bg-green-100 text-green-800",
  delivered: "bg-gray-100 text-gray-700",
};

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

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

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
    if (!token) {
      navigate(ROUTES.ADMIN_LOGIN, { replace: true });
      return;
    }
    loadOrders();
  }, [navigate]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      const data = await api.updateOrderStatus(orderId, newStatus);
      const updatedOrder = data?.order;
      if (updatedOrder) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? updatedOrder : o))
        );
      }
    } catch (err) {
      console.error("Failed to update order status:", err);
      setError(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setUpdatingOrderId(null);
    }
  };

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
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="font-semibold">Order #{order.id}</h3>
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  STATUS_BADGE_STYLES[order.status] ?? "bg-gray-100 text-gray-700"
                }`}
              >
                {order.status}
              </span>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                disabled={updatingOrderId === order.id}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              {updatingOrderId === order.id && (
                <Spinner size="sm" className="border-orange-500" />
              )}
            </div>
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
