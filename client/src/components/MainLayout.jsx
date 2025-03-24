import React from "react";
import NavBar from "./NavBar";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <>
      {/* Top navigation bar */}
      <NavBar />
      {/* Page content */}
      <div className="main-content">
        {children}
      </div>
    </>
  );
};

export default Layout;
