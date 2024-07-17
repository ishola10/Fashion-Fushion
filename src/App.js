import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./views/Home.js";
import Shop from "./views/Shop.js";
import Cart from "./components/Cart.js";
import Profile from "./views/Profile.js";
import SignupPage from "./views/SignupPage.js";
import ProductDetail from "./views/ProductDetails.js";
import Checkout from "./views/Checkout.js";
import NavBar from "./components/Navbar.js";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleAddToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };

  const handleSignup = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setOrderHistory([]);
  };

  const handleOrderPlaced = (order) => {
    setOrderHistory((prevHistory) => [...prevHistory, order]);
    setCartItems([]);
  };

  return (
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/shop" element={<Shop cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/cart" element={<Cart items={cartItems} onRemoveItem={handleRemoveItem} />} />
          <Route 
            path="/profile" 
            element={user ? <Profile user={user} onLogout={handleLogout} orderHistory={orderHistory} /> : <Navigate to="/signup" />} 
          />
          <Route 
            path="/signup" 
            element={user ? <Navigate to="/profile" /> : <SignupPage onSignup={handleSignup} />} 
          />
          <Route path="/product/:productId" element={<ProductDetail onAddToCart={handleAddToCart} />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} onOrderPlaced={handleOrderPlaced} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
