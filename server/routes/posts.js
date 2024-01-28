const router = require("express").Router();
const Post = require("../models/post")
const User = require("../models/user")

//CREATE POST
router.post("/",async (req,res)=>{
    const newPost = new Post(req.body)
    try { 
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err){
        res.status(500).json(err);
    }
});

//UPDATE POST
router.put("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("The post has been updated");
        } else {
            res.status(403).json("You can update only your post");
        }
    } catch(err){
        res.status(500).json(err);
    }
});

//DELETE POST
router.delete("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("The post has been deleted");
        } else {
            res.status(403).json("You can delete only your post");
        }
    } catch(err){
        res.status(500).json(err);
    }
});

// LIKE/UNLIKE POST
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({ $push: { likes: req.body.userId} });
            res.status(200).json("Post has been liked!");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId} });
            res.status(200).json("Post has been disliked!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}); 

//GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET TIMELINE POST(fetch post from followings)
router.get("/timeline/:userId", async(req, res)=>{
    try{
        const currentUser =  await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    }catch(err){
        res.status(500).json(err);
    }
});

//GET USERS ALL POSTS
router.get("/profile/:name", async(req, res)=>{
    try{
        const username = req.params.name;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        const user = await User.findOne({ name: username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});

//COMMENT
router.post('/:id/comment', async (req, res) => {
    const { userId, name, comment, profilePicture } = req.body;
    try {
      const post = await Post.findById(req.params.id)
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      post.comments.push({ userId, name, comment, profilePicture});
      await post.save();
      return res.status(201).json({ message: 'Comment added successfully', post});
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
 
  //GET COMMENTS
  router.get('/:id/comments', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      return res.status(200).json({ comments: post.comments });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  //GET A FOLLOWING USER
  router.get("/following/:id" , async(req , res)=>{
     try {
          const user = await User.findById(req.params.id);
          const followinguser = await Promise.all(
                user.following.map((item)=>{
                      return User.findById(item)
                })
          )

          let followingList=[];
          followinguser.map((person)=>{
                const {email, password , following , followers , ...others} = person._doc;
                followingList.push(others);
          })

          res.status(200).json(followingList);
    } catch (error) {
          return res.status(500).json("Internal server error");
     }
})
  //GET A FOLLOWER USER
  router.get("/followers/:id" , async(req , res)=>{
    try {
          const user = await User.findById(req.params.id);
          const followersuser = await Promise.all(
                user.followers.map((item)=>{
                      return User.findById(item)
                })
          )

          let followersList=[];
          followersuser.map((person)=>{
                const {email, password , following , followers , ...others} = person._doc;
                followersList.push(others);
          })

          res.status(200).json(followersList);
    } catch (error) {
         return res.status(500).json("Internal server error");
    }
})

module.exports = router;
