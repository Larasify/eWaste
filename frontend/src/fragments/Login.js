import {FcGoogle} from "react-icons/fc";
import React from 'react'
import { useNavigate } from "react-router-dom";


import Modal from './Modal.js'
import './Login.css'

export default function Login() {

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
                        <input type="text"></input>
                    </div>
                    <div class="login-form-input">
                        <label>Password</label>
                        <input type="password"></input>
                    </div>
                    <span class="forgot">Forgot your password?</span>
                    <div class="login-modal-btn">
                        <span class="register">SIGN IN</span>
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
