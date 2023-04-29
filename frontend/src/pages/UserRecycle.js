import React, {useEffect} from 'react';
import {BsFillArrowLeftCircleFill, BsPaypal} from "react-icons/bs";
import {FaCcStripe} from "react-icons/fa";
import './UserRecycle.css';
import IconTabs from '../fragments/Useraccount-components/IconTabs';

export default function UserRecycle(){
    const [userInfo, setUserInfo] = React.useState({
        firstName: 'Harper',
        lastName: 'Perez',
        email:'jijdiew@gmail.com',
        id:'32344'
    })
    useEffect(() =>{
        const getUserRequest = new Request({
            headers: new Headers({"Content-Type": "application/json"}),
            method: "GET"
        });
        fetch("/user/getuser", getUserRequest).then((response) => {
            if (response.status !== 200) {
                alert("internal error: " + response.statusText)
            } else {
                return response.json()
            }
        }).then((data) => {
            if (data['message'] === "not_logged_in") {
                //TODO jump to login page
            } else if (data['response'] === "success") {
                const user_info = data['user_info']
                setUserInfo({
                    firstName: user_info["first_name"],
                    lastName: user_info["last_name"] || " ",
                    email: user_info["email"],
                    id: "Hello "
                })
            }
        })
    }, [])
    return(
        <div className="user-recycle-container text-center">
            <div className="user-info-col" style={{width:"20%"}}>
                <button className='return-btn'><BsFillArrowLeftCircleFill size={48}/></button>
                <button className="user-avatar" style={{width: "180px", height: "180px"}}>
                    <img src="../images/phone-generic.jpg" alt={""}/>
                </button>
                <p style={{margin: "0 auto", textAlign: "left", lineHeight: 2}}>
                    <span style={{
                        fontSize: 25,
                        color: "black",
                        textAlign: "left",
                        fontWeight: "bold"
                    }}>{userInfo.firstName + ' ' + userInfo.lastName}</span>
                    <br/>
                    <span style={{fontSize: 18, color: "#494949", textAlign: "left"}}>{'#' + userInfo.id}</span>
                    <br/>
                    <span style={{
                        fontSize: 20,
                        color: "#509E82",
                        textDecoration: "underline",
                        textAlign: "left"
                    }}>{userInfo.email}</span>
                </p>
            </div>

            <div className="user-edit-col">
                <IconTabs/>
            </div>
        </div>
    )
}


