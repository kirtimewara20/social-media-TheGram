const router = require("express").Router();
const Conversation = require("../models/conversation");

//create new conversation
router.post("/", async(req, res) => {
    const newConversation = new Conversation ({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch(err){
        res.status(500).json(err);
    }
});

//user conversation 
router.get("/:userId", async (req,res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch(err) {
        res.status(500).json(err);
    }
});

//find conversation for a specific user
router.get("/find/:firstId/:secondId", async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;