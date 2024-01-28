const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
    comments:[
        {
            userId:{
                type:String,
                required:true
            },
            name:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            },
            profilePicture:{
                type: String,
                default: ""
            }
        }
    ]
},
{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);