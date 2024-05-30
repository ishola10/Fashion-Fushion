import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";
import Footer from "./Footer";

const ProductDetail = ({ onAddToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product details:", error));
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      const newItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        imageUrl: product.image,
      };
      onAddToCart(newItem);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="product-detail">
      <NavLink className='back' to={`/shop`}>
      ← Back
      </NavLink>
      <img src={product.image} alt={product.title} />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
    <Footer />
    </div>
  );
};

export default ProductDetail;
