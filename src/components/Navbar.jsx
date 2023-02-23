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

const Navbar = () => {

  


  
  return (
    <div id="navbar">
      
      {
        ifUserLogged() ? <button onClick={onLogoutClick}>Logout</button>: <div><Link to="/login"><button>Login</button></Link><Link to="/registration"><button>Register</button></Link></div>
      }
      <h2 className="siteTitle"> Stranger's Things</h2>
      {
        ifUserLogged() ? <Link to="/newpost"><button className="navBtns">New Post</button></Link>:null
      }
      {
        ifUserLogged() ? <><Link to="/User"><button className="navBtns">Profile</button></Link><p>Logged in as: {localStorage.getItem('username')}</p></> : null
      }
    </div>
  );
};

export default Navbar;