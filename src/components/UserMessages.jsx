import React, {useState, useEffect} from 'react'
import {displayMessages} from '../apiAdapters/index'


export default function UserMessages()
{
    let [messages, setMessages] = useState([]);
    console.log(messages)

    async function getMessages()
    {
        try
        {
            let result = await displayMessages();
            console.log(result);
            setMessages(result);
        }
        catch(e)
        {
            console.error(e);
        }
    }
    useEffect(()=>
    {
        getMessages();
    }, [])
    return(
        <div>
        {
        messages.length ? messages.map((message, idx)=>
        {
            return(
                <div key={idx}>
                    <h3>{message.post.title}</h3>
                </div>
            )
        }):null
    }
    </div>
    )

}