import React, { useState, useEffect } from 'react'
import {Link, useParams} from "react-router-dom"
import { getAllPosts, messages } from '../apiAdapters';
import Navbar from './Navbar';

export function sendMessage(postId, content) {
        

        
    messages(postId, content)
    
}

const MessageForm = (props) =>
{
    const [message, setMessage] = useState('');
    const [messageSent, setMessageSent] = useState(false);

    const postId = props.postId

    
    const sendMessageHandler = async (postId, message) => {
        try {
            await sendMessage(postId, message);
            setMessage('');
            setMessageSent(true);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <form className="sendMsgForm" onSubmit={(e) => {
            e.preventDefault();
            sendMessageHandler(postId, message);
        }}>
            
                <label className='sendMsgLabel'>
                    Send a message:
                    <br/>
                    <textarea 
                        name="message"
                        type="text"
                        className="sendMsgInput"
                        value={message}
                        required
                        minLength="5"
                        onChange={(e) => {
                            setMessage(e.target.value);
                            console.log(message)
                        }}
                    />
                </label>  
                <br/>
                <button type="submit" className='btns'>Send Message</button>  
                {messageSent && <p>Message sent successfully!</p>}
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

    console.log(post)

    function showMessage()
    {
        console.log(localStorage.getItem("token"))
        if(localStorage.getItem("token") != null)
        {
            return true;
        }
        return false;
    }
    
    return (
    <>
        <Navbar />
        <div className='postDetailContainer'>
            <h1>Post Details</h1>
            {
                post ? (
                    <div className='postDetails'>
                    <h3 className='postTitle'>{post.title}</h3>
                    <h4>Posted by: {post.author.username}</h4>
                    <p>{post.description}</p>
                    <p>price: {post.price}</p>
                    <p>location: {post.location}</p>
                    {
                        post.isAuthor ? <p>Owned by you</p> : null
                    }
                    {
                        showMessage() ? <MessageForm postId={postId}/> : null
                    }
                    </div>
                ) : (
                    <p>loading</p>
                )
            }
            <Link className="goBackBtns" to="/">Go Back</Link>
        </div>
       
        
    </>
    )
}
