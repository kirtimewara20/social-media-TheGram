const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = require("express").Router();

//UPDATE
router.put("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password && typeof req.body.password === "string") {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, 
                {
                    $set: req.body
                },
                { new: true}
             );
             res.status(200).json(updatedUser);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else{
          return res.status(403).json( "You can update only your account!" );
    }
})

//DELETE
router.delete("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User deleted successfully")
        } catch (err) {
            return res.status(500).json(err);
        }
    } else{
        return res.status(403).json("Access Denied! You can only delete your own profile!");
    }
})

//GET USER
router.get("/find/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET ALL USER 
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const name = req.query.name;
    try{
        const user = userId 
        ? await User.findById(userId) 
        : await User.findOne({name: name});
        if(!user){
            return res.status(400).json("User not found")
        }
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err)
    }
})

//FOLLOW USER (following)
router.put("/:id/follow", async (req,res) => {
    if (req.body.userId !== req.params.id) {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId))
            {
              await user.updateOne({ $push: { followers: req.body.userId } });
              await currentUser.updateOne({ $push: { following: req.params.id } });
              res.status(200).json("User followed!");
            } else {
                res.status(403).json("User is already followed by you")
            }
        } catch (err){
            res.status(500).json(err);
        }
    }else {
        res.status(403).json("you can't follow yourself")
    }
})

//UNFOLLOW USER
router.put("/:id/unfollow", async (req,res) => {
    if (req.body.userId !== req.params.id) {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
              await user.updateOne({ $pull: { followers: req.body.userId } });
              await currentUser.updateOne({ $pull: { following: req.params.id } });
              res.status(200).json("User unfollowed!");
            } else {
                res.status(403).json("you don't follow this user")
            }
        } catch (err){
            res.status(500).json(err);
        }
    }else {
        res.status(403).json("you can't unfollow yourself")
    }
});


//GET FRIENDS
router.get("/friends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.following.map(friendId => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend) => {
            const {_id, name, profilePicture} = friend;
            friendList.push({ _id, name, profilePicture })
        });
        res.status(200).json(friendList);
    } catch(err) {
        res.status(500).json(err);
    }
});

//GET USERS TO FOLLOW(Suggested)
router.get("/suggested/user/:id", async(req,res) => {
    try {
        const allUser = await User.find();
        const user = await User.findById(req.params.id);
        const followinguser = await Promise.all(
            user.following.map((item)=>{
                return item;
            })
        )
        let UserToFollow = allUser.filter((val)=>{
            return !followinguser.find((item)=>{
                return val._id.toString()===item;
            })
        })
        let filteruser = await Promise.all(
            UserToFollow.map((item)=>{
                const {email, username, followers , following , password , ...others} = item._doc;
                return others
            })
        )
        res.status(200).json(filteruser)

    } catch(err){
        res.status(500).json(err)
    }
})

//SEARCH
router.get("/search/:key",async(req,res) => {
    let result = await User.find({
        "$or": [
            {name:{$regex:req.params.key}}
        ]
    });
    res.send(result);
})


module.exports = router;