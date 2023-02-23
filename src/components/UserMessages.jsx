import React, {useState, useEffect} from 'react'
import {displayMessages, getAllPosts} from '../apiAdapters/index'
import { Link } from 'react-router-dom'

export default function UserMessages()
{
    let [messages, setMessages] = useState([]);

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

    useEffect(()=>
    {
        getMyPosts();
    }, [])
    return(
        <div className='userMessagesContainer'>
            <div className='userMsgBtn'>
                <Link to="/User"><button><h1>My Posts</h1></button></Link> <button><h1>My Messages</h1></button>
            </div>
        {
        messages.length ? messages.map((message, idx)=>
        {
            return(
                <div key={idx} className='userMsgDetails'>
                <h3>message for: {message.post.title}</h3>
                <p>{message.content}</p>
                </div>
            )
        }):null
    }
    <Link to="/">Go Back</Link>
    </div>
    )

}