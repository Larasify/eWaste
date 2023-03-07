import React from 'react';
import {FcGoogle} from "react-icons/fc";

import './Register.css';

export default function Register() {
  return (
    <div class='container'>
        <div class="reg-form">
            <span>Create Account</span>
            <div class="name">
                <div>
                    <label>* First Name</label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>* Last Name</label>
                    <input type="text"></input>
                </div>
            </div>
            <div class="form-input">
                <label>* Password</label>
                <input type="password"></input>
            </div>
            <div class="form-input">
                <label>* Confirm Password</label>
                <input type="password"></input>
            </div>
            <div class="form-input">
                <label>* Email</label>
                <input type="text"></input>
            </div>
            <div class="btn">
                <span class="register">CONTINUE</span>
            </div>
            <div class="g-btn">
                <span class="g-register">Continue with Google </span>
                <div><FcGoogle/></div>
            </div>
        </div>
    </div>
  )
}
