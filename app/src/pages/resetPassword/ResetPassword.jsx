import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {API_URL} from "../../config"

export default function ResetPassword() {
  const location = useLocation();
  const code = location.search.split("?")[1];
  console.log(code);
  const [password , setpassword] = useState("");
  console.log(password);
  const handleClick = async(e)=>{
    e.preventDefault();
    await fetch(`${API_URL}/auth/reset/password?${code}` , {method:"PUT" , headers:{'Content-Type':"application/JSON"} , body:JSON.stringify({password:password})}).then((data)=>{
      alert("Your password rest successfully")
    })
  };
  return (
    <div className="card">
            <div className="left">
                <h1>The Gram</h1>
                <p>Connect with the people in your life and world around you!</p>
                <a href="/register">Register</a>
            </div>
            <div className="right">
                <div className="formBx">
                    <h2>Reset Password</h2>
                    <form>
                        <div className="inputBx">
                            <span> Enter Your New Password</span>
                            <input type="password" required minLength="6" name="" id="password" onChange={(e)=>setpassword(e.target.value)}/>                        
                        </div>
                        <div className="inputBx">
                            <input type="submit" value="Set New Password" name="" onClick={handleClick}/>
                        </div>
                        <div className="inputBx">
                            <p>Login with new password <a href="/login ">Sign in</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}
