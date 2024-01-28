import "./profileRightbar.css"
import { Users } from "../../dummyData";
import Suggested from "../suggested/Suggested";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

export default function ProfileRightbar(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext);
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/users/suggested/user/" + user?._id);
                setUsers(res.data);
            } catch(err){
                console.error('Error fetching user:', err);
            }
        };
        fetchUser();
    }, [user?._id]);

    return(
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="rightbarTopText">
                    <h3>Follow requests</h3>
                    <span className="ManageText">Manage</span>
                </div>
                <div>
                <div className="FollowRequestItems">
                {Users.map((ru)=>(
                <>
                    <div className="followRequestUser" key={ru?._id} user={ru} >
                        <img src={PF+ru?.profilePicture} className="FriendsImg" alt=""/>
                        <span className="followRequestUsername">{ru.username}</span>
                    </div>
                    <div className="FollowRequestBtn">
                        <button className="Btn">Confirm</button>
                        <button className="Btn1">Delete</button>
                    </div>
                </>
                ))}
                </div>
            </div>
        </div>
        <div className="rightbarWrapper">
            <div className="rightbarTopText">
                <h3>Suggested for you</h3>
            </div>
            <div>
                <ul className="rightbarSuggestedList">
                    {users.map((u)=>(
                        <Suggested key={u?._id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    </div>     
   )
}