import {FcGoogle} from "react-icons/fc";
import React from 'react'
import { useNavigate } from "react-router-dom";


import Modal from './Modal.js'
import './Login.css'
const loginOnclick = ()=>{
    loginSubmit(document.getElementById("emailInput").value, document.getElementById("passwordInput").value).then((data) => {
        if (data['response'] === "success"){
            //TODO jump back
        } else {
            alert(data['message'])
        }
    })
}

const loginSubmit = (email, password)=>{
    const myRequest = new Request("http://127.0.0.1:5000/auth/login", {
        headers: new Headers({'Content-Type': 'application/json'}),
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password
        }),
        credentials: "include"
    });
    return fetch(myRequest).then((response) => response.json())
}

function Login() {

    let navigate = useNavigate();
    const register = () =>{
        navigate(`/register`);
    }

    return (
        <div class="modal-holder">
            <Modal>
                <div class='login'>
                    <div class='login-label'>
                        <span>Login</span>
                    </div>
                    <div class="login-form-input">
                        <label>Email Address</label>
                        <input type="text" id={"emailInput"}></input>
                    </div>
                    <div class="login-form-input">
                        <label>Password</label>
                        <input type="password" id={"passwordInput"}></input>
                    </div>
                    <span class="forgot">Forgot your password?</span>
                    <div class="login-modal-btn">
                        <span class="register" onClick={loginOnclick}>SIGN IN</span>
                    </div>
                    <div class="login-modal-btn">
                        <span class="register" onClick={register}>REGISTER</span>
                    </div>
                    <div class="login-modal-g-btn">
                        <span class="g-register">Continue with Google </span>
                        <div><FcGoogle/></div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Login
export {loginSubmit}