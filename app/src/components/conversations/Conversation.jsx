import "./conversation.css"
import { useState, useEffect } from "react";
import axios from "axios";

export default function Conversation({conversation, currentUser, online}) {
   const [user, setUser] = useState (null);
   const PF = process.env.REACT_APP_PUBLIC_FOLDER; 

   useEffect (() => {
    const friendId = conversation.members.find((m)=>m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }   
     };
     getUser();
   },[currentUser, conversation])
   
  return (
    <>
        <div className="conversation">
            <div>
              {online && <div className="online-dot"></div>}
                <img src={user?.profilePicture ? PF+user?.profilePicture : PF+"Person/NoProfileImg.png"} alt="" className="conversationImg" />
                <div className="conversationName">
                    <span>{user?.name}</span>
                    <span style={{color: online?"#51e200":"", fontSize:"0.8rem"}}>{online? "Online" : "Offline"}</span>
                </div>
            </div>
        </div>
        <hr style={{ width: "85%", border: "0.1px solid #ececec", margin:"10px"}}/>
    </>
  );
};
