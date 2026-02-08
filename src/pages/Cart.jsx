import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { ROUTES } from "../constants";

const Cart = () => {
  const { cartTotal, cartCount, openCart } = useCart();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-orange-500 sm:text-3xl">Your Cart</h1>

      {cartCount === 0 ? (
        <div className="mt-8 rounded-xl bg-white p-8 text-center shadow">
          <p className="text-gray-600">Your cart is empty</p>
          <Link
            to={ROUTES.MENU}
            className="mt-4 inline-block rounded-lg bg-orange-500 px-6 py-2 font-medium text-white transition hover:bg-orange-600"
          >
            Browse Menu
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            Or{" "}
            <button
              type="button"
              onClick={openCart}
              className="text-orange-500 underline hover:text-orange-600"
            >
              open cart drawer
            </button>{" "}
            from the navbar.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <p className="text-gray-600">
            {cartCount} item{cartCount !== 1 ? "s" : ""} in your cart. Total: {cartTotal} Birr
          </p>
          <button
            type="button"
            onClick={openCart}
            className="rounded-lg bg-orange-500 px-6 py-2 font-medium text-white transition hover:bg-orange-600"
          >
            View Cart Details
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
