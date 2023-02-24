import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {makeNewPost} from '../apiAdapters/index'
import Navbar from './Navbar';



export default function NewPost()
{
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [post, setPost] = useState(false);

    return(
        <>
        <Navbar />
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
            
                <label>Title:</label>
                    <input
                     placeholder="Enter Post Title"
                     className='newPostInput'
                     required 
                     name="title" 
                     type="text" 
                     value={title} 
                     onChange={(event)=>
                        {
                            setTitle(event.target.value);
                        }}>

                    </input>
                
           
                <label>Price:</label>
                    <input 
                    placeholder="Enter price in dollars" 
                    required 
                    className='newPostInput'
                    name="price" 
                    type="text" 
                    value={price} 
                    onChange={(event)=>
                        {
                            setPrice(event.target.value);
                        }}>

                    </input>
                
            
                <label>Description:</label>
                    <input 
                    placeholder="Share some details" 
                    required 
                    className='newPostInput'
                    name="description" 
                    type="text" 
                    value={description} 
                    onChange={(event)=>
                        {
                            setDescription(event.target.value);
                        }}>

                    </input>
                
            
                <label>Location:</label>
                    <input 
                    placeholder="Enter location" 
                    required 
                    className='newPostInput'
                    name="location" 
                    type="text" 
                    value={location} 
                    onChange={(event)=>
                        {
                            setLocation(event.target.value);
                        }}>

                    </input>
                
                <br/>
                <button className='btns' type="submit">Post</button>
                {post && <p>Post sent successfully!</p>}
            
            
        </form>
            
        <Link className="goBackBtns" to="/">Go Back</Link>
        </div>
        </>
    )
}

