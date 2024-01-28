import "./profileModal.css"
import { Modal, useMantineTheme } from '@mantine/core';
import {AuthContext} from "../../context/AuthContext";
import {useContext, useState } from  "react";
import axios from "axios";

export default function ProfileModal({modalOpened, setModalOpened, data}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const theme = useMantineTheme();
  const {user, dispatch} = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [success, setSuccess] = useState(false);

  console.log(file);

  // form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      name,
      username,
      bio,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);

      updatedUser.profilePicture = fileName;

       try {
            await axios.post("/upload", data);
        } catch (err) {
            console.log(err);
        }
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      window.location.replace(`/profile/${user.name}`);
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='25%'
      opened = {modalOpened}
      onClose = {()=>setModalOpened(false)}
    >
      {/* Modal content */}
      <div className="editProfileForm" >
        <h2>Edit Profile</h2>
        <form onSubmit = {handleUpdate}>
          <div className="formInputs1">
            <img className="profilepictureImg"  src={user.profilePicture ? PF + user.profilePicture : PF+"Person/NoProfileImg.png"} alt=""/> 
          </div>
          <div className="formInputs">
            <span> Change Profile Picture </span>
            <input className="editPicture"  type="file" id="file" name="profilePicture" accept=".png,.jpeg,.jpg" onChange={e=>setFile(e.target.files[0])} />
          </div>
          <div className="formInputs">
            <span> Name </span>
            <input type="text" placeholder={user.name} name="name"  onChange={(e) => setName(e.target.value)}  />
          </div>
          <div className="formInputs">
            <span> Username </span>
            <input type="text" placeholder={user.username} name="username"  onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="formInputs">
            <span> Bio </span>
            <input type="text" placeholder={user.bio} name="bio"  onChange={(e) => setBio(e.target.value)}/>
          </div>
          <button className="UpdateBtn" type="submit"> Update </button>
          {success && (
            <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}>
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
    </Modal>
  );
}