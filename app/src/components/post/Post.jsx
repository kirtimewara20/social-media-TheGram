import "./post.css"
import{Delete, FavoriteBorder, Comment, Share, BookmarkBorder, Favorite} from "@material-ui/icons"
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import moment from 'moment';
import {Link } from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"

export default function Post({ post}) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const[Comments, setComments] = useState([]);
    const[commentText, setCommentText] = useState('');
    const [show, setShow] = useState(false);
    const[user, setUser] = useState({});
    const {user:currentUser} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER; 

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser?._id))
    }, [currentUser?._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/users?userId=${post.userId}`);
                setUser(res.data);
            } catch(err){
                console.error('Error fetching user:', err);
            }
        };
        fetchUser();
    }, [post.userId]);

    useEffect(() => {
        const fetchComments = async () => {
          try {
            const response = await axios.get(`/posts/${post?._id}/comments`);
            setComments(response.data.comments);
          } catch (err) {
            console.error('Error fetching comments:', err);
          }
        };
        fetchComments();
      }, [post?._id])

    const likeHandler = () => {
        try{
            axios.put("/posts/"+post?._id+"/like", {userId: currentUser?._id})
        } catch(err) {}
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
      };
      
      const addComment = ()=> {
        const comment = {
            "userId": `${currentUser._id}`,
            "name":`${currentUser.name}`,
            "profilePicture":`${currentUser.profilePicture}`,
            "comment": `${commentText}`
        }
        try{
            axios.post(`/posts/${post?._id}/comment`, comment);
            setComments(Comments.concat(comment));
        } catch(err) {
            console.error("Error adding comment:", err);
        }
       };

       const commentHandler = ()=>{
        addComment();
       }  
       

       const showHandler = ()=>{
        if (show === false){
            setShow(true);
        }else{
            setShow(false);
        }
    };

    const handleDelete = async () => {
        try {
          await axios.delete(`/posts/${post._id}`, {
            data: { userId: user._id },
          });
          window.location.replace("/");
        } catch (err) {}
      };

      
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.name}`}>
                    <img className="postProfileImg" src= {PF+user.profilePicture || PF+"Person/NoProfileImg.png"} alt="" />
                    </Link>
                    <span className="postUsername">{user.name}</span>
                    <span className="postDate">{moment(post?.createdAt).fromNow()}</span>
                </div>
            
                    <div className="postTopRight">
                        {currentUser && post.userId === currentUser._id && <Delete onClick={handleDelete} />}
                    </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className="postImg" src={PF+post.img} alt="" />
            </div>
            <div className="postBottom">      
                <div className="postBottomLeft">
                    <div className="postIcon">
                        {like ? <Favorite onClick={likeHandler} /> : <FavoriteBorder onClick={likeHandler}/>}  
                        {like ? 'Liked' : 'Like'}
                    </div>
                    <div className="postIcon">
                        <Comment className="commentIcon" onClick={showHandler} /> 
                        {Comments.length} Comments
                    </div>
                    <div className="postIcon">
                        <Share className="shareIcon"/>
                        Share
                    </div>
                </div>
                <div className="postBottomRight">
                    < BookmarkBorder className="saveIcon"/>
                    Save
                </div>
            </div>
            {show === true ?
                <div className="postCommentContainer">
                    <div className="postComment">
                        <img className="postProfileImg" src={currentUser.profilePicture ? PF+currentUser.profilePicture : PF+"Person/NoProfileImg.png"} alt="" />
                        <input type="text" placeholder="Add a comment..." onChange={(e)=>setCommentText(e.target.value)} value={commentText} />
                        <button onClick={commentHandler}>Send</button>
                    </div>
                {show &&
                    Comments?.map((item)=>(
                        <div className="postCommentUser" key={item?._id}>
                            <img className="postProfileImg" src={PF+item.profilePicture } alt="" />
                            <div className="postCommentUserInfo">
                                <span className="postUsername">{item.name}</span>
                                <p style={{marginLeft:"13px", marginTop: "6px", fontSize: "15px"}}>{item.comment} </p>
                                <div className="postCommentReply">
                                    <span>{moment(item?.createdAt).fromNow()}</span>
                                    <p style={{marginLeft:"15px"}}>Reply</p>
                                </div>
                            </div>
                            <span className="postCommentLike"><FavoriteBorder/></span>
                        </div>
                    ))}
                </div> : ''
                }
            </div> 
        </div>
  )
}
