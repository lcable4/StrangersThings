import React, {useState} from 'react'
import { Link } from "react-router-dom"
import {userLogin} from "../apiAdapters/index.js"

export default function Login() {
  
    const [login, setLogin] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState({})
    async function onLogin(username, password)//set response to state || set token to local storage
    {
        setResponse(userLogin(username, password));
        console.log(response);
    }
    //userLogin("creator", "12345");
  
    return (
    <>
    <div>
        <h1>Login</h1>
        <form onSubmit={(event)=>
        {
            event.preventDefault();
            onLogin(username, password)//change to async
            console.log(response); 
            /*
            */
        }
        }>
        <label>Username:
            <input name="username" type="text" value ={username} onChange={(event)=>
            {
                console.log("change");
                setUsername(event.target.value);
            }}/>
        </label>
        <br/>
        <label>Password:
            <input name="password" type="text" value={password} onChange={(event)=>
            {
                setPassword(event.target.value);
            }}/>

        </label>
        <button type="submit">Log In</button>
        </form>
    </div>
    <Link to="/">Go Back</Link>
    </>
  )
}
