import "./profile.css"
import Topbar from "../../components/topbar/Topbar";
import ProfileLeftbar from "../../components/profileLeftbar/ProfileLeftbar";
import ProfileFeed from "../../components/profileFeed/ProfileFeed";
import ProfileRightbar from "../../components/profileRightbar/ProfileRightbar";

export default function Profile() {
 
  return (
        <>
            <Topbar />
            <div className="profileContainer">
              <ProfileLeftbar />
              <ProfileFeed />
              <ProfileRightbar/>
            </div>
        </>
  )
}
