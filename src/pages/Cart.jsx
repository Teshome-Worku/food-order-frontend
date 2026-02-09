import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useToast } from "../context/toastContext";
import { CURRENCY, ROUTES } from "../constants";

const Cart = ({ onPlaceOrder }) => {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    if (!address.trim()) newErrors.address = "Address is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please fill in all required fields", "error");
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsPlacingOrder(true);

    const trimmedNotes = notes.trim();
    const order = {
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        ...(trimmedNotes && { notes: trimmedNotes }),
      },
      items: cartItems,
      total: cartTotal,
      createdAt: new Date().toISOString(),
    };

    try {
      await onPlaceOrder?.(order);
      clearCart();
      setName("");
      setPhone("");
      setAddress("");
      setNotes("");
      setErrors({});
      showToast("Order placed successfully!", "success");
    } catch {
      showToast("Something went wrong. Try again.", "error");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (cartCount === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-orange-500 sm:text-3xl">
          Your Cart
        </h1>
        <div className="mt-8 rounded-xl bg-white p-8 text-center shadow">
          <p className="text-gray-600">Your cart is empty</p>
          <Link
            to={ROUTES.MENU}
            className="mt-4 inline-block rounded-lg bg-orange-500 px-6 py-2 font-medium text-white transition hover:bg-orange-600"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-orange-500 sm:text-3xl">
        Checkout
      </h1>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {/* Order summary */}
        <div className="space-y-4 rounded-xl bg-white p-4 shadow sm:p-5">
          <h2 className="text-lg font-semibold">Your Order</h2>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between py-3 text-sm"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">
                    Qty: {item.qty} × {item.price} {CURRENCY}
                  </p>
                </div>
                <p className="font-semibold">
                  {item.price * item.qty} {CURRENCY}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between border-t pt-4 text-base font-semibold">
            <span>Total</span>
            <span>
              {cartTotal} {CURRENCY}
            </span>
          </div>
        </div>

        {/* Customer details form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl bg-white p-4 shadow sm:p-5"
        >
          <h2 className="text-lg font-semibold">Delivery Details</h2>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="09..."
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Address / Location
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Your address or location"
            />
            {errors.address && (
              <p className="text-xs text-red-500">{errors.address}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Any extra instructions"
            />
          </div>

          <button
            type="submit"
            disabled={isPlacingOrder}
            className="mt-2 w-full rounded-lg bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
          >
            {isPlacingOrder ? "Placing order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cart;
