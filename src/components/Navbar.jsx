import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div id="navbar">
      <h2> I am navbar</h2>
      <Link to="/registration">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default Navbar;