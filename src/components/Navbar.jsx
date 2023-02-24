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
        ifUserLogged() ? <button className='btns' onClick={onLogoutClick}>Logout</button>: <div><Link to="/login"><button className='btns'>Login</button></Link><Link to="/registration"><button>Register</button></Link></div>
      }
      <h2 > <Link className="siteTitle" to="/">Stranger's Things</Link></h2>
      {
        ifUserLogged() ? <>
                          <div className="navBtns">
                            <Link to="/newpost" >
                              <button className='btns'>New Post</button>
                            </Link>
                            <Link to="/User">
                              <button className='btns'>Profile</button>
                            </Link>
                          </div>
                           <p>Logged in as: {localStorage.getItem('username')}</p>
                          </>
                          :null
      }
    </div>
  );
};

export default Navbar;