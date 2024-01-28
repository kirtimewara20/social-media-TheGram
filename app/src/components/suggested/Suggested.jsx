import "./suggested.css"
import {useContext, useState} from "react"
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Suggested({user}) {
  const { user: currentUser, dispatch} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; 
  const [followed, setFollowed] = useState(currentUser?.following?.includes(user?.id));

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {userId: currentUser?._id}, );
        dispatch({type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {userId: currentUser?._id});
        dispatch({type: "FOLLOW", payload: user._id})
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  return (
    <>
      {user?.name !== currentUser?.name && (
        <li className="rightbarSuggested">
            <div className="rightbarSuggestedItems">
              <Link to={`/profile/${user?.name}`} >
                <img className="rightbarSuggestedImg" src={user?.profilePicture ? PF+user.profilePicture : PF+"Person/NoProfileImg.png"} alt="" />
              </Link>
              <span className="rightbarSuggestedName">{user?.name}</span>
            </div>
              <button className="followBtn" onClick={handleFollow}>
                {followed ? "Unfollow" : "Follow"}
              </button>
        </li>
        )}
    </>
  )
}
