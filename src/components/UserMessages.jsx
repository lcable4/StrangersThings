import React, {useState, useEffect} from 'react'
import {displayMessages, getAllPosts} from '../apiAdapters/index'
import { Link } from 'react-router-dom'
import { sendMessage } from './Details'
import Navbar from './Navbar';

export default function UserMessages()
{
    let [messages, setMessages] = useState([]);
    let [reply, setReply] = useState([]);
    let [submitInfo, setSubmitInfo] = useState([])

    async function getMyPosts()
    {
        try
        {
            let result = await getAllPosts();
            let messages = await displayMessages();
            let holder = [];
            let messageHolder = [];
            for(let i = 0; i < result.length; i++)
            {
                console.log(result[i].isAuthor)
                if(result[i].isAuthor)
                {
                    holder.push(result[i]);
                }
            }
            for(let i = 0; i < messages.length; i++)
            {
                for(let j = 0; j < holder.length; j++)
                {
                    if(messages[i].post._id === holder[j]._id)
                    {
                        messageHolder.push(messages[i]);
                    }
                }
            }
            setMessages(messageHolder);
        }
        catch(e)
        {
            console.error(e);
        }
    }
   
    console.log(messages)
   
    async function sendReply (postId, content) {
        try {
            await sendMessage(postId, content);
            setReply('')
            setSubmitInfo('reply sent succesfully')
            await getMyPosts();
        } catch (error) {
            console.log(error);
            setSubmitInfo('error try again')
        }
    }

    useEffect(()=>
    {
        getMyPosts();
    }, [])
    return(
        <>
        <Navbar/>
        <div className='userMessagesContainer'>
            <div className='userMsgBtn'>
                <Link to="/User">
                    <button className='btns'><h1>My Posts</h1></button>
                </Link> 
                <button className='btns'><h1>My Messages</h1></button>
            </div>
        {
            messages.length ? messages.map((message, idx)=>
            {
            return(
                
                <div key={idx} className='userMsgDetails'>
                    <h3>Message from: {message.fromUser.username}</h3>
                    <h3>Responding to your post: {message.post.title}</h3>
                    <p>{message.content}</p>
                <br/>              
                <form className="replyMsg" onSubmit={(event)=>
                    {
                        event.preventDefault();
                        sendReply(message.post._id, reply);
                    }
                    }>
                    <input required name="reply" type="text" value={reply} onChange={(event)=>
                    {
                        setReply(event.target.value);
                    }}></input>
                
                    <button className='btns' type="submit">Reply</button>
                    {submitInfo && <p>{submitInfo}</p>}
                </form>            
                </div>            
                )
                
             }): <div>
                    <h3>You don't have any messages</h3>
                </div>
    
    }
    <Link className="goBackBtns" to="/">Go Back</Link>
    </div>
    </>
    )

}