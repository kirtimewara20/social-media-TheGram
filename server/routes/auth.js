const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const ResetToken = require("../models/resetToken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

//REGISTER
router.post("/register", async (req, res) => {
    try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        //create new user
        const newUser = new User({ 
            username: req.body.username,
            email:req.body.email,
            password: hashedPassword,
            name: req.body.name,
        });

        const oldUser = await User.findOne({name: req.body.name });
        if (oldUser)
          return res.status(400).json({ message: "User already exists" });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err){
      res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password"); 

        res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
        }
});

//FORGOT PASSWORD
router.post("/forgot/password" , async(req , res)=>{
  const {email} = req.body;
  const user = await User.findOne({email:email});
  if(!user){
      return res.status(400).json("User not found");
  }
  const token = await ResetToken.findOne({user:user._id});
  if(token){
      return res.status(400).json("After one hour you can request for another token");
  }

  const RandomTxt = crypto.randomBytes(20).toString('hex');
  const resetToken = new ResetToken({
      user:user._id,
      token:RandomTxt
  });
  await resetToken.save();
  const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    });
    transport.sendMail({
      from:"sociaMedia@gmail.com",
      to:user.email,
      subject:"Reset Token",
      html:`https://frontend-27lh.onrender.com/reset/password?token=${RandomTxt}&_id=${user._id}`
    })

    return res.status(200).json("Check your email to reset password")
});

//RESET PASSWORD
router.put("/reset/password" , async(req , res)=>{
  const {token , _id} = req.query;
  if(!token || !_id){
      return res.status(400).json("Invalid request");
  }
  const user = await User.findOne({_id:_id});
  if(!user){
      return res.status(400).json("user not found")
  }
  const resetToken = await ResetToken.findOne({user:user._id});
  if(!resetToken){
      return res.status(400).json("Reset token is not found")
  }
  console.log(resetToken.token)

  const isMatch = await bcrypt.compareSync(token , resetToken.token);
  if(!isMatch){
      return res.status(400).json("Token is not valid");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashedPassword;
  await user.save();

  const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    });
    transport.sendMail({
      from:"sociaMedia@gmail.com",
      to:user.email,
      subject:"Your password reset successfully",
      html:`Now you can login with new password`
    })
    return res.status(200).json("Email has been send")
})

module.exports = router;