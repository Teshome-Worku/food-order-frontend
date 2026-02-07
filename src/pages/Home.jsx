import { Link } from "react-router-dom"
const Home = () => {
    return (
      <>
        {/* HERO SECTION */}
        <section className="relative  h-[95vh]  flex items-center justify-center">
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            alt="Food background"
            className="absolute inset-0 w-full h-full object-cover"
          />
  
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
  
          {/* Content */}
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Delicious Food, Delivered Fast
            </h1>
  
            <p className="text-lg md:text-xl mb-6 text-gray-200">
              Order your favorite meals from ማሚ Food with just one click
            </p>
  
            <Link to='/menu' className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg transition">
              Order Now
            </Link >
          </div>
        </section>
  
        {/* INFO SECTION */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose ማሚ Food?
            </h2>
  
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow text-center">
                <h3 className="text-xl font-semibold mb-2">🍔 Fresh Food</h3>
                <p className="text-gray-600">
                  Prepared daily with fresh ingredients you can trust.
                </p>
              </div>
  
              <div className="bg-white p-6 rounded-xl shadow text-center">
                <h3 className="text-xl font-semibold mb-2">🚀 Fast Delivery</h3>
                <p className="text-gray-600">
                  Your order delivered quickly while it’s still hot.
                </p>
              </div>
  
              <div className="bg-white p-6 rounded-xl shadow text-center">
                <h3 className="text-xl font-semibold mb-2">💰 Affordable Price</h3>
                <p className="text-gray-600">
                  Quality meals at prices everyone can afford.
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
  
  export default Home
  