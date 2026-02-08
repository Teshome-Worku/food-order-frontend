import { useCart } from "../context/cartContext";
import menuItems from "../data/menu";
import FoodCard from "../components/FoodCard";

const Menu = () => {
  const { addToCart } = useCart();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="mb-8 text-center text-2xl font-bold sm:mb-10 sm:text-3xl">
        Our Menu
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {menuItems.map((food) => (
          <FoodCard key={food.id} food={food} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
