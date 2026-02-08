import { useEffect } from "react";
import { useCart } from "../context/cartContext";
import { CURRENCY } from "../constants";

const CartDrawer = ({ onPlaceOrder }) => {
  const {
    cartItems,
    cartTotal,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQty,
    clearCart,
  } = useCart();

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  const handlePlaceOrder = () => {
    onPlaceOrder?.();
    clearCart();
    closeCart();
  };

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-80 flex-col transform bg-white shadow-xl transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded p-1 text-xl font-bold hover:bg-gray-100"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="mb-4 flex items-center justify-between gap-3"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 shrink-0 rounded object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{item.name}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, -1)}
                          className="h-6 w-6 rounded bg-gray-200 text-sm font-bold hover:bg-gray-300"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          −
                        </button>
                        <span className="text-sm text-gray-500">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, 1)}
                          className="h-6 w-6 rounded bg-gray-200 text-sm font-bold hover:bg-gray-300"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="whitespace-nowrap font-semibold">
                      {item.price * item.qty} {CURRENCY}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-500 hover:text-red-700"
                      aria-label={`Remove ${item.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t p-4">
              <div className="mb-4 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>
                  {cartTotal} {CURRENCY}
                </span>
              </div>
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
