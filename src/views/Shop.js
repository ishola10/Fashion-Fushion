import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Shop.css";
import Product from "../components/Product";
import ConfirmationModal from "../components/ConfirmationModal";
import Footer from "./Footer";
import Loader from "../components/Loader";

const Shop = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("recommended");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];

    if (category !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === category
      );
    }

    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case "priceLowToHigh":
        updatedProducts.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        updatedProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        updatedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "recommended":
      default:
        break;
    }

    setFilteredProducts(updatedProducts);
  }, [products, searchTerm, category, sortOption]);

  const handleAddToCart = (item) => {
    const newItem = { ...item, id: item.id };
    setCartItems((prevCartItems) => [...prevCartItems, newItem]);
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <div>
      <div className="header">
        Sale is on! 25% off sitewide using TEES25 at checkout
      </div>
      <div className="shop">
        <div className="sidebar">
          <h3>Categories</h3>
          <ul>
            <li onClick={() => setCategory("all")}>All</li>
            <li onClick={() => setCategory("men's clothing")}>Men</li>
            <li onClick={() => setCategory("women's clothing")}>Women</li>
            <li onClick={() => setCategory("electronics")}>Electronics</li>
          </ul>
        </div>

        <div className="main-content">
          <div className="filter-options">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              onChange={(e) => setSortOption(e.target.value)}
              value={sortOption}
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest</option>
              <option value="priceLowToHigh">Price (low to high)</option>
              <option value="priceHighToLow">Price (high to low)</option>
            </select>
          </div>

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
        </div>

        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={handleCloseConfirmationModal}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
