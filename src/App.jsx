import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import CartDrawer from './components/CartDrawer'

import { Routes, Route } from 'react-router-dom'

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (food) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === food.id)
  
      if (existing) {
        return prev.map(item =>
          item.id === food.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }
  
      return [...prev, { ...food, qty: 1 }]
    })
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        cartCount={cartItems.length}
        onCartClick={()=>setIsCartOpen(true)}
      />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />

      {/* Offset for fixed navbar */}
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu addToCart={addToCart}/>} />
          {/* <Route path="/cart" element={<Cart />} /> */}
        </Routes>
      </main>
    </div>
  )
}

export default App
