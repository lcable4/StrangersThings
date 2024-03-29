import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function onLogoutClick() {
  console.log("been clicked");
  localStorage.removeItem("token");
  window.location.reload(false);
}

function ifUserLogged() {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
}

const Navbar = () => {
  return (
    <div id="navbar">
      <div className="logoDiv">
        <h2>
          <Link className="siteTitle" to="/">
            Stranger's Things
          </Link>
        </h2>
        <img className="logo" src="./images/stranger'sThings.png" alt="logo" />
      </div>
      {ifUserLogged() ? (
        <>
          <div className="navLinksDiv">
            <Link to="/newpost" className="navLinks">
              <button className="btns">New Post</button>
            </Link>
            <Link to="/User" className="navLinks">
              <button className="btns">Profile</button>
            </Link>
          </div>
          <p>Logged in as: {localStorage.getItem("username")}</p>
        </>
      ) : null}
      {ifUserLogged() ? (
        <button className="navBtns" onClick={onLogoutClick}>
          Logout
        </button>
      ) : (
        <div>
          <Link className="navLinks" to="/login">
            <button className="btns">Login</button>
          </Link>
          <Link className="navLinks" to="/registration">
            <button>Register</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
