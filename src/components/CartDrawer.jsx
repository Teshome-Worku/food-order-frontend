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
  
          <div className="p-4 border-b">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 ">
                Your cart is empty
              </p>
            ) : (
                cartItems.map(item => (
                    <div
                      key={item.id}
                      className="mb-4 flex items-center justify-between gap-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 shrink-0 rounded object-cover transition-all duration-300 hover:scale-105"
                        />

                        <div className="min-w-0">
                          <p className="truncate font-semibold leading-tight">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                        </div>
                      </div>
                  
                      <p className="whitespace-nowrap font-semibold">
                        {item.price * item.qty} Birr
                      </p>
                      
                    </div>
                  )))
                  
            }
          </div>
        </div>
        {
            cartItems.length > 0 && (
                <div className="flex justify-end ">
                    <h2>Total:{cartItems.price*cartItems.qty} Birr</h2>

                </div>
            )
        }
      </>
    );
  };
  export default CartDrawer;
  
