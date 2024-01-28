import "./profileFeed.css"
import Share from "../share/Share"
import Post from "../post/Post"
import ProfileCard from "../../components/profileCard/ProfileCard"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import {AuthContext} from "../../context/AuthContext";

export default function ProfileFeed(){

    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);
    const name = useParams().name;

    useEffect(()=>{
        const fetchPosts = async () => {
            try{
                const res = await axios.get("/posts/profile/" + name);
                setPosts(res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                }));
            } catch(err){
                console.error('Error fetching posts:', err);
            }
        };
        fetchPosts();
    }, [name]);

    return(
        <div className="feed">
            <div className="feedWrapper">
                <ProfileCard posts={posts}/>
                {name === user?.name  && <Share />}
                {posts.map((p) => (
                    <Post key={p._id} post={p}/>
                ))}
            </div>
        </div>
    )
}