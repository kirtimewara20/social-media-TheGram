import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

export default function Feed(){
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(()=>{
        const fetchPosts = async () => {
            try{
                const res = await axios.get("/posts/timeline/" + user._id);
                setPosts(res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                }));
            } catch(err){
                console.error('Error fetching posts:', err);
            }
        };
        fetchPosts();
    }, [user._id]);

    return(
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                {posts.map((p) => (
                    <Post key={p._id} post={p}/>
                ))} 
            </div>
        </div>
    )
}