import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {makeNewPost} from '../apiAdapters/index'



export default function NewPost()
{
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    return(
        <>
        <div>
        <form onSubmit={(event)=>
        {
            event.preventDefault();
            makeNewPost(title,description, price,location)
        }
        }>
            <label>Title:
                <input name="title" type="text" value={title} onChange={(event)=>
                {
                    setTitle(event.target.value);
                }}></input>
            </label>
            <label>Price:
                <input name="price" type="text" value={price} onChange={(event)=>
                {
                    setPrice(event.target.value);
                }}></input>
            </label>
            <label>Description:
                <input name="description" type="text" value={description} onChange={(event)=>
                {
                    setDescription(event.target.value);
                }}></input>
            </label>
            <label>Location:
                <input name="location" type="text" value={location} onChange={(event)=>
                {
                    setLocation(event.target.value);
                }}></input>
            </label>
            <button type="submit">Post</button>
        </form>
        </div>
        <Link to="/">Go Back</Link>
        </>
    )
}

