import { Link, useLocation, Navigate } from "react-router-dom";
import { ROUTES } from "../constants";

const Success = () => {
  const { state } = useLocation();
  const orderId = state?.orderId;

  // If someone opens /success directly
  if (!orderId) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      {/* Success icon */}
      <div className="mb-6 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">
          ✓
        </div>
      </div>

      <h1 className="mb-2 text-2xl font-bold text-green-600">
        Order Placed Successfully!
      </h1>

      <p className="mb-4 text-gray-600">
        Thank you for your order. We’ve received it and will start preparing it shortly.
      </p>

      {/* Order reference */}
      <div className="mb-6 rounded-lg bg-gray-100 px-4 py-3 text-sm">
        <p className="text-gray-500">Order ID</p>
        <p className="mt-1 font-mono font-semibold text-gray-800">
          #{orderId}
        </p>
      </div>

      <p className="mb-8 text-sm text-gray-500">
        Keep this Order ID for reference. We’ll contact you soon for delivery.
      </p>

      <Link
        to={ROUTES.MENU}
        className="inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
      >
        Back to Menu
      </Link>
    </div>
  );
};

export default Success;
