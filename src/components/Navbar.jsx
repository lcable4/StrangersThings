import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div id="navbar">
      <h2> Stranger's Things</h2>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/registration">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default Navbar;