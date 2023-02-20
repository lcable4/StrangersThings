import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { registrationInfo } from '../apiAdapters'

export default function Registration() {
  
    let[newUser, setNewUser] = useState("");
    let[newUserName, setNewUserName] = useState("");
    let[newUserPass, setNewUserPass] = useState("");
    let[passVerification, setPassVerification] = useState("");
    let[submitMessage, setSubmitMessage] = useState("");
    let[errorMessage, setErrorMessage] = useState("");

    async function registerNewUser(name, password) {
        
        if (newUserPass !== passVerification) {
            setErrorMessage("Passwords do not match.")
            return;
        }
        
        
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
                setNewUser(result.data.token);
                setSubmitMessage("Successfully registered!");
                setNewUserName("");
                setNewUserPass("");
                setPassVerification("")
                localStorage.setItem(name, password);
                localStorage.setItem('token', result.data.token)
            } else {
                console.error(result.error.message);
                setErrorMessage(result.error.message)
            }
        } catch (error) {
            setErrorMessage("Passwords do not match.")
            console.log(error);
        }
    }
    console.log(newUserName, "username")
    console.log(newUserPass, "password")
    console.log(newUser)
    
    return (
    <div className="registrationForm">
        {errorMessage && <div>{errorMessage}</div>}
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
                        required
                        minLength="5"
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
                        required
                        minLength="5"
                        onChange={(e) => {
                            setNewUserPass(e.target.value);
                        }}
                    />
                </label>
            </p>
            <p>
                <label>
                    Verify your password:
                    <input 
                        name="password"
                        type="password"
                        value={passVerification}
                        onChange={(e) => {
                            setPassVerification(e.target.value);
                        }}/>
                </label>
            </p>
            <button type="submit">Submit</button>
            {submitMessage && <p>{submitMessage}</p>}
            <Link to="/">Go Back</Link>
        </form>
    </div>            
  )
}
