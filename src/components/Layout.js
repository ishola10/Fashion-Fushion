import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./Navbar";

const Layout = ({ user }) => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className={shouldShowNavbar ? "" : "full-page"}>
      {shouldShowNavbar && <NavBar user={user} />}
      <Outlet />
    </div>
  );
};

export default Layout;
