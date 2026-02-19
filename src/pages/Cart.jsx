import { useState } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../constants";
import { useCart } from "../context/cartContext";
import { useToast } from "../context/toastContext";
import { formatCurrency } from "../utils/formatters";

const REQUIRED_FIELDS = ["name", "phone", "address"];

const Cart = ({ onPlaceOrder }) => {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const { showToast } = useToast();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const updateCustomerField = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const nextErrors = REQUIRED_FIELDS.reduce((acc, field) => {
      if (!customer[field].trim()) {
        acc[field] = `${field[0].toUpperCase()}${field.slice(1)} is required`;
      }
      return acc;
    }, {});

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      showToast("Please fill in all required fields", "error");
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsPlacingOrder(true);

    const trimmedNotes = customer.notes.trim();
    const order = {
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        ...(trimmedNotes && { notes: trimmedNotes }),
      },
      items: cartItems,
      total: cartTotal,
    };

    try {
      await onPlaceOrder?.(order);
      clearCart();
      setCustomer({ name: "", phone: "", address: "", notes: "" });
      setErrors({});
      showToast("Order placed successfully", "success");
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
                    Qty: {item.qty} x {formatCurrency(item.price)}
                  </p>
                </div>
                <p className="font-semibold">{formatCurrency(item.price * item.qty)}</p>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between border-t pt-4 text-base font-semibold">
            <span>Total</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
        </div>

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
              value={customer.name}
              onChange={(event) => updateCustomerField("name", event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Your name"
            />
            {errors.name ? <p className="text-xs text-red-500">{errors.name}</p> : null}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              value={customer.phone}
              onChange={(event) => updateCustomerField("phone", event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="09..."
            />
            {errors.phone ? <p className="text-xs text-red-500">{errors.phone}</p> : null}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Address / Location
            </label>
            <input
              type="text"
              value={customer.address}
              onChange={(event) => updateCustomerField("address", event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Your address or location"
            />
            {errors.address ? <p className="text-xs text-red-500">{errors.address}</p> : null}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Notes (optional)
            </label>
            <textarea
              value={customer.notes}
              onChange={(event) => updateCustomerField("notes", event.target.value)}
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
