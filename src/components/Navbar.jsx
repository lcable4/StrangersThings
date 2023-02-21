import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

function onLogoutClick()
{
  console.log("been clicked")
  localStorage.removeItem("token");
  window.location.reload(false);
}

function ifUserLogged()
{
  if(localStorage.getItem("token"))
  {
    return true;
  }
  return false; 
}

const Login = () =>
{
return(
  <Link to="/login">
    <button>Login</button>
  </Link>
)
}


const Navbar = () => {
  return (
    <div id="navbar">
      <h2> Stranger's Things</h2>
      {
        ifUserLogged() ? <button type="submit" onClick={onLogoutClick}>Logout</button>:<Login/>
      }
      <Link to="/registration">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default Navbar;