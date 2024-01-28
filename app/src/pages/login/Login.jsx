import "./login.css"
import {Instagram, Facebook, Twitter} from "@mui/icons-material"
import {useContext, useRef} from "react"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import {CircularProgress} from "@material-ui/core"
import {Link } from "react-router-dom"

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching,  dispatch } = useContext(AuthContext);

  const handleSubmit  = (e) => {
    e.preventDefault();
    loginCall(
        { email: email.current.value, password: password.current.value }, 
        dispatch 
    );
  };

  return (
    <div className="login">
        <div className="card">
            <div className="left">
                <h1>The Gram</h1>
                <p>Connect with the people in your life and world around you!</p>
                <a href="/register">Register</a>
            </div>
            <div className="right">
                <div className="formBx">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="inputBx">
                            <span> Email </span>
                            <input type="email" required name="email" id="email" ref={email}/>
                        </div>
                        <div className="inputBx">
                            <span> Password </span>
                            <input type="password" required minLength="6" name="password"  id="password" ref={password}/>
                        </div>
                        <div className="remember">
                            <label><input type="checkbox" name="checkbox"/> Remember me </label>
                            <Link to={"/forgot/password"} style={{textDecoration:"none"}}><span>Forgot Password</span></Link>
                        </div>
                        <div className="inputBx">
                            {isFetching ? (<CircularProgress/>) : 
                                (<input type="submit" value="Sign in" />)
                            }
                        </div>
                        <div className="inputBx">
                            <p>Don't have an account? <a href="/register">Sign up </a></p>
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
