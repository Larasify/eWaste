import {FcGoogle} from "react-icons/fc";
import React, {useContext, useState} from 'react'
import { useNavigate } from "react-router-dom";


import './Login.css'
import {AuthContext} from "../App";
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

export default function Login(props) {
    const authState = useContext(AuthContext)
    let navigate = useNavigate();
    const register = () =>{
        props.loginModalClose()
        navigate(`/register`);
    }

    return (
        <div className={"bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-0 flex flex-col my-auto py-5 px-10 rounded-2xl"}>
            <div
                className={"text-[#237759] text-2xl md:text-4xl lg:text-6xl justify-center font-bold w-full flex p-4"}>
                <span>Login</span>
            </div>
            <div className={"flex flex-col w-full"}>
                <label className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>Email
                    Address</label>
                <input
                    className={"block w-full p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"}
                    type="text"></input>
            </div>
            <div className={"flex flex-col w-full mt-4 lg:mt-6"}>
                <label
                    className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>Password</label>
                <input
                    className={"block w-full p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"}
                    type="password"></input>
            </div>
            <span className={"text-right my-2 text-sm md:text-md  cursor-pointer underline "}>Forgot your password?</span>
            <div
                className={"mt-4 text-white flex bg-[#509E82] mx-auto h-full justify-center w-4/5 text-xl p-3 items-center font-bold cursor-pointer rounded-2xl hover:bg-[#4E8E77]"}>
                <span className="register">SIGN IN</span>
            </div>
            <div
                className={"mt-4 text-white flex bg-[#509E82] mx-auto h-full justify-center w-4/5 text-xl p-3 items-center font-bold cursor-pointer rounded-2xl hover:bg-[#4E8E77]"}>
                <span className="register" onClick={register}>REGISTER</span>
            </div>
            <div
                className={" mt-4 text-[#509E82] flex border border-2 border-[#509E82] bg-white mx-auto h-full justify-center w-4/5 text-xl p-3 items-center font-normal cursor-pointer rounded-2xl hover:bg-gray-100"}>
                <span className="g-register">Continue with Google </span>
                <div className={"ml-4"}><FcGoogle size={30}/></div>
            </div>
        </div>
    )
}
