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
        <div className='newPostForm'>
        <form onSubmit={(event)=>
        {
            event.preventDefault();
            makeNewPost(title,description, price,location)
        }
        }>
            <p>
                <label>Title:
                    <input required name="title" type="text" value={title} onChange={(event)=>
                    {
                        setTitle(event.target.value);
                    }}></input>
                </label>
            </p>
            <p>
                <label>Price:
                    <input required name="price" type="text" value={price} onChange={(event)=>
                    {
                        setPrice(event.target.value);
                    }}></input>
                </label>
            </p>
            <p>
                <label>Description:
                    <input required name="description" type="text" value={description} onChange={(event)=>
                    {
                        setDescription(event.target.value);
                    }}></input>
                </label>
            </p>
            <p>
                <label>Location:
                    <input required name="location" type="text" value={location} onChange={(event)=>
                    {
                        setLocation(event.target.value);
                    }}></input>
                </label>
            </p>
        </form>
            <button type="submit">Post</button>
        <Link to="/">Go Back</Link>
        </div>
        </>
    )
}

