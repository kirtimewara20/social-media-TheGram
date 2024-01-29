import React from 'react'
import {useState} from "react"
import {API_URL} from "../../config"

export default function ForgotPassword() {
    const [email , setEmail] = useState('');

    const handleclick = async(e)=>{
        e.preventDefault();
        await fetch(`${API_URL}/auth/forgot/password` , {method:"POST" , headers:{"Content-Type":"application/JSON"} , body:JSON.stringify({email:email})}).then(()=>{
          alert("We sent you a token email")
        }).catch(()=>{
          alert("Fail to proccess")
        })
      }

  return (
    <div className="card">
            <div className="left">
                <h1>The Gram</h1>
                <p>Connect with the people in your life and world around you!</p>
                <a href="/register">Register</a>
            </div>
            <div className="right">
                <div className="formBx">
                    <h2>Forgot Password</h2>
                    <form>
                        <div className="inputBx">
                            <span> Enter your email</span>
                            <input type="email" required name="" id="email" onChange={(e)=>setEmail(e.target.value)}/>                        </div>
                        <div className="inputBx">
                            <input type="submit" value="Send" name="" onClick={handleclick} />
                        </div>
                        <div className="inputBx">
                            <p>Check your email for reset password link! <a href="/reset/password">Reset Password</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}
