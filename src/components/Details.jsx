import React, { useState, useEffect } from 'react'
import {Link, useParams} from "react-router-dom"
import { getAllPosts, messages } from '../apiAdapters';

function sendMessage(postId, content) {
        

        
    messages(postId, content)
    
}

const MessageForm = (props) =>
{
    const [message, setMessage] = useState('');

    const postId = props.postId

    return(
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
                            console.log(message)
                        }}
                    />
                </label>  
                <button type="submit">send message</button>  
            
        </form>
    )
}

export default function Details() {
  
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    

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
                    {post.isAuthor ? <p>Owned by you</p> : <MessageForm postId={postId}/>}
                    </>
                ) : (
                    <p>loading</p>
                )
            }
        </div>
       
    <Link to="/">Go Back</Link>
    </>
    )
}
