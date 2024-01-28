import "./chat.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import ChatBox from "../../components/chatBox/ChatBox";
import {useRef, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import {io} from 'socket.io-client';

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const {user} = useContext(AuthContext);

  const socket = useRef();

 // Connect to Socket.io
  useEffect(() => {
    socket.current = io('https://social-media-socket-pr5c.onrender.com')
    socket.current.emit("new-user-add", user._id)
    socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
      });
  }, [user])

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    }

    );
  }, []);

  // Get the chat in chat section
  useEffect(()=> {
    const getChats = async () => {
        try {
            const res = await axios.get("/conversations/" + user._id);
            setChats(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    getChats();
  }, [user._id])

  const checkOnlineStatus = (conversation) => {
    const conversationMember = conversation.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === conversationMember);
    return online ? true : false;
  };

  return (
    <>
        < Topbar />
        <div className="chat">

            {/* Left Side */}
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <h2>Chats</h2>
                    <input type="text" placeholder="Search for friends" className="chatMenuInput" />
                    <div className="Chat-list">
                        {chats.map((c)=>(
                            <div key={c?._id} onClick={() => setCurrentChat(c)}>
                              <Conversation conversation={c} currentUser={user} online={checkOnlineStatus(c)}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <ChatBox conversation={currentChat} currentUser={user} setSendMessage={setSendMessage} receivedMessage={receivedMessage}/>
                </div>
            </div>
            
        </div>
    </>
  )
}
