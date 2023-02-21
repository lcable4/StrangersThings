import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

function onLogoutClick()
{
  localStorage.removeItem("token");
}

const Login = () =>
{
return(
  <Link to="/login">
    <button>Login</button>
  </Link>
)
}
const Logout = ()=>
{return(
  <button onClick={onLogoutClick()}>Logout</button>
)
}

const Navbar = () => {
  return (
    <div id="navbar">
      <h2> Stranger's Things</h2>
      {
        localStorage.getItem("token") ? <Logout/>:<Login/>
      }
      <Link to="/registration">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default Navbar;