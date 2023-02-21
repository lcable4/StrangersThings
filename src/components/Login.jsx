import React, {useState} from 'react'
import { Link } from "react-router-dom"
async function userLogin(name, pssword) {
    try {
        const username = name;
        const password = pssword; 
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
        }).then(response => response.json())
        .then(result=>{
            console.log(result);
            return result;
        })
        // const data = await response.json();
        // localStorage.setItem('token', data.data.token); 
    } catch (error) {
        console.log(error);
    }
}

export default function Login() {
  
    const [login, setLogin] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    //userLogin("creator", "12345");
  
    return (
    <>
    <div>
        <h1>Login</h1>
        <form onSubmit={(event)=>
        {
            event.preventDefault();
            let response = userLogin(username, password);
            console.log(response); 
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
