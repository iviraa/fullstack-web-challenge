import React from "react";
import NavBar from "./NavBar";
import "./Layout.css"; 

const Layout = ({ children }) => {
  return (
    <>
      {/* Full-width navbar */}
      <NavBar />
      {/* Centered content area */}
      <div className="main-content">
        {children}
      </div>
    </>
  );
};

export default Layout;
