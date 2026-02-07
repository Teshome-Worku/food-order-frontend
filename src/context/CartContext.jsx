import { createContext, useContext, useState } from "react"

// create context
const CartContext = createContext()

// provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  // add item to cart
  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item])
  }

  // remove item later
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    )
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

// custom hook (clean usage)
export const useCart = () => {
  return useContext(CartContext)
}
