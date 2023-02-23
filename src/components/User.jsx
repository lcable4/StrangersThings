import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {makeNewPost, getAllPosts, deletePost, displayMessages} from '../apiAdapters/index'


export default function User()
{
    let [myPosts, setMyPosts] = useState([]);

    const navigate = useNavigate();

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
            console.log(myPosts)
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
        const index = myPosts.indexOf(idx);
        myPosts.splice(index, 1);
        let currentPosts = [...myPosts];
        setMyPosts(currentPosts)
        navigate("/User");
    }

    console.log("load")
    return(
        <div className='userPostContainer'>
            <div className='userPostBtn'>
                <button><h1>My Posts</h1></button>
                <Link to="/User/Messages"><button><h1>My Messages</h1></button></Link>
            </div>
            
                {
                    myPosts.length ? myPosts.map((post, idx)=>
                    {
                        console.log(myPosts.isAuthor)
                        return(
                          <div key={idx} className="myPosts">
                                <h3>{post.title}</h3>
                                <p>Price: {post.price}</p>
                                <p>{post.description}</p>
                                <p>Location: {post.location}</p>
                                <p>Active: {post.active ? "Yes" : "No"}</p>
                                <Link to="/User"><button onClick={()=>DeleteAndUpdate(post._id, idx)}>Delete</button></Link> <button>Edit</button> 
                           </div>
                        )
                  }) : <div>
                            <h3>
                            You haven't made any posts yet
                            </h3>
                            <p>Make a new post <Link to="/newpost">here</Link></p>
                        </div>
             }
             <Link to="/">Go Back</Link>
            
        </div>
    )
}