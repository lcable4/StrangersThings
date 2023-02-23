import React, {useEffect, useState} from 'react'
import { getAllPosts, deletePost } from '../apiAdapters'
import { Link, useNavigate } from "react-router-dom"


const AllPosts = () => {
  
    
    let [posts, setPosts] = useState([]);

    async function getPosts() {
        try {
          const result = await getAllPosts();
          setPosts(result);
          console.log(result)
        } catch (err) {
          console.log(err);
        }
    }
    
    useEffect(() => {
        getPosts();
    }, [])
    

    function DeleteAndUpdate(postID, idx)
    {
        deletePost(postID);
        const index = posts.indexOf(idx);
        posts.splice(index, 1);
        let currentPosts = [...posts];
        setPosts(currentPosts)
        navigate("/");
    }

    const navigate = useNavigate();
    return (
    <div className='allPostsContainer'>
        <h1>All Posts</h1>
        {   

            posts.length ? posts.map((post, idx) => {
                return (
                    <div key={idx} className="allPosts">
                        <h3>{post.title}</h3>
                        <p>Price: {post.price}</p>
                        <p>{post.description}</p>
                        <p>Location: {post.location}</p>
                        <p>Active: {post.active ? "Yes" : "No"}</p>
                        <Link to={`/details/${post._id}`}><button>See details</button></Link>
                        {
                            post.isAuthor ? <><button onClick={()=>DeleteAndUpdate(post._id, idx)}>Delete</button> <button>Edit</button> </>: null
                        }
                    </div>
                )
            }) : null
        }
    </div>
  )
}
export default AllPosts