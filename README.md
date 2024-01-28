# Project Title: The Gram

### Social Media Web App Using MERN Stack 

# Project Description

## Project Overview

The Gram is a modern web-based social media application that aims to offer users a dynamic platform for sharing photos, following friends, liking, and commenting on posts, and private messaging.

### Features

1. **User Authentication** : Allow visitors to sign up and sign in using their email and password. Once registered, users should be able to change or reset their password.

2. **User Profile** : Allow users to view their own profile which includes Profilepicture, bio, no. of following and followers and all posts in descending order.
   
3. **Profile Management** : Users can update their profiles, including profile picture and personal information like name, username, and bio.
   
4. **Post Creation and Interaction** : Users can create, upload and share new posts with captions, delete their post, and interact by liking/commenting on posts.

5. **Search and Engage** : Users can serach for other user, follow and unfollow then and see a feed of posts from users they follow.

6. **Messaging** : Private messaging feature for one-on-one communication.
   
### Technologies Used : MERN Stack

1. **Frontend** : React, React Router, Context API (state management)
2. **Backend** : Node.js, Express.js, Multer (for handling file uploads)
3. **Database** : MongoDB with Mongoose
4. **Authentication** : JSON Web Token (JWT)
5. **Real-time Updates**: Socket.io, nodemailer, mailtrap.io - chat
6. **Text Editor** : VS Code
 
### Challenges Faced

During the development of this project, I encountered several challenges:

1. Real-time Updates
2. Security
3. UI/UX Design

# Project Setup

This repository contains a social media app built using MERN stack. Please follow the instructions to set it up.

###  Clone the Repository
   
git clone URL

### Frontend

1. Navigate to the frontend directory: ``cd app``

2. Install frontend dependencies: 
    `` npm install``

3. Start the frontend development server:   ``npm start``

### Backend
   
1. Navigate to the backend directory:       ``cd ../server``

2. Install backend dependencies: 
    `` npm install``

3. Set Up Environment Variables - Create a .env file and set the following variables:

    MONGO_URL=""
    
    PORT=

4. Start the backend server: ``npm start``

### Socket.io

**Backend Socket.IO Integration**

1. Navigate to the backend directory: ``cd ../socket``

2. Install backend dependencies: 
    `` npm install socket.io``

3. Start the backend server: ``npm start``

**Frontend Socket.IO Integration**

4. Navigate to the frontend directory: ``cd ../app``

5. Install frontend dependencies: 
    `` npm install socket.io-client``

6. Start the frontend server: ``npm start``

### Access the Application
   
Open your browser and go to http://localhost:3000 to access the application.

# Project Working

Social Media Platform here is fully responsive and functional web application involves several components and functionalities that allow users to connect, share content, and engage with each other. 

**Below is a general overview of how a social media website operates:**


1. Users start by creating accounts on the **register** page. They provide necessary information such as a username, email, name and password. If already registerd they nvaigate to **login** page and login through their registed email and password.
   
2. If a user forgets their password, they can click on the "Forgot Password" option on the login page to initiate the password reset process. In this process, the user needs to enter their email address on the **Forgot Password** page. After entering the email, a password reset link will be sent to the user's email address here I used mailtrap.io (In order to use mailtrap go to mailtrap.io than signup and use user mailtrap 'username' and 'password' to use a mailtrap in project). The user should check their email and click on the provided password reset link. This link will redirect them to a **Reset Password** page where they can create a new password for their account. Once the new password is entered and confirmed, the user can then use the updated credentials to log in to their account.

3. After a successful login, the user will be redirected to the **home** page where various content, such as shared posts, timeline, friends, message box is displayed. On this page, users can create new posts by writing a description, uploading images, and sharing the content through the "Share" button. Additionally, users can view a timeline featuring posts from users they follow. Interactions like, unliking and commenting on posts from other users are also possible. Users have the ability to explore their friends list and create conversations with friends they follow by clicking on their names, and get messages from connected users . By clicking on a user's name on topbar, the user can be redirected to the respective profile page for further exploration and interaction. In summary, the platform offers a comprehensive user experience with features like creating and sharing posts, interacting with others, exploring friends lists, viewing messages, and navigating to user profiles.

4. On the **profile** page, users can view a personal profile card featuring their profile picture, name, username, bio, and statistics including the number of followers, following, and posts. Clicking the "Edit Profile" button allows users to update their personal profile information such as the profile picture, username, name, and bio. Furthermore, users can see their own posts listed in descending order, with the option to delete any post. Clicking on the profile pictures of those they follow allows users to view the profiles of others, where they can also follow or unfollow users. The right side of the page includes a "Suggested for You" tab, where users can follow or unfollow suggested profiles. Once a user follows another, that profile is removed from the "Suggested for You" tab and added to the user's following list.  Additionally, there is a "Follow Requests" tab, although its functionality is currently inactive. Future plans include implementing the ability to manage follow requests.

5. By clicking the home icon, the user can navigate to the home page. Similarly, by clicking the message icon, the user is directed to the **chat** page, where real-time updates are facilitated using socket.io. In the chat list, users can view ongoing conversations with those they follow. Clicking on a friend's conversation opens a chatbox, enabling private one-on-one communication with other users. This functionality is also available on the home page, where a message tab on the right side allows users to click on conversations, redirecting them to the chat page. The chat page provides a seamless experience for users to engage in real-time conversations with those they follow.

6. To **log out**, users can go to the profile page and initiate the logout process by selecting the logout button situated on the left side of the profile page.


**This encapsulates the core features, usage and working of my user-friendly social media web application project, meticulously developed using the MERN stack. I hope the interactive design and comprehensive functionalities contribute to a positive user experience.**



 