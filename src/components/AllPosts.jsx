import React, {useEffect, useState} from 'react'
import { getAllPosts, deletePost } from '../apiAdapters'
import { Link, useNavigate } from "react-router-dom"


const AllPosts = () => {
  
    
    let [posts, setPosts] = useState([]);
    let [searchText, setSearchText] = useState("");
    const searchInput = React.useRef(null);


    async function search()
    {
        let searchPosts = await getAllPosts();
        console.log(searchPosts)
        let holder = [];
        for(let i = 0; i < searchPosts.length; i++)
        {
            if(searchText === searchPosts[i].title.slice(0, searchText.length))
            {
                holder.push(searchPosts[i]);
            }
        }
        console.log(holder)
        setPosts(holder);
    }

    const SearchBar = ()=>  
    {
    return(
        <div className='searchBar'>
            <form onSubmit={(event)=>
                {
                    event.preventDefault();
                    search(searchText);
                }}>
                <input ref={searchInput} className='searchBarInput' name="search" type="text" placeholder="Search posts by name" value={searchText} onChange={(event)=>{setSearchText(event.target.value);}}/>
                <button type="submit" className='btns'>search</button>
        </form> 
    </div>
  )
}
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
    
    useEffect(() => {
        {searchInput.current.focus();}
    }, [searchText])

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
        <h1 className='allPostsTitle'>All Posts</h1>
        <br/>
        <SearchBar/>
        {   

            posts.length ? posts.map((post, idx) => {
                return (
                    <div key={idx} className="allPosts">
                        <h3 className='allPostsTitles'>{post.title}</h3>
                        <p>Price: {post.price}</p>
                        <p>{post.description}</p>
                        <p>Location: {post.location}</p>
                        <p>Active: {post.active ? "Yes" : "No"}</p>
                        <Link to={`/details/${post._id}`}><button className='btns'>See details</button></Link>
                        {
                            post.isAuthor ? <><button className='btns' onClick={()=>DeleteAndUpdate(post._id, idx)}>Delete</button> <Link to={`/posts/edit/${post._id}`}><button className='btns'>Edit</button></Link>S </>: null
                        }
                    </div>
                )
            }) : null
        }
    </div>
  )
}
export default AllPosts