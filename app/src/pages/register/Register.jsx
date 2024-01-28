import "./register.css"
import {Instagram, Facebook, Twitter} from "@mui/icons-material"
import axios from "axios";
import { useRef } from "react";
import {useNavigate} from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const navigate = useNavigate();


  const handleClick  = async(e) => {
    e.preventDefault();

    const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        name: name.current.value,
    };
    
    try {
        await axios.post("/auth/register", user);
        navigate("/login");
    } catch (err) {
        console.log(err)
    }
  };

  return (
    <div className="register">
        <div className="card">
            <div className="left">
                <h1>The Gram</h1>
                <p>Connect with the people in your life and world around you!</p>
                <a href="/login">Login</a>
            </div>
            <div className="right">
                <div className="formBx">
                    <h2>Register</h2>
                    <form onSubmit={handleClick}>
                        <div className="inputBx">
                            <span> Username </span>
                            <input type="text" required ref={username} name="username" />
                        </div>
                        <div className="inputBx">
                            <span> Email </span>
                            <input type="email" required ref={email} id="email" name="email" />                      
                        </div>
                        <div className="inputBx">
                            <span> Password </span>
                            <input type="password" required ref={password} minLength="6" id="password" name="password" />
                        </div>
                        <div className="inputBx">
                            <span> Name </span>
                            <input type="text" required ref={name}  name="name"/>
                        </div>
                        <div className="remember">
                            <label><input type="checkbox" name="remember"/> Remember me </label>
                        </div>
                        <div className="inputBx">
                            <input type="submit" value="Sign up" />
                        </div>
                        <div className="inputBx">
                            <p>Do you have an account? <a href="/login">Sign in</a></p>
                        </div>
                    </form>
                    <h3>Login with social media</h3>
                    <div className="socialLogin">
                        <Instagram className="apps"/>
                        <Facebook className="apps"/>
                        <Twitter className="apps"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
