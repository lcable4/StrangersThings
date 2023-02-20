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
                        <span>Price: {post.price}</span>
                        <span>{post.description}</span>
                        <span>Location: {post.location}</span>
                        <span>Active: {post.active ? "Yes" : "No"}</span>
                    </div>
                )
            }) : null
        }
    </div>
  )
}
export default AllPosts