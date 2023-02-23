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
    <div className="navBtnsDiv">
    <Link to="/newpost">
      <button className="navBtns">New Post</button>
    </Link>
    <Link to="/User">
      <button className="navBtns">Profile</button>
    </Link>
    
    </div>
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
      
      {
        ifUserLogged() ? <button onClick={onLogoutClick}>Logout</button>: null
      }
      <h2 className="siteTitle"> Stranger's Things</h2>
      
      {
        ifUserLogged() ? <Logout/>:<Login/>
      }
    </div>
  );
};

export default Navbar;