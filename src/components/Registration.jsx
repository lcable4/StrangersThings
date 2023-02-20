import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { registrationInfo } from '../apiAdapters'

export default function Registration() {
  
    let[newUser, setNewUser] = useState("")
    let[newUserName, setNewUserName] = useState("")
    let[newUserPass, setNewUserPass] = useState("")

    async function registerNewUser(name, password) {
        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2301-FTB-ET-WEB-FT/users/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: newUserName,
                        password: newUserPass,
                    }
                })
            });

            const result = await response.json();
            if(result.success) {
                console.log("you have created a new profile")
                setNewUser(result.data.token);
                localStorage.setItem(name, password);
            } else {
                console.error(result.error.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    console.log(newUserName, "username")
    console.log(newUserPass, "password")
    console.log(newUser)
    
    return (
    <div className="registrationForm">
        <form onSubmit={(e) => {
            e.preventDefault();
            registerNewUser(newUserName, newUserPass);
        }}>
            <p>
                <label>
                    Enter your name:
                    <input
                        name="name"
                        type="text"
                        value={newUserName}
                        onChange={(e) => {
                            setNewUserName(e.target.value);
                        }}
                    />
                </label>    
            </p>
            <p>
                <label>
                    Set your new password:
                    <input
                        name="password"
                        type="password"
                        value={newUserPass}
                        onChange={(e) => {
                            setNewUserPass(e.target.value);
                        }}
                    />
                </label>
            </p>
            <button type="submit">Submit</button>
            <Link to="/">Go Back</Link>
        </form>
    </div>            
  )
}
