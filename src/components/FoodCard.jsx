import { useToast } from "../context/toastContext";
import { formatCurrency } from "../utils/formatters";

const FoodCard = ({ food, onAddToCart }) => {
  const { showToast } = useToast();

  const handleAddToCart = () => {
    onAddToCart?.(food);
    showToast(`${food.name} added to cart`, "success");
  };

  return (
  <div className="overflow-hidden rounded-xl bg-white shadow transition-shadow hover:shadow-lg">
    <img
      src={food.image}
      alt={food.name}
      className="h-40 w-full object-cover transition duration-300 hover:scale-105 sm:h-48"
    />
    <div className="p-4 sm:p-5">
      <h3 className="text-lg font-semibold sm:text-xl">{food.name}</h3>
      {food.category ? (
        <p className="mt-1 text-xs uppercase tracking-wide text-gray-400">
          {food.category}
        </p>
      ) : null}
      <p className="mt-1 text-sm text-gray-600 sm:mt-2 sm:text-base">
        {formatCurrency(food.price)}
      </p>
      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-4 w-full rounded-lg bg-orange-500 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600 sm:text-base"
      >
        Add to Cart
      </button>
    </div>
  </div>
  );
};

export default FoodCard;
