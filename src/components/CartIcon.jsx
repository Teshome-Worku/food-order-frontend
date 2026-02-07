import { FiShoppingCart } from "react-icons/fi";

const CartIcon = ({ cartCount }) => {
  return (
    <div className="relative cursor-pointer">
      <FiShoppingCart className="text-2xl text-white" />

      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
