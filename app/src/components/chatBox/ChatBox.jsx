import "./chatBox.css"
import Message from "../../components/chatBox/Message";
import InputEmoji from "react-input-emoji";
import {useRef, useState, useEffect } from "react";
import axios from "axios";

export default function ChatBox({conversation, currentUser, setSendMessage, receivedMessage}) {
    const [user, setUser] = useState (null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const scroll = useRef()

    // fetching data for header
    useEffect (() => {
        const friendId = conversation?.members?.find((m)=>m !== currentUser?._id);
    
        const getUser = async () => {
          try {
            const res = await axios("/users?userId=" + friendId);
            console.log(res)
            setUser(res.data);
          } catch (err) {
            console.log(err);
          }     
         };
          if(conversation !== null) getUser();
       },[currentUser, conversation]);

    //fetch messages
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/messages/"+conversation?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (conversation !== null) getMessages()
    }, [conversation]);

    // Receive Message from parent component
    useEffect(()=> {
        if (receivedMessage !== null && receivedMessage?.conversationId === conversation?._id) {
            setMessages([...messages, receivedMessage]);       
        };
    }, [receivedMessage, conversation?._id,messages]);

    const handleChange = (newMessage)=> {
        setNewMessage(newMessage)
    }

    //send message
    const handleSend = async (e) => {
        e.preventDefault();

        const message = {
            senderId: user?._id,
            text: newMessage,
            conversationId : conversation?._id,
        };

        //send msg to database
        try {
            const res = await axios.post("/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }

        //send message to socket server
        const receiverId = conversation.members.find((m)=>m !== currentUser?._id);
        setSendMessage({...message, receiverId})
    };

    //always scroll to last message
    useEffect(()=> {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
      },[messages])

  return (
    <div className="chatBox-container">
        {conversation? (
         <>
            {/* chat-header */}
            <div className="chat-header">
                <div className="chat-user"> 
                    <div>
                        <img src={user?.profilePicture ? PF+user?.profilePicture : PF+"Person/NoProfileImg.png"} alt="" className="conversationImg" />
                        <div className="conversationName">
                            <span>{user?.name}</span>
                        </div>
                    </div>
                </div>
                <hr style={{ width: "95%", border: "0.1px solid #ececec", marginTop: "20px"}} />
            </div>
            
            {/* chat-body (Messages) */}

            <div className="chat-body"> 
                {messages.map((m) => (
                    <>
                        <div key={m?._id} ref={scroll}>
                            < Message message={m} own={m.senderId === user?._id} />
                        </div>
                    </>
                ))} 
            </div>

            {/* chat-sender */}
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <button className="send-button" onClick={handleSend}>Send</button>
              <input type="file" name="" id="" style={{ display: "none" }}/>
            </div>
         </>
        ) : (
            <span className="chatbox-empty-message">
                Tap on a chat to start conversation...
            </span>
        )}
        
    </div>
  );
};
