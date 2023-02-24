import React, {useState, useEffect} from 'react'
import {displayMessages, getAllPosts, deletePost} from '../apiAdapters/index'
import { Link } from 'react-router-dom'
import { sendMessage } from './Details'
import Navbar from './Navbar';

export default function UserMessages()
{
    let [messages, setMessages] = useState([]);
    let [reply, setReply] = useState([]);
    let [submitInfo, setSubmitInfo] = useState([]);
    const [messageHolder, setMessageHolder] = useState([]);
    

    async function getMyPosts()
    {
        try
        {
            let result = await getAllPosts();
            let messages = await displayMessages();
            let holder = [];
            let messageHolder = [];
            console.log(messageHolder)

            for(let i = 0; i < result.length; i++)
            {
                
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
            setMessageHolder(messageHolder);
        }

        catch(e)
        {
            console.error(e);
        }
    }
   
    function handleDelete(index) {
        const newMessageHolder = [...messageHolder];
        newMessageHolder.splice(index, 1);
        setMessages(newMessageHolder);
        setMessageHolder(newMessageHolder);
      }

    function GetReplyForm(prop) {
        
        let [messageInputs, setMessageInputs] = useState([]);
        let message = prop.message

        return (
        <form 
        className="replyMsg" 
        onSubmit={(event)=>
            {
                event.preventDefault();
                sendReply(message.post._id, messageInputs);
            }
            }>
            <input 
                required 
                className='userMsgInput'
                name="reply" 
                type="text" 
                value={messageInputs} 
                onChange={(event)=>
                    {
                        setMessageInputs(event.target.value);
                    }}>

            </input>
        
            <button className='userMsgBtns' type="submit">Reply</button>
            {submitInfo && <p>{submitInfo}</p>}
        </form>     
    )
    }
   


    async function sendReply (postId, content) {
        try {
            sendMessage(postId, content);
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
            <div className='userBtnDiv'>
                <p>Viewing Messages</p>
                <Link to="/User" className='userMsgLinks'>
                    <button className='userPostBtn'>
                        <h1>My Posts</h1>
                    </button>
                </Link > 
                <button className='userPostBtn'>
                    <h1>My Messages</h1>
                </button>
            </div>
        {
            messages.length ? messages.map((message, idx)=>
            {
            return(
                
                <div key={idx} className='userMsgDetails'>
                    <h3 className="allPostsTitles">Message from: {message.fromUser.username}</h3>
                    <h3>Responding to your post: {message.post.title}</h3>
                    <p>{message.content}</p>
                    
                <br/>              
                <GetReplyForm message={message} postId={message.post._id} index={idx}/>         
                <button >Delete</button> 
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