import React from 'react'
import { Link } from "react-router-dom"

export default function Login() {
  
    async function userLogin(name, password) {
        try {
            const username = localStorage.getItem('username');
            const password = localStorage.getItem('password')
            const response = await fetch('https://strangers-things.herokuapp.com/api/2301-FTB-ET-WEB-FT/users/login', {
               method: "POST",
               headers: {
                'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
               }) 
            })
            const data = await response.json();
            localStorage.setItem('token', data.data.token); 
        } catch (error) {
            console.log(error);
        }
    }
  
    return (
    <>
    <div>
        <h1>Login</h1>
    </div>
    <Link to="/">Go Back</Link>
    </>
  )
}
