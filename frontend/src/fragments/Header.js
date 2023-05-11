/**
 * Header
 * @version 1
 * @author [Kaijian Xie] (https://git.shefcompsci.org.uk/acp22kx)
 * @author [Hongyu Pan](https://git.shefcompsci.org.uk/acr21hp)
 *
 */

/* Module Imports
React library Components */
import React, {useContext, useEffect, useState} from 'react';
import {RiSearchLine, RiUser5Fill} from 'react-icons/ri';
import { RiNotification3Line } from 'react-icons/ri';
import {Menu, MenuItem, Popper} from "@mui/material";
import {AuthContext} from "../App";
import {useNavigate} from "react-router-dom";
import { Button, List, ListItem, ListItemText } from '@mui/material';
import Badge from '@mui/material/Badge';
import { Cookies } from 'react-cookie';

/* Local imports */
import './Header.css'
import { Notify } from './Notify';
import {loginSubmit, logoutSubmit} from "./Login";
import logo from "../images/logo.png";


/* Get user information */
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
                    Notify.error("error on fetching user data: " + response.statusText)
                }
            }
        )
        .then((data) => {
            if (data.response === "success") {
                Notify.success('Login successful!')
                return data['user_info']
            } else {
                Notify.error('Login failed!')
                return null
            }
        })
}




export default function Header(props) {
    const cookie = new Cookies();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorNotification, setAnchorNotification] = useState(null);
    const [notification,setNotification] = useState([]);
    const navigate = useNavigate();
    const authState = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState(null);
    const open = Boolean(anchorEl);
    const [openNotification, setOpenNotification] = useState(false);
    /* Handle the login button and dropdown */
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
                Notify.success('Logout successful!')
                navigate("/")
                break;
            default:
                return
        }
    };

    /* Check if already logged in */
    const handleLoginClick = (event) => {
        if (authState.isLoggedIn) {
            setAnchorEl(event.currentTarget);
        } else {
            props.openLoginWindow()
        }
    }

    /* Check if already logged in for notification button */
    const handleNotificationClick = (event) => {
        if (authState.isLoggedIn) {
            setAnchorNotification(event.currentTarget);
            setOpenNotification((previousOpen) => !previousOpen)
        } else {
            props.openLoginWindow()
        }
    }

    /* Set anchor */
    const handleNotificationDropdownClose = (event) => {
        setAnchorNotification(null);
    };

    /* Handle single notification */
    const handleItem = async(id)=> {
        const myRequest = new Request('/user/notificationisseen',{
        credentials: "include",
        headers: new Headers({"Content-Type": "application/json"}),
        method: "POST",
        body: JSON.stringify({
                notificationid: id,
            })
        })
        fetch(myRequest).then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                Notify.error(" Error! " + response.statusText)
            }
        }).then((data) => {
            if (data['response'] === "success"){
                console.log('yes')
            } else {
                Notify.error("Get notifications failed!Please try again. ERROR_MESSAGE: " + data['message'])
            }
        })
        if (userInfo['privilege'] === 'staff') navigate('/staff/dashboard/device')
        if (userInfo['privilege'] === 'user') navigate('/user-recycle')
    }

    /* Read all message and empty the mailbox */
    const readAll = async(notification) => {
        notification.map((notify) => (
            fetch(new Request('/user/notificationisseen',{
                credentials: "include",
                headers: new Headers({"Content-Type": "application/json"}),
                method: "POST",
                body: JSON.stringify({
                        notificationid: notify.id,
                    })
                })).then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    Notify.error(" Error! " + response.statusText)
                }
            }).then((data) => {
                if (data['response'] === "success"){
                    window.location.reload()
                } else {
                    Notify.error("Get notifications failed!Please try again. ERROR_MESSAGE: " + data['message'])
                }
            })
        ))
    }

    const handleClickAway = () => {
        setAnchorNotification(false);
        };
    const canBeOpenNotification = openNotification && Boolean(anchorNotification);
    const id = canBeOpenNotification ? 'transition-popper' : undefined;

    /* Render the header */
    useEffect(() => {
        if (cookie.get("session-id")) {
            if (!authState.isLoggedIn) {
                fetchUserData().then((userInfo) => {
                    if (userInfo !== null) {
                        authState.onLogin(userInfo["first_name"], userInfo["last_name"], userInfo._id, userInfo.privilege);
                        setUserInfo(authState)
                        if (userInfo['privilege'] === 'staff') {
                            navigate('/staff/dashboard')
                        } else if (userInfo['privilege'] === 'admin') {
                            navigate('/admin/dashboard')
                        }
                    } else {
                        if (window.location.href.endsWith("/") || window.location.href.endsWith("/register")) {
                            return
                        }
                        props.openLoginWindow()
                    }
                })
            }
            const myRequest = new Request('/user/getnotifications', {
                credentials: "include",
                headers: new Headers({"Content-Type": "application/json"}),
                method: "GET",
            })
            fetch(myRequest).then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    Notify.error(" Error! " + response.statusText)
                }
            }).then((data) => {
                if (data['response'] === "success") {
                    setNotification(data['notifications'].filter(n => n.is_seen !== true))

                } else {
                    Notify.error("Get notifications failed!Please try again. ERROR_MESSAGE: " + data['message'])
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
                {authState.isLoggedIn ?
                    <Badge badgeContent={notification.length} color="success" aria-setsize={60}  className={"pl-0"}>
                        <RiNotification3Line onClick={handleNotificationClick}
                                             className={"w-8 h-8 md:w-10 md:h-10  text-[#499177] border-2 border-[#499177] rounded-xl text-m p-1 hover:text-white hover:bg-[#3fb78c] hover:border-[#3fb78c]"}/>
                    </Badge> : <RiNotification3Line onClick={handleNotificationClick}
                                                    className={"w-8 h-8 md:w-10 md:h-10  text-[#499177] border-2 border-[#499177] rounded-xl text-m p-1 hover:text-white hover:bg-[#3fb78c] hover:border-[#3fb78c]"}/>
                }

                    <Popper
                    disablePortal={true}
                    placement="top-end"
                    id={id}
                    anchorEl={anchorNotification}
                    open={openNotification}
                    onClose={handleNotificationDropdownClose}
                    className={"max-h-48  overflow-auto bg-gray-50 rounded-3xl shadow-lg "}>

                    <List className={"mx-auto "}>
                        {notification.length === 0?
                            <ListItem value={null} ></ListItem>:
                            notification.map((notify) => (<ListItem value={notify.id} className={"hover:bg-[#ECF4F1]"}>
                                <ListItemText primary={notify.title} secondary={notify.message} onClick={()=>handleItem(notify.id)}/>
                            </ListItem>))
                        }
                        {notification.length !== 0?<ListItem className={"font-bold mx-auto hover:bg-[#ECF4F1]"} onClick={()=>readAll(notification)}> Read All</ListItem>:
                        <span className={"mx-auto px-5  my-auto"}>There is no message.</span>}
                    </List>
                </Popper>

            </div>
        </nav>

    );
}
