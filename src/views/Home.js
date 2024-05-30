import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import "../styles/Home.css";
import Product from "../components/Product";
import ConfirmationModal from "../components/ConfirmationModal";
import Loader from "../components/Loader";
import Woman from "../assets/images/woman-img.webp";
import Delivery from "../assets/images/delivery-image.jpg";

const Home = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const limitedProducts = response.data.slice(0, 8);
        setProducts(limitedProducts);
        setFilteredProducts(limitedProducts);
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const handleAddToCart = (item) => {
    const newItem = { ...item, id: item.id };
    setCartItems((prevCartItems) => [...prevCartItems, newItem]);
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <div className="App  bg">
      <h1>Fashion Fusion</h1>
      <h2 className="zs">Shop the latest trends</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              imageUrl={product.image}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}

      <div className="sales">
        <div className="sales__content">
          <h2>SALES IS ON!</h2>
          <h3>Get 20% off on all items</h3>
          <p>20% off using PROMO23 at Checkout</p>
        </div>
        <div className="sales__image">
          <img src={Woman} alt="woman" />
        </div>
      </div>
      <div className="promo__banner">
        <h1>
          <strong style={{ fontSize: "3rem" }}>←</strong> GET 10% OFF YOUR FIRST
          ORDER
        </h1>
      </div>
      <div className="shipping">
        <div className="shipping__image">
          <img src={Delivery} alt="delivery" />
        </div>
        <div className="shipping__content">
          <h5>FREE SHIPPING !!!</h5>
          <h3>Get free shipping on all orders</h3>
          <p>Free shipping on all orders above $50</p>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmationModal}
      />

      <Footer />
    </div>
  );
};

export default Home;
