import React, {useContext, useEffect, useState} from 'react'
import './Header.css'
import {RiSearchLine, RiUser5Fill} from 'react-icons/ri';
import { RiNotification3Line } from 'react-icons/ri';
import logo from "../images/logo.png";
import {Menu, MenuItem} from "@mui/material";
import {AuthContext} from "../App";
import {useNavigate} from "react-router-dom";
import {logoutSubmit} from "./Login";

export const fetchUserData = () => {
    const myRequest = new Request("/user/getuser", {
        headers: new Headers({'Content-Type': 'application/json'}),
        method: "GET",
        credentials: "include"
    });
    return fetch(myRequest)
        .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    alert("error on fetching user data: " + response.statusText)
                }
            }
        )
        .then((data) => {
            if (data.response === "success") {
                return data['user_info']
            } else {
                return null
            }
        })
}

export default function Header(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const authState = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState(null);
    const open = Boolean(anchorEl);
    const handleLoginDropdownClose = (event) => {
        setAnchorEl(null);
        switch (event.target.getAttribute("value")){
            case "myAccount":
                navigate("/user-account")
                break;
            case "myRecycle":
                navigate("/user-recycle")
                break;
            case "logout":
                logoutSubmit().then(_ => {});
                authState.onLogout();
                setUserInfo(null)
                navigate("/")
                break;
            default:
                alert("invalid dropdown value")
        }
    };
    const handleLoginClick = (event) => {
        if (authState.isLoggedIn) {
            setAnchorEl(event.currentTarget);
        } else {
            props.openLoginWindow()
        }
    }


    useEffect(() => {
        if (!authState.isLoggedIn) {
            fetchUserData().then((userInfo) => {
                if (userInfo !== null) {
                    authState.onLogin(userInfo["first_name"], userInfo["last_name"], userInfo._id);
                    setUserInfo(authState)
                } else {
                    if (window.location.href.endsWith("/") || window.location.href.endsWith("/register")) {
                        return
                    }
                    props.openLoginWindow()
                }
            })
        }
    }, [])
    return (
        <nav className={"fixed z-50 min-w-[324px] w-full h-16 md:h-24 bg-gradient-to-r from-[#ebfff3] to-[#c7efd7]"}>
            <div className={"pr-2 flex flex-row justify-center items-center w-full h-full bg-bottom md:pr-8"}>
                <a href='/'><img src={logo} alt="" className={"h-full mr-auto"} onClick={() => navigate("/")}/></a>
                <div
                    className={"hidden bg-white items-center md:inline-flex rounded-3xl md:h-10 p-2 basis-1/3 opacity-75 focus-within:border-2 border-[#3fb78c] drop-shadow-md"}>
                    <input type="text" placeholder={'Search'}
                           className={"focus:outline-0 w-full text-l text-[#509E82] placeholder:text-[#509E82] pl-4"}/>
                    <span><RiSearchLine className={"md:w-6 md:h-6 mr-4 text-[#509E82]"}/></span>
                </div>
                <RiSearchLine className={"ml-auto w-8 h-8 md:hidden mr-2 text-[#499177]"}/>
                <div onClick={handleLoginClick}
                     className={"w-auto h-8 md:w-auto md:h-10 md:ml-auto inline-flex text-white bg-[#499177] px-4 md:px-3 py-1 rounded-3xl hover:bg-[#3fb78c] mr-1 md:mr-8"}>
                    <label className={"hidden sm:inline-flex w-full h-full text-l text-center justify-self-center items-center mr-1"}>
                        {userInfo !== null ? userInfo.firstName : "Login"}
                    </label>
                    <RiUser5Fill className={"w-full h-full"}/>
                </div>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleLoginDropdownClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleLoginDropdownClose} value="myRecycle">My recycle</MenuItem>
                    <MenuItem onClick={handleLoginDropdownClose} value={"myAccount"}>My account</MenuItem>
                    <MenuItem onClick={handleLoginDropdownClose} value={"logout"}>Logout</MenuItem>
                </Menu>
                <RiNotification3Line
                    className={"w-8 h-8 md:w-10 md:h-10 mx-1 md:mx-5 text-[#499177] border-2 border-[#499177] rounded-xl text-m p-1 hover:text-white hover:bg-[#3fb78c] hover:border-[#3fb78c]"}/>
            </div>
        </nav>
    );
}
