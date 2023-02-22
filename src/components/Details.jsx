import React, { useState, useEffect } from 'react'
import {Link, useParams} from "react-router-dom"
import { getAllPosts, messages } from '../apiAdapters';



export default function Details() {
  
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchPost() {
            try {
                const allPosts = await getAllPosts();
                const foundPost = allPosts.find((p) => p._id === postId);
                setPost(foundPost);
            } catch (error) {
                console.log(error)
            }
        }
        fetchPost();
    }, [postId]);

    function sendMessage(postId, content) {
        

        
        messages(postId, content)
        
    }
    return (
    <>
        <div>
            <h1>Post Details</h1>
            {
                post ? (
                    <>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <p>{post.price}</p>
                    <p>{post.location}</p>
                    </>
                ) : (
                    <p>loading</p>
                )
            }
        </div>
        <form onSubmit={(e) => {
                e.preventDefault();
                sendMessage(postId, message);
            }}>
                
                    <label>
                        Send a message:
                        <input
                            name="message"
                            type="text"
                            value={message}
                            required
                            minLength="5"
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                        />
                    </label>  
                    <button type="submit">send message</button>  
                
            </form>
    <Link to="/">Go Back</Link>
    </>
    )
}
