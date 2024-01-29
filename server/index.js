const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const conversationRoute = require("./routes/conversations")
const messageRoute = require("./routes/messages")

dotenv.config();

//MONGODB Connection
mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("DB connection successful")})
    .catch(()=>{
        console.log("Some error occured")
    });

    app.use("/images", express.static(path.join(__dirname, "public/images")));

//MIDDLEWARE
app.use(express.json()) 
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors({
    origin:["http://localhost:3000", "https://frontend-27lh.onrender.com"]
}));

//MULTER FOR FILE UPLOAD
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try{
        return res.status(200).json("File uploaded successfully.");
    } catch (err) {
        return res.status(500).json({ error: "File upload failed." });
    }
});

//ROUTES
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server is running!")
});