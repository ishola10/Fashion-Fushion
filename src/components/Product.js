import React from "react";
import { NavLink } from "react-router-dom";

const Product = ({ id, title, price, imageUrl, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart({ id, title, price, imageUrl });
  };

  return (
    <div className="product">
      <NavLink to={`/product/${id}`}>
        <img src={imageUrl} alt={title} />
      </NavLink>
      <h3>{title}</h3>
      <p>${price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
