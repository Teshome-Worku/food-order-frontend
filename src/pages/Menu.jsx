const foods = [
  {
    id: 1,
    name: "Burger",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: 2,
    name: "Pizza",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1548365328-8b849e6c7b1c",
  },
  {
    id: 3,
    name: "Pasta",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e",
  },
]

const Menu = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">
        Our Menu 🍽️
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {foods.map((food) => (
          <div
            key={food.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-semibold">
                {food.name}
              </h2>

              <p className="text-gray-600 mt-2">
                {food.price} ETB
              </p>

              <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition">
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
