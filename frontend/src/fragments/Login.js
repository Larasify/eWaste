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
                <div class={"flex flex-col my-auto px-10 "}>
                    <div class={"text-[#237759] text-3xl md: text-4xl lg:text-6xl justify-center font-bold w-full flex my-8 lg:my-10"}>
                    <span>Login</span>
                    </div>
                    <div class={"flex flex-col w-full"}>
                        <label className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>Email Address</label>
                        <input className={"block w-full p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"} type="text"></input>
                    </div>
                    <div class={"flex flex-col w-full mt-4 lg:mt-6"}>
                        <label className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>Password</label>
                        <input className={"block w-full p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"} type="password"></input>
                    </div>
                    <span class={"text-right my-2 text-sm md:text-md  cursor-pointer underline "}>Forgot your password?</span>
                    <div class={"mt-4 text-white flex bg-[#509E82] mx-auto h-full justify-center w-4/5 text-xl p-3 items-center font-bold cursor-pointer rounded-2xl hover:bg-[#4E8E77]"}>
                        <span class="register">SIGN IN</span>
                    </div>
                    <div class={"mt-4 text-white flex bg-[#509E82] mx-auto h-full justify-center w-4/5 text-xl p-3 items-center font-bold cursor-pointer rounded-2xl hover:bg-[#4E8E77]"}>
                        <span class="register" onClick={register}>REGISTER</span>
                    </div>
                    <div class={" mt-4 text-[#509E82] flex border border-2 border-[#509E82] bg-white mx-auto h-full justify-center w-4/5 text-xl p-3 items-center font-normal cursor-pointer rounded-2xl hover:bg-gray-100"}>
                        <span class="g-register">Continue with Google </span>
                        <div className={"ml-4"}><FcGoogle size={30}/></div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
