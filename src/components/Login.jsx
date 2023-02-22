import React, {useState} from 'react'
import { Link } from "react-router-dom"
import {userLogin, displayMessages} from "../apiAdapters/index.js"

export default function Login() {
  
    const [login, setLogin] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");
    const [submitMessage, setSubmitMessage] = useState("");
    
    async function onLogin(username, password) {
        try {
          const token = await userLogin(username, password);
          if (token.success) {
              console.log(token)
              setResponse(token);
              setUsername("");
              setPassword("");
              setSubmitMessage("Successfully logged in!");
              displayMessages();
          } 
          
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    //userLogin("creator", "12345");
  
    return (
    <>
    <div className='loginForm'>
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
        <p>
          <label>Username:
              <input name="username" type="text" value ={username} required onChange={(event)=>
              {
                  console.log("change");
                  setUsername(event.target.value);
              }}/>
          </label>
        </p>
        <p>
          <label>Password:
              <input name="password" type="password" value={password} required onChange={(event)=>
              {
                  setPassword(event.target.value);
              }}/>

          </label>
        </p>
        <button type="submit">Log In</button>
        {submitMessage && <p>{submitMessage}</p>}
        </form>
    <Link to="/registration">New user? Register here</Link>
    <Link to="/">Go Back</Link>
    </div>
    </>
  )
}
