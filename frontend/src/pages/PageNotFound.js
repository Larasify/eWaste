/**
 * 404 Page
 * @version 1
 * @author [Hongyu Pan](https://git.shefcompsci.org.uk/acr21hp)
 *
 */

/* Module Imports
React library Components */
import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import {BsFillCheckCircleFill, BsPaypal} from "react-icons/bs";
import {Notify} from "../fragments/Notify";
export  default  function PageNotFound() {

    let navigate = useNavigate();
    const location = useLocation();

    let paymentId;

    function handleClick() {
        navigate('/')
    }

    return(
        <div className={"mt-12 p-6  mx-auto bg-white rounded-xl shadow-lg w-2/3 flex items-center space-x-4"}>
            <div className={"flex flex-col w-2/3 mx-auto justify-center items-center text-left"}>
                <span className={"flex text-left text-5xl md:text-9xl font-extrabold px-20 py-2 md:py-2 bg-clip-text text-transparent bg-gradient-to-r from-[#afeedf] to-[#8ed2f0]"}>404</span>
                <span className={"flex text-left text-3xl md:text-4xl font-extrabold px-20  py-2 md:py-2 bg-clip-text text-transparent bg-gradient-to-r from-[#afeedf] to-[#8ed2f0]"}>Page Not Found</span>
                <p className={"inline flex text-lg md:text-2xl text-slate-500 px-20 py-2"}>Oops...Something went wrong... Why not try again?</p>
                <button className={"flex px-2 py-4 md:px-8 md:py-4 text-xl md:text-2xl rounded-2xl md:rounded-full font-bold text-white my-8 md:mx-2 bg-gradient-to-r from-[#afeedf] to-[#7eb8d7]"} onClick={handleClick}>Back to Home Page</button>
            </div>
            <div className={"flex  mx-auto justify-center items-center "}>
                <div className={"hidden md:flex w-full justify-center"}>
                    <img className={"object-contain"} src="../images/3 1.png"/>
                </div>
            </div>

        </div>
    )
}