import React from "react";
import { Navbar } from "./";
import AllPosts from "./AllPosts";
import { Outlet } from "react-router-dom"

const Main = () => {
    return(
        <div id="main">
            <Navbar />
            <AllPosts />
            
        </div>
    )
}

export default Main