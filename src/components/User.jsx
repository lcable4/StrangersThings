import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {makeNewPost, getAllPosts, deletePost, displayMessages} from '../apiAdapters/index'
import Navbar from './Navbar';


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
        const index = myPosts.indexOf(idx);
        myPosts.splice(index, 1);
        let currentPosts = [...myPosts];
        setMyPosts(currentPosts)
        navigate("/User");
    }

    
    return(
        <>
        <Navbar />
        <div className='userPostContainer'>
            <div className='userBtnDiv'>
                <p>Viewing Posts</p>
                <button className='userPostBtn'>
                    <h1>My Posts</h1>
                </button>
                <Link to="/User/Messages">
                    <button className='userPostBtn'>
                        <h1>My Messages</h1>
                    </button>
                </Link>
            </div>
            
                {
                    myPosts.length ? myPosts.map((post, idx)=>
                    {
                        
                        return(
                          <div key={idx} className="myPosts">
                                <h3>{post.title}</h3>
                                <p>Price: {post.price}</p>
                                <p>{post.description}</p>
                                <p>Location: {post.location}</p>
                                <p>Active: {post.active ? "Yes" : "No"}</p>
                                <Link to={`/details/${post._id}`} className='userLinks'>
                                    <button className='userBtns'>View Post</button>
                                </Link>
                                <Link to={`/posts/edit/${post._id}`} className='userLinks'>
                                    <button className='userBtns'>Edit</button> 
                                </Link>
                                <Link to="/User" className='userLinks'>
                                    <button className='userBtns' onClick={()=>DeleteAndUpdate(post._id, idx)}>Delete</button>
                                </Link>
                           </div>
                        )
                  }) : <div>
                            <h3>
                            You haven't made any posts yet
                            </h3>
                            <p>Make a new post <Link to="/newpost">here</Link></p>
                        </div>
             }
             <Link className="goBackBtns" to="/">Go Back</Link>
            
        </div>
        </>
    )
}