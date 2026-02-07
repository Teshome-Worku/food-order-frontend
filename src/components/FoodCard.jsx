const FoodCard = ({ food }) => {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
      <img
        src={food.image}
        alt={food.name}
        className="h-36 w-full object-cover sm:h-40"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{food.name}</h3>
        <p className="mt-1 text-sm text-gray-600 sm:text-base">{food.price} ETB</p>
        <button
          type="button"
          className="mt-3 w-full rounded-lg bg-orange-500 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600 sm:text-base"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default FoodCard
