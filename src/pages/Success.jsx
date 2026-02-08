import { Link } from "react-router-dom";
import { ROUTES } from "../constants";

const Success = () => (
  <div className="mx-auto max-w-md px-4 py-16 text-center">
    <div className="mb-6 text-6xl text-green-500" aria-hidden="true">
      ✓
    </div>
    <h1 className="mb-2 text-2xl font-bold text-green-600">Order Placed!</h1>
    <p className="mb-8 text-gray-600">
      Thank you for your order. We will prepare it soon.
    </p>
    <Link
      to={ROUTES.MENU}
      className="inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
    >
      Back to Menu
    </Link>
  </div>
);

export default Success;
