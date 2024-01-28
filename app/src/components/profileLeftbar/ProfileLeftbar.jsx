import "./profileLeftbar.css"
import {Explore, SlowMotionVideoOutlined, Group,BookmarkBorder,StarOutline, AddBox,Event,Collections, Chat,Autorenew} from "@mui/icons-material";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import { logoutCall } from "../../apiCalls";
import {useNavigate} from "react-router-dom";

export default function ProfileLeftbar(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER; 
    const [friends, setFriends] = useState([]);
    const {user, dispatch, isFetching} = useContext(AuthContext);
    const navigate = useNavigate();
    
    
    const handleLogout  = (e) => {
    e.preventDefault();
    logoutCall(dispatch);
    navigate("/login");
    };
    

useEffect(() => {
    const getFriends =  async () => {
        try {
            const friendList = await axios.get("/users/friends/" + user._id );
            setFriends(friendList.data);
        } catch(err) {
            console.log(err);
        }
    };
    getFriends();
}, [user]);

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
                <div className="leftbarBtns">
                    <button className="leftbarButton"> Show More </button>
                    <button className="leftbarButton" onClick={handleLogout}>{isFetching ? (<Autorenew/>) : ("Logout")} </button>
                </div>
                <hr className="leftbarHr"/>
                <h3>Following</h3>
                <div className="leftbarFollowings">
                {friends.map((friend) => (
                    <Link key={friend._id} to={`/profile/${friend.name}`} style={{ textDecoration: "none" }} >
                        <div className="leftbarFollowing">
                            <img
                                src={friend.profilePicture ? PF + friend.profilePicture : PF + "Person/NoProfileImg.png"}
                                alt="" className="leftbarFollowingImg"
                            />
                            <span className="leftbarFollowingName">{friend.name}</span>
                        </div>
                    </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}