import { Link } from "react-router-dom"
import Footer from "../components/Footer"

const Home = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
          alt="Food background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 px-4 text-center text-white sm:px-6">
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-6xl">
            Delicious Food, Delivered Fast
          </h1>

          <p className="mb-6 text-base text-gray-200 sm:text-lg md:text-xl">
            Order your favorite meals from ማሚ Food with just one click
          </p>

          <Link
            to="/menu"
            className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-base font-medium text-white transition hover:bg-orange-600 sm:px-8 sm:text-lg"
          >
            Order Now
          </Link>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-3xl">
            Why Choose ማሚ Food?
          </h2>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-5 text-center shadow sm:p-6">
              <h3 className="mb-2 text-lg font-semibold sm:text-xl"> Fresh Food</h3>
              <p className="text-gray-600">
                Prepared daily with fresh ingredients you can trust.
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 text-center shadow sm:p-6">
              <h3 className="mb-2 text-lg font-semibold sm:text-xl"> Fast Delivery</h3>
              <p className="text-gray-600">Your order delivered quickly while food still hot.</p>
            </div>

            <div className="rounded-xl bg-white p-5 text-center shadow sm:p-6">
              <h3 className="mb-2 text-lg font-semibold sm:text-xl"> Affordable Price</h3>
              <p className="text-gray-600">Quality meals at prices everyone can afford.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home
