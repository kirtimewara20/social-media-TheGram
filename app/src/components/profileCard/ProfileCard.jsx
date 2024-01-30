import "./profileCard.css"
import {Edit} from "@mui/icons-material"
import {useState,useEffect,useContext } from  "react"
import ProfileModal from "../profileModel/ProfileModel";
import axios from "axios";
import { useParams } from "react-router";
import {AuthContext} from "../../context/AuthContext";
import {API_URL} from "../../config"

export default function ProfileCard({posts}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:currentUser, dispatch} = useContext(AuthContext);
  const [modalOpened, setModalOpened] = useState(false);
  const name = useParams().name;
  const[user, setUser] = useState({});
  const [followed, setFollowed] = useState(currentUser?.following?.includes(user?.id));

  useEffect(() => {
    const fetchUser = async () => {
      if (name === user.name){
        setUser(user)
      } else {
            try {
              const res = await axios.get(`${API_URL}/users?name=${name}`);
              setUser(res.data);
          } catch(err){
              console.log('Error fetching user:', err);
          }
      }
    };
    fetchUser();
}, [name, currentUser, user]);

  const handleFollow = async () => {
    try {
        if (followed) {
          await axios.put(`${API_URL}/users/${user._id}/unfollow`, {userId: currentUser?._id}, );
          dispatch({type: "UNFOLLOW", payload: user._id });
        } else {
          await axios.put(`${API_URL}/users/${user._id}/follow`, {userId: currentUser?._id});
          dispatch({type: "FOLLOW", payload: user._id});    
        }
        setFollowed(!followed);
        window.location.reload()
      } catch (err) {
          console.error('Error following/unfollowing user:', err);
      }
  };

  return (
    <div className="ProfileCard">
        <div>
            <div className="ProfileCardWrapper">
                <div className="ProfileCardTop">
                    <img className="ProfileCardImg" src={ user.profilePicture ? PF + user.profilePicture : PF+"Person/NoProfileImg.png"} alt="" /> 
                    <div className="ProfileCardInfo">
                        <h4 className="ProfileCardName">{user.name}</h4>
                        <span className="profileCardUsername">{user.username}</span>
                    </div>
                    {currentUser?.name === user.name  ?  
                    (<button className="editProfileItem">
                        <Edit className="editProfileBtn" onClick={()=>setModalOpened(true)}/>
                        <span className="editProfileText">Edit Profile</span>
                        <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user}/>
                    </button >) :
                    (<button className="followBtn" onClick={handleFollow}> 
                      {followed ? "Unfollow" : "Follow"}
                    </button> )
                    }
                </div>
                <span className="ProfileCardBio">{user.bio}</span>
            </div>
            <div className="followStatus">
              <hr />
              <div>
                <div className="follow">
                  <span>{user?.following?.length}</span>
                  <span>Following</span>
                </div>
                <div className="vl"></div>
                <div className="follow">
                  <span>{user?.followers?.length}</span>
                  <span>Followers</span>
                </div>
                <>
                    <div className="vl"></div>
                    <div className="follow">
                      <span>{posts?.filter((post)=>post.userId === user._id).length}</span>
                      <span>Posts</span>
                    </div>
                  </>
             </div>
             <hr />
          </div>    
      </div>
    </div>
  )
}
