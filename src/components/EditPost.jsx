import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {getAllPosts, editPost} from '../apiAdapters/index'
import Navbar from './Navbar'


export default function EditPost()
{
    const {postId} = useParams();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [post, setPost] = useState(false);

    useEffect(() => {
        async function fetchPost() {
            try {
                const allPosts = await getAllPosts();
                const foundPost = allPosts.find((p) => p._id === postId);
                setPost(foundPost);
                setTitle(foundPost.title);
                setPrice(foundPost.price);
                setDescription(foundPost.description);
                setLocation(foundPost.location);
            } catch (error) {
                console.log(error)
            }
        }
        fetchPost();
    }, [postId]);


    return(
        <>
        <Navbar />
        <div className='newPostForm'>
            <h1 className='newPostTitle'>Edit a listing</h1>
        <form className="newPostDetails" onSubmit={(event)=>
        {
            event.preventDefault();
            editPost(title,description, price,location, postId);
            setPost(true);
            setTitle('');
            setPrice('');
            setDescription('');
            setLocation('');
        }
        }>
            
                <label>Title:</label>
                    <input required name="title" type="text" value={title} onChange={(event)=>
                    {
                        setTitle(event.target.value);
                    }}></input>
                
           
                <label>Price:</label>
                    <input required name="price" type="text" value={price} onChange={(event)=>
                    {
                        setPrice(event.target.value);
                    }}></input>
                
            
                <label>Description:</label>
                    <input required name="description" type="text" value={description} onChange={(event)=>
                    {
                        setDescription(event.target.value);
                    }}></input>
                
            
                <label>Location:</label>
                    <input required name="location" type="text" value={location} onChange={(event)=>
                    {
                        setLocation(event.target.value);
                    }}></input>
                
                <br/>
                <button className='btns' type="submit">Edit Post</button>
                {post && <p>Post edited successfully!</p>}
            
            
        </form>
            
        <Link className="goBackBtns" to="/User">Go Back</Link>
        </div>
        </>
    )



}