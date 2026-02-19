import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Spinner from "../../components/Spinner";
import {
  ORDER_STATUSES,
  ROUTES,
  STORAGE_KEYS,
} from "../../constants";
import { api } from "../../services/api";
import { formatCurrency, formatDateTime } from "../../utils/formatters";

const STATUS_BADGE_STYLES = {
  pending: "bg-amber-100 text-amber-800",
  preparing: "bg-blue-100 text-blue-800",
  ready: "bg-green-100 text-green-800",
  delivered: "bg-gray-100 text-gray-700",
};

const isAuthError = (message) =>
  typeof message === "string" &&
  (message.includes("401") ||
    message.includes("403") ||
    message.toLowerCase().includes("token"));

const normalizeOrdersResponse = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.orders)) return data.orders;
  return [];
};

const AdminOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await api.getOrders();
      setOrders(normalizeOrdersResponse(data));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch orders";

      if (isAuthError(message)) {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
        navigate(ROUTES.ADMIN_LOGIN, { replace: true });
        return;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
    if (!token) {
      navigate(ROUTES.ADMIN_LOGIN, { replace: true });
      return;
    }

    loadOrders();
  }, [navigate, loadOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    setError("");

    try {
      const data = await api.updateOrderStatus(orderId, newStatus);
      const updatedOrder = data?.order;

      if (updatedOrder) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? updatedOrder : order
          )
        );
      }
    } catch (err) {
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
      <div className="space-y-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        <p>{error}</p>
        <button
          type="button"
          onClick={loadOrders}
          className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Retry
        </button>
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
            <div>
              <h3 className="font-semibold">Order #{order.id}</h3>
              <p className="text-xs text-gray-500">
                Placed {formatDateTime(order.createdAt)}
              </p>
              {order.trackingCode ? (
                <p className="text-xs text-gray-500">
                  Tracking Code: <span className="font-mono">{order.trackingCode}</span>
                </p>
              ) : null}
            </div>

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
                onChange={(event) =>
                  handleStatusChange(order.id, event.target.value)
                }
                disabled={updatingOrderId === order.id}
                className="cursor-pointer rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {ORDER_STATUSES.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              {updatingOrderId === order.id ? (
                <Spinner size="sm" className="border-orange-500" />
              ) : null}
            </div>
          </div>

          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <p>Name: {order.customer?.name || "-"}</p>
            <p>Phone: {order.customer?.phone || "-"}</p>
            {order.customer?.address ? <p>Address: {order.customer.address}</p> : null}
            {order.customer?.notes ? <p>Notes: {order.customer.notes}</p> : null}
          </div>

          <ul className="mt-3 divide-y divide-gray-100">
            {(order.items || []).map((item, index) => (
              <li
                key={`${item.id ?? item.name}-${index}`}
                className="flex justify-between py-2 text-sm"
              >
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>{formatCurrency(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 border-t pt-3 font-semibold text-orange-600">
            Total: {formatCurrency(order.total)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
