import React from "react";
import { Navbarhelper } from "./Navbarhelper";

export const Navbar = () => {
  return (
    <>
      <div className="navbar-header-container">
        <h1>YouNews</h1>
        <p>The world at your fingertips</p>
      </div>
      <div className="navbar-user-information">
        <Navbarhelper />
      </div>
    </>
  );
};
