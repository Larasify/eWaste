import React from 'react'
import './Header.css'
import {RiSearchLine, RiUser5Fill} from 'react-icons/ri';
import { RiNotification3Line } from 'react-icons/ri';
import logo from "../images/logo.png";

export default function Header() {
    return (
        <nav className={"min-w-[324px] w-full h-16 md:h-24 bg-gradient-to-r from-[#ebfff3] to-[#c7efd7]"}>
            <div className={"pr-2 flex flex-row justify-center items-center w-full h-full bg-bottom pr-8"}>
                <img src={logo} alt="" className={"h-full mr-auto"}/>
                <div className={"hidden bg-white items-center md:inline-flex rounded-3xl md:h-10 p-2 basis-1/3 opacity-75 focus-within:border-2 border-[#3fb78c] drop-shadow-md"}>
                    <input type="text" placeholder={'Search'} className={"focus:outline-0 w-full text-l text-[#509E82] placeholder:text-[#509E82] pl-4"}/>
                    <span><RiSearchLine className={"md:w-6 md:h-6 mr-4 text-[#509E82]"}/></span>
                </div>
                <RiSearchLine className={"ml-auto w-8 h-8 md:hidden mr-2 text-[#499177]"} />
                <div className={"w-auto h-8 md:w-auto md:h-10 md:ml-auto inline-flex text-white bg-[#499177] px-8 md:px-3 py-1 rounded-3xl hover:bg-[#3fb78c] mr-8"}>
                    <label htmlFor="" className={"hidden sm:inline-flex w-full h-full text-l text-center justify-self-center items-center mr-1"}>Samar</label>
                    <RiUser5Fill className={"w-full h-full"}/>
                </div>
                <RiNotification3Line className={"w-8 h-8 md:w-10 md:h-10 mx-1 md:mx-5 text-[#499177] border-2 border-[#499177] rounded-xl text-m p-1 hover:text-white hover:bg-[#3fb78c] hover:border-[#3fb78c]"}/>
            </div>
        </nav>
    )
}
