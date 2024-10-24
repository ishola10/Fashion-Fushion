import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import ProfileIcon from '../assets/images/icons8-avatar-96.png'

const NavBar = ({ user }) => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFooterVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, []);

  return (
    <div className={`navbar ${isFooterVisible ? "hidden" : ""}`}>
      <nav className="nav__content">
        <div>
          <NavLink className="nav__logo" to="/">
            <h1>FFS</h1>
          </NavLink>
        </div>
        <div className="links">
          <NavLink className="link" activeClassName="active" to="/" end>
            Home
          </NavLink>
          <NavLink className="link" activeClassName="active" to="/shop">Shop</NavLink>
          <NavLink className="link" activeClassName="active" to="/cart">
            Cart
          </NavLink>

          {user ? (
            <>
              <NavLink style={{display: 'flex', alignItems: 'center'}} className="link" activeClassName="active" to="/profile">
                <img src={user.photoURL || ProfileIcon} alt="profile" style={{width: '30px', height: '30px', borderRadius: '50%'}} />
                <p>{user.displayName}</p>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink style={{padding: '10px 20px', border: "2px solid", borderRadius: '5px', }} className="link" activeClassName="active" to="/login">
                Login
              </NavLink>

              <NavLink className="link" style={{backgroundColor: 'var(--accent-color)', color: 'var(--primary-color)', padding: '10px 20px', border: "2px solid", borderRadius: '5px'}} activeClassName="active" to="/signup">
                Signup
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
