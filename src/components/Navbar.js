import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <div>
        <nav className="nav__content">
          <div>
            <NavLink className="nav__logo" to="/">
              <h1>Fashion Fusion</h1>
            </NavLink>
          </div>
          <div className="links">
            <NavLink className="link" activeClassName="active" to="/" end>
              Home
            </NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink className="link" activeClassName="active" to="/cart">
              Cart
            </NavLink>
            <NavLink className="link" activeClassName="active" to="/profile">
              Profile
            </NavLink>
            
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
