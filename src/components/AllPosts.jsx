import React, {useEffect, useState} from 'react'
import { getAllPosts } from '../apiAdapters'
import { Link } from "react-router-dom"


const AllPosts = () => {
  
    let [posts, setPosts] = useState([]);

    async function getPosts() {
        try {
          const result = await getAllPosts();
          setPosts(result);
        } catch (err) {
          console.log(err);
        }
    }
    
    useEffect(() => {
        getPosts();
    }, [])
   
    
    return (
    <div>
        <h1>All Posts</h1>
        {
            posts.length ? posts.map((post, idx) => {
                return (
                    <div key={idx} className="allPosts">
                        <h3>{post.title}</h3>
                        <span>{post.active ? "still active" : "not active"}</span>
                        <span>{post.description}</span>
                        <span>{post.price}</span>
                        <span>{post.location}</span>
                    </div>
                )
            }) : null
        }
    </div>
  )
}
export default AllPosts