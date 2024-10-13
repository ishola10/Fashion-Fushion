import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const NavBar = ({ user }) => {
  return (
    <div className="navbar">
      <div>
        <nav className="nav__content">
          <div>
            <NavLink className="nav__logo" to="/">
              <h1>Fashion Fusion & Stores</h1>
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

            {user ? (
              <>
                <NavLink className="link" activeClassName="active" to="/profile">
                  Profile
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className="link" activeClassName="active" to="/login">
                  Login
                </NavLink>

                <NavLink className="link" activeClassName="active" to="/signup">
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
