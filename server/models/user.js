const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true,
        min:6
    },
    name:{
        type: String,
        require: true,
    },
    profilePicture:{
        type: String,
        default: "",
    },
    followers:{
        type: Array,
        default: [],
    },
    following:{
        type: Array,
        default: [],
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    bio:{
        type: String,
        max:200,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);