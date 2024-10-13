import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./views/Home.js";
import Shop from "./views/Shop.js";
import Cart from "./components/Cart.js";
import Profile from "./views/Profile.js";
import SignupPage from "./views/SignupPage.js";
import ProductDetail from "./views/ProductDetails.js";
import Checkout from "./views/Checkout.js";
import Login from "./views/Login.js";
import Layout from "./components/Layout"; 

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

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleSignup = (user) => {
    setUser(user); 
  };

  const handleOrderPlaced = (order) => {
    setOrderHistory((prevHistory) => [...prevHistory, order]);
    setCartItems([]);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Layout user={user} />}>
            <Route index element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="shop" element={<Shop cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="cart" element={<Cart items={cartItems} onRemoveItem={handleRemoveItem} />} />
            <Route path="profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="product/:productId" element={<ProductDetail onAddToCart={handleAddToCart} />} />
            <Route path="checkout" element={<Checkout cartItems={cartItems} onOrderPlaced={handleOrderPlaced} />} />
          </Route>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
