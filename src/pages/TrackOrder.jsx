import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Spinner from "../components/Spinner";
import { ORDER_STATUSES, ROUTES } from "../constants";
import { api } from "../services/api";
import { formatCurrency, formatDateTime } from "../utils/formatters";

const TrackOrder = () => {
  const location = useLocation();

  const [orderId, setOrderId] = useState(
    location.state?.orderId ? String(location.state.orderId) : ""
  );
  const [trackingCode, setTrackingCode] = useState(
    location.state?.trackingCode ? String(location.state.trackingCode) : ""
  );
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const statusIndex = useMemo(
    () =>
      ORDER_STATUSES.findIndex(
        (status) => status.value === trackedOrder?.status
      ),
    [trackedOrder?.status]
  );

  const runTrackingLookup = async () => {
    const trimmedOrderId = orderId.trim();
    const trimmedCode = trackingCode.trim().toUpperCase();

    if (!trimmedOrderId || !trimmedCode) {
      setError("Order ID and tracking code are required");
      setTrackedOrder(null);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await api.trackOrder(trimmedOrderId, trimmedCode);
      setTrackedOrder(data?.order ?? null);
      setTrackingCode(trimmedCode);
    } catch (err) {
      setTrackedOrder(null);
      setError(err instanceof Error ? err.message : "Failed to track order");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await runTrackingLookup();
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-2xl font-bold sm:text-3xl">Track Your Order</h1>
      <p className="mt-2 text-sm text-gray-600 sm:text-base">
        Enter your order ID and tracking code from the confirmation page.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto] sm:items-end"
      >
        <label className="space-y-1 text-sm font-medium text-gray-700">
          <span>Order ID</span>
          <input
            value={orderId}
            onChange={(event) => setOrderId(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            placeholder="e.g. 1739958800000"
          />
        </label>

        <label className="space-y-1 text-sm font-medium text-gray-700">
          <span>Tracking Code</span>
          <input
            value={trackingCode}
            onChange={(event) => setTrackingCode(event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm uppercase focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            placeholder="e.g. 9F4QK2"
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? "Checking..." : "Track"}
        </button>
      </form>

      {error ? (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="mt-6 flex items-center gap-3 text-gray-700">
          <Spinner />
          <p>Loading order...</p>
        </div>
      ) : null}

      {trackedOrder ? (
        <div className="mt-6 space-y-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-mono text-lg font-semibold">#{trackedOrder.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Current Status</p>
              <p className="font-semibold capitalize text-orange-600">
                {trackedOrder.status}
              </p>
              <p className="text-xs text-gray-500">
                Last updated {formatDateTime(trackedOrder.updatedAt)}
              </p>
            </div>
          </div>

          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {ORDER_STATUSES.map((status, index) => {
              const isReached = statusIndex >= 0 && index <= statusIndex;
              const isCurrent = status.value === trackedOrder.status;

              return (
                <li
                  key={status.value}
                  className={`rounded-lg border px-3 py-2 text-sm transition ${
                    isReached
                      ? "border-orange-200 bg-orange-50 text-orange-800"
                      : "border-gray-200 bg-gray-50 text-gray-500"
                  }`}
                >
                  <span className="font-medium">{status.label}</span>
                  {isCurrent ? <span className="ml-2 text-xs">(Current)</span> : null}
                </li>
              );
            })}
          </ul>

          <div>
            <h2 className="text-base font-semibold">Items</h2>
            <ul className="mt-2 divide-y divide-gray-100">
              {(trackedOrder.items || []).map((item, index) => (
                <li
                  key={`${item.id ?? item.name}-${index}`}
                  className="flex items-center justify-between py-2 text-sm"
                >
                  <span>
                    {item.name} x {item.qty}
                  </span>
                  <span>{formatCurrency(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between border-t pt-3 font-semibold">
            <span>Total</span>
            <span>{formatCurrency(trackedOrder.total)}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={runTrackingLookup}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Refresh Status
            </button>
            <Link
              to={ROUTES.MENU}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Back to Menu
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TrackOrder;
