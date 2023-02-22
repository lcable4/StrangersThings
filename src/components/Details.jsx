import React, { useState, useEffect } from 'react'
import {Link, useParams} from "react-router-dom"
import { getAllPosts } from '../apiAdapters';

export default function Details() {
  
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function fetchPost() {
            try {
                const allPosts = await getAllPosts();
                const foundPost = allPosts.find((p) => p._id === postId);
                setPost(foundPost);
            } catch (error) {
                console.log(error)
            }
        }
        fetchPost();
    }, [postId]);

    return (
    <>
    <div>
        <h1>Post Details</h1>
        {
            post ? (
                <>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <p>{post.price}</p>
                <p>{post.location}</p>
                </>
            ) : (
                <p>loading</p>
            )
        }
    </div>
    <Link to="/">Go Back</Link>
    </>
  )
}
