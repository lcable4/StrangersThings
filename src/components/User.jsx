import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import {makeNewPost, getAllPosts, deletePost, displayMessages} from '../apiAdapters/index'


export default function User()
{
    let [myPosts, setMyPosts] = useState([]);

    async function getMyPosts()
    {
        try
        {
            let result = await getAllPosts();
            let holder = [];
            for(let i = 0; i < result.length; i++)
            {
                console.log(result[i].isAuthor)
                if(result[i].isAuthor)
                {
                    holder.push(result[i]);
                }
            }
            setMyPosts(holder);
        }
        catch(e)
        {
            console.error(e);
        }
    }

    useEffect(()=>
    {
        getMyPosts();
    },[])

    function DeleteAndUpdate(postID, idx)
    {
        deletePost(postID);
        const index = posts.indexOf(idx);
        posts.splice(index, 1);
        let currentPosts = [...posts];
        setPosts(currentPosts)
        navigate("/User");
    }

    console.log("load")
    return(
        <div>
            <button><h1>My Posts</h1></button> <Link to="/User/Messages"><button><h1>My Messages</h1></button></Link>
            <div>
                {
                    myPosts.length ? myPosts.map((post, idx)=>
                    {
                        console.log(myPosts)
                        return(
                          <div key={idx} className="myPosts">
                              <h3>{post.title}</h3>
                              <span>Price: {post.price}</span>
                              <span>{post.description}</span>
                               <span>Location: {post.location}</span>
                              <span>Active: {post.active ? "Yes" : "No"}</span>
                                <button onClick={()=>DeleteAndUpdate(post._id, idx)}>Delete</button> <button>Edit</button> 
                           </div>
                        )
                  }) : null
             }
            </div>
        </div>
    )
}