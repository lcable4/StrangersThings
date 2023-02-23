import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {makeNewPost} from '../apiAdapters/index'



export default function NewPost()
{
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [post, setPost] = useState(false);

    return(
        <>
        <div className='newPostForm'>
            <h1 className='newPostTitle'>Make a listing</h1>
        <form className="newPostDetails" onSubmit={(event)=>
        {
            event.preventDefault();
            makeNewPost(title,description, price,location);
            setPost(true);
            setTitle('');
            setPrice('');
            setDescription('');
            setLocation('');
        }
        }>
            
                <label>Title:
                    <input required name="title" type="text" value={title} onChange={(event)=>
                    {
                        setTitle(event.target.value);
                    }}></input>
                </label>
           
                <label>Price:
                    <input required name="price" type="text" value={price} onChange={(event)=>
                    {
                        setPrice(event.target.value);
                    }}></input>
                </label>
            
                <label>Description:
                    <input required name="description" type="text" value={description} onChange={(event)=>
                    {
                        setDescription(event.target.value);
                    }}></input>
                </label>
            
                <label>Location:
                    <input required name="location" type="text" value={location} onChange={(event)=>
                    {
                        setLocation(event.target.value);
                    }}></input>
                </label>
                <br/>
                <button type="submit">Post</button>
                {post && <p>Post sent successfully!</p>}
            
            
        </form>
            
        <Link to="/">Go Back</Link>
        </div>
        </>
    )
}

