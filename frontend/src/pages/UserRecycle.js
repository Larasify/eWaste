import React,{useEffect} from 'react';
import {BsFillArrowLeftCircleFill, BsPaypal} from "react-icons/bs";
import {FaCcStripe} from "react-icons/fa";
import './UserRecycle.css';
import IconTabs from '../fragments/Useraccount-components/IconTabs';
import {IoChevronBackCircle} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {Notify} from "../fragments/Notify";

export default function UserRecycle(){
    let navigate = useNavigate();

    const askBackward = () => {
        if (window.confirm("Are you sure you want to backward? Your update will be lost. ")) {
            navigate(-1);
        }
    };

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
                Notify.error("internal error: " + response.statusText)
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
        <div className={"flex flex-col md:flex-row relative my-4 w-11/12 mx-auto h-5/6 bg-white rounded-3xl"}>
            <div className={"w-full md:w-1/5 h-full rounded-l-2xl bg-[#ECF4F1]"}>
                <div className={"inline-flex w-full text-2xl md:text-4xl p-4 md:p-6 items-center text-black"}
                     onClick={askBackward}>
                    <IoChevronBackCircle className={"mx-2"}/>
                    <h1>Details</h1>
                </div>
                <img src="../images/phone-generic.jpg" alt=""
                     className={"w-1/2 md:w-4/5 m-auto md:mx-auto md:my-2 rounded-full "}/>

                <div className={"p-4 w-max mx-auto"}>
                    <p className={"md:m-4 mx-auto text-center md:text-left leading-loose"}>
                    <span
                        className={"text-base lg:text-2xl  text-black text-left font-bold lg:leading-10"}>{userInfo.firstName + ' ' + userInfo.lastName}</span>
                        <br/>

                        <span
                            className={"text-base lg:text-lg  text-[#509E82] underline text-left lg:leading-loose flex-wrap"}>{userInfo.email}</span>
                    </p>
                </div>
            </div>

            {/*list*/}
            <div className={"flex flex-col border-0 md:rounded-r-lg w-full  h-full bg-white md:bg-white overflow-auto p-2 max-h-max"}>
                <IconTabs/>
            </div>
        </div>
    )
}


