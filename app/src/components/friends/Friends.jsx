import "./friends.css";

export default function Friends({user, createChat}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleNameClick = () => {
    createChat(user._id);
    // Reload the page
    window.location.reload('/');
  };

  return (
    <li className="leftbarFriend">
      <div className="leftbarProfileImgConatiner">
        <img className="leftbarFriendImg" src={user.profilePicture ? PF+user.profilePicture : PF+"Person/NoProfileImg.png"} alt=""/>
      </div>
        <span className="leftbarFriendName" onClick={handleNameClick}>{user.name}</span>
    </li>
  );
}
