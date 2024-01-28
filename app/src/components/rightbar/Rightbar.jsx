import "./rightbar.css"
//import { Users } from "../../dummyData";
import {Search} from "@mui/icons-material"
import { useState, useEffect,useContext,useRef } from "react";
import axios from "axios"
import {AuthContext} from "../../context/AuthContext";
import Conversation from "../../components/conversations/Conversation";
import {Link} from "react-router-dom"
import {io} from 'socket.io-client';

export default function Rightbar(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();

    // Connect to Socket.io
  useEffect(() => {
    socket.current = io('https://social-media-socket-pr5c.onrender.com')
    socket.current.emit("new-user-add", user._id)
    socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
      });
  }, [user])

    // Get the chat in chat section
  useEffect(()=> {
    const getChats = async () => {
        try {
            const res = await axios.get("/conversations/" + user?._id);
            setChats(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    getChats();
  }, [user?._id])

    const checkOnlineStatus = (conversation) => {
    const conversationMember = conversation.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === conversationMember);
    return online ? true : false;
  };

  console.log(currentChat);

  const searchHandle = async(event) => {
    let key = event.target.value;
    let result = await fetch(`http://localhost:5000/api/users/search/${key}` )
        result = await result.json();
        if (result) {
            setCurrentChat(result);
        }
  }
  
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="rightbarTopText">
                    <h3>Sponsored</h3>
                    <span className="createAdText">Create Ad</span>
                </div>
                <div>
                    <img src={`${PF}/Ads.jpg`} alt="" className="rightbarImg"/>
                    <div className="rightbarText">
                        <p style={{fontSize:"16px"}}>Luxry Cosmetics</p>
                        <p style={{fontSize:"13px", marginTop:"10px", color: "#aaa"}}>Your pathway to stunning and immaculate beauty and made sure your skin
                             is exfoliating skin and shining like light.</p>
                    </div>
                </div>
            </div>
            <div className="rightbarWrapper">
                <div className="heading">
                    <h3>Messages</h3>
                </div>
                <div className="search-bar">
                    <Search className="search-Icon"/>
                    <input type="text" placeholder="Search for friend"  className="search-Input" id="search-form" onChange={searchHandle}/>
                </div>
                <div className="category">
                    <h6 className="active">Primary</h6>
                    <h6 >General</h6>
                    <h6 className="message-requests">Request(7)</h6>
                </div>
                <div className="message">
                    <Link to="/chat" style={{ textDecoration: "none" }}>
                        {chats.map((c)=>(
                            <div key={c?._id} onClick={() => setCurrentChat(c)}>
                                <Conversation conversation={c} currentUser={user} online={checkOnlineStatus(c)}/>
                            </div>
                        ))}
                    </Link>
                </div>
            </div>
        </div>     
    )
}