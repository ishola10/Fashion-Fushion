import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Cart.css";
import Footer from "../views/Footer";
import EmptyCart from "../assets/images/icons8-shopping-cart-26.png";

const Cart = ({ items, onRemoveItem }) => {
  const totalItems = items.length;
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <div className="cart">
        <h2>Shopping Cart</h2>
        {totalItems === 0 ? (
          <div>
            <img src={EmptyCart} alt="Empty Cart" />
            <h3>Your cart is empty.</h3>
            <p>Browse our categories and discover our best deals!</p>
            <NavLink to="/shop" className="home-button">
              Start Shopping
            </NavLink>
          </div>
        ) : (
          <div className="fg">
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <img src={item.imageUrl} alt={item.title} />
                  <div>
                    <p>
                      {item.title} - ${item.price}
                    </p>
                    <button onClick={() => onRemoveItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="checkout">
              <p>
                Total Items: <strong>{totalItems}</strong>
              </p>
              <p>
                Total Price: <strong>${totalPrice.toFixed(2)}</strong>
              </p>
              <NavLink to="/checkout" className="button">
                Checkout
              </NavLink>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
