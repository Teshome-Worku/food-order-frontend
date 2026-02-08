import { useEffect } from "react";
const CartDrawer = ({ isOpen, onClose, cartItems }) => {
    useEffect(()=>{
        document.body.style.overflow = isOpen ? "hidden" : "auto"
    },[isOpen])
    return (
      <>
        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={onClose}
          />
        )}
  
        {/* Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold">Your Cart</h2>
            <button
              onClick={onClose}
              className="text-xl font-bold"
            >
              ✕
            </button>
          </div>
  
          <div className="p-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500">
                Your cart is empty
              </p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="mb-3">
                  {item.name}
                </div>
              ))
            )}
          </div>
        </div>
      </>
    );
  };
  export default CartDrawer;
  