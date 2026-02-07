const foods = [
  {
    id: 1,
    name: "Burger",
    price: 150,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: 2,
    name: "Pizza",
    price: 300,
    image: "https://images.unsplash.com/photo-1548365328-8b849e6c7b1c",
  },
  {
    id: 3,
    name: "Pasta",
    price: 250,
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e",
  },
]

const Menu = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="mb-8 text-center text-2xl font-bold sm:mb-10 sm:text-3xl">
        Our Menu ðŸ½ï¸
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {foods.map((food) => (
          <div
            key={food.id}
            className="overflow-hidden rounded-xl bg-white shadow transition-shadow hover:shadow-lg"
          >
            <img
              src={food.image}
              alt={food.name}
              className="h-40 w-full object-cover sm:h-48"
            />

            <div className="p-4 sm:p-5">
              <h2 className="text-lg font-semibold sm:text-xl">{food.name}</h2>

              <p className="mt-1 text-sm text-gray-600 sm:mt-2 sm:text-base">
                {food.price} ETB
              </p>

              <button
                type="button"
                className="mt-4 w-full rounded-lg bg-orange-500 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600 sm:text-base"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu
