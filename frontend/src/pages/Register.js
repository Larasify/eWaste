import React from 'react';
import {FcGoogle} from "react-icons/fc";

import './Register.css';
import {loginSubmit} from "../fragments/Login";

const registerOnclick = () => {
    //TODO not blank check here before submitting any forms

    if (document.getElementById("passwordInput").value !== document.getElementById("confirmPasswordInput").value) {
        alert("Passwords are not matched. ")
        return
    }
    const myRequest = new Request("/auth/register", {
        credentials: "include",
        headers: new Headers({"Content-Type": "application/json"}),
        method: "POST",
        body: JSON.stringify({
            email: document.getElementById("emailInput").value,
            password: document.getElementById("passwordInput").value,
            first_name: document.getElementById("firstNameInput").value,
            last_name: document.getElementById("lastNameInput").value
        })
    });
    fetch(myRequest).then((response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            alert("Register failed. " + response.statusText)
        }
    }).then((data) => {
        if (data['response'] === "success"){
            loginSubmit(document.getElementById("emailInput").value, document.getElementById("passwordInput").value).then((data) => {
                if (data['response'] === "success"){
                    window.location.href = "/"
                } else {
                    alert("Auto login failed! Please login again. ERROR_MESSAGE: " + data['message'])
                }
            })
        } else {
            alert("Register failed. Please try again. ERROR_MESSAGE: " + data['message'])
        }
    })
};

export default function Register() {
  return (
    <div class='container'>
        <div class="reg-form">
            <span>Create Account</span>
            <div class="name">
                <div>
                    <label>* First Name</label>
                    <input type="text" id={"firstNameInput"}></input>
                </div>
                <div>
                    <label>* Last Name</label>
                    <input type="text" id={"lastNameInput"}></input>
                </div>
            </div>
            <div class="form-input">
                <label>* Password</label>
                <input type="password" id={"passwordInput"}></input>
            </div>
            <div class="form-input">
                <label>* Confirm Password</label>
                <input type="password" id={"confirmPasswordInput"}></input>
            </div>
            <div class="form-input">
                <label>* Email</label>
                <input type="text" id={"emailInput"}></input>
            </div>
            <div class="btn">
                <span class="register" onClick={registerOnclick}>CONTINUE</span>
            </div>
            <div class="g-btn">
                <span class="g-register">Continue with Google </span>
                <div><FcGoogle/></div>
            </div>
        </div>
    </div>
  )
}
