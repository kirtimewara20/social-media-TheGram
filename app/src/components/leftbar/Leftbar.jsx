import "./leftbar.css"
import {Explore, SlowMotionVideoOutlined, Group, BookmarkBorder, StarOutline, AddBox, Event, Collections, Chat} from "@material-ui/icons";
import Friends from "../friends/Friends";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

export default function Leftbar(){
    const [friends, setFriends] = useState([]);
    const {user} = useContext(AuthContext);
    const [createChat, setCreateChat] = useState([]);

useEffect(() => {
    const getFriends =  async () => {
        try {
            const friendList = await axios.get("/users/friends/" + user._id);
            setFriends(friendList.data);
        } catch(err) {
            console.log(err);
        }
    };
    getFriends();
}, [user._id]);
    
    //create chats 
    const createChats = async (receiverId) => {
        try {
            const res = await axios.post("/conversations", {
                senderId: user._id,
                receiverId: receiverId,
            });
            setCreateChat(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    console.log(createChat)

    return(
        <div className="leftbar">
            <div className="leftbarWrapper">
                <ul className="leftbarList">
                    <li className="leftbarListItem">
                        <Explore className="leftbarIcon"/>
                        <span className="leftbarListItemText">Explore</span>
                    </li>
                    <li className="leftbarListItem">
                        <SlowMotionVideoOutlined className="leftbarIcon"/>
                        <span className="leftbarListItemText">Reels</span>
                    </li>
                    <li className="leftbarListItem">
                        <Group className="leftbarIcon"/>
                        <span className="leftbarListItemText">Group</span>
                    </li>
                    <li className="leftbarListItem">
                        <AddBox className="leftbarIcon"/>
                        <span className="leftbarListItemText">Create</span>
                    </li>
                    <li className="leftbarListItem">
                        <Event className="leftbarIcon"/>
                        <span className="leftbarListItemText">Event</span>
                    </li>
                    <li className="leftbarListItem">
                        <Collections className="leftbarIcon"/>
                        <span className="leftbarListItemText">Collections</span>
                    </li>
                    <li className="leftbarListItem">
                        <StarOutline className="leftbarIcon"/>
                        <span className="leftbarListItemText">Favorites</span>
                    </li>
                    <li className="leftbarListItem">
                        <BookmarkBorder className="leftbarIcon"/>
                        <span className="leftbarListItemText">Saved</span>
                    </li>
                    <li className="leftbarListItem">
                        <Chat className="leftbarIcon"/>
                        <span className="leftbarListItemText">Message</span>
                    </li>
                </ul>
                <button className="leftbarButton">Show More</button>
                <hr className="leftbarHr"/>
                <h3>Friends!</h3>
                <h3 style={{color:"#aaa", fontWeight:"400",fontSize:"15px"}}>Follow to start Chat....</h3>
                <ul className="leftbarFriendList">
                    {friends.map((friend)=>(
                        <Friends key={friend._id} user={friend} createChat={createChats}/>
                    ))}
                </ul>    
            </div>
        </div>
    )
}         