const FoodCard = ({ food }) => {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <img src={food.image} alt={food.name} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{food.name}</h3>
          <p className="text-gray-600">{food.price} ETB</p>
          <button className="mt-3 w-full bg-orange-500 text-white py-2 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    )
  }
  
  export default FoodCard
  