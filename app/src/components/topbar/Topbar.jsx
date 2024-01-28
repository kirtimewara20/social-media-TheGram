import "./topbar.css"
import { Search, Home, Timeline, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import { useContext } from "react";

export default function Topbar() {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return(
        <div className="topbarContainer">
            <Link to="/">
                <img src="/assets/Logo.jpg" alt="" className="logoImg" />
            </Link>
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">The Gram</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input placeholder="Search for friend, post or video" className="searchInput" ></input>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <Link to = "/" style={{textDecoration:"none"}}>
                        <span className="topbarLink"><Home/></span>
                    </Link>
                    <span className="topbarLink"><Timeline/></span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        < Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <Link to="/chat" style={{textDecoration:"none"}}>
                        <div className="topbarIconItem">
                            <Chat />
                            <span className="topbarIconBadge">2</span>
                        </div>
                    </Link>
                    <div className="topbarIconItem">
                        < Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <div className="topbarProfile">
                    <img src={user && user.profilePicture ? PF + user.profilePicture : PF+"Person/NoProfileImg.png"} alt="" className="topbarImg" />
                    <Link to={user ? `/profile/${user.name}` : '/'} style={{textDecoration:"none", marginTop:"8px"}}>
                        <span className="topbarUsername">{user ? user.name : 'user'}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}