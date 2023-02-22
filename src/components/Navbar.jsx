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

const Logout = () =>
{
  return(
    <>
    <button onClick={onLogoutClick}>Logout</button>
    <Link to="/newpost">
      <button>New Post</button>
    </Link>
    </>
  )
}

const Login = () =>
{
return(
  <>
  <Link to="/login">
    <button>Login</button>
  </Link>
  <Link to="/registration">
    <button>Register</button>
  </Link>
  </>
)
}


const Navbar = () => {
  return (
    <div id="navbar">
      <h2 className="siteTitle"> Stranger's Things</h2>
      {
        ifUserLogged() ? <Logout/>:<Login/>
      }
    </div>
  );
};

export default Navbar;