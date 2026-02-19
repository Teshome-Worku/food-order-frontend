import { Link, Navigate, useLocation } from "react-router-dom";

import { ROUTES } from "../constants";

const Success = () => {
  const { state } = useLocation();
  const orderId = state?.orderId;
  const trackingCode = state?.trackingCode;

  if (!orderId) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <div className="mb-6 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-600">
          OK
        </div>
      </div>

      <h1 className="mb-2 text-2xl font-bold text-green-600">
        Order Placed Successfully
      </h1>

      <p className="mb-4 text-gray-600">
        Thank you for your order. We received it and will start preparing it shortly.
      </p>

      <div className="mb-3 rounded-lg bg-gray-100 px-4 py-3 text-sm">
        <p className="text-gray-500">Order ID</p>
        <p className="mt-1 font-mono font-semibold text-gray-800">#{orderId}</p>
      </div>

      <div className="mb-6 rounded-lg bg-orange-50 px-4 py-3 text-sm">
        <p className="text-orange-700">Tracking Code</p>
        <p className="mt-1 font-mono font-semibold text-orange-900">
          {trackingCode || "Not provided"}
        </p>
      </div>

      <p className="mb-8 text-sm text-gray-500">
        Keep your order ID and tracking code to check live status updates.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to={ROUTES.TRACK_ORDER}
          state={{ orderId, trackingCode }}
          className="inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Track This Order
        </Link>

        <Link
          to={ROUTES.MENU}
          className="inline-block rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Back to Menu
        </Link>
      </div>
    </div>
  );
};

export default Success;
