import React from 'react';
import {BsFillArrowLeftCircleFill, BsPaypal} from "react-icons/bs";
import './UserAccount.css';
import {FaCcStripe} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {IoChevronBackCircle} from "react-icons/io5";

const user = {
    props:{
        firstName: 'Harper',
        lastName: 'Perez',
        email:'jijdiew@gmail.com',
        id:'32344',
    }
};

const editOnclick = () =>{
    const myRequest = new Request("",{
        headers: new Headers({"Content-type":'application/json'}),
        methods:"POST",
        body:{
            "first_name":document.getElementById("firstNameInput").value,
            "last_name":document.getElementById("lastNameInput").value,
            // "password":document.getElementById("passwordInput").value,
            // "password":document.getElementById("passwordInput").value,
            // "password":document.getElementById("passwordInput").value,
            // "password":document.getElementById("passwordInput").value,
        }
    });
    fetch(myRequest).then((response) => response.json()).then((data)=>{
        if(data['response'] === "success"){
            window.location.href="/";
        }
        else{
            alert(data['message']);
        }
    })
}


export default function UserAccount(){
    let navigate = useNavigate();
    const returnHome = () =>{
        navigate(`/`);
    }
    const askBackward = () => {
        if (window.confirm("Are you sure you want to backward? Your update will be lost. ")) {
            navigate(-1);
        }
    };

    return (
        <div className={"flex flex-col md:flex-row relative my-4 w-5/6 mx-auto h-5/6 bg-[#ECF4F1] rounded-3xl"}>
            {/*<div className={"absolute md:flex md:justify-start md:items-stretch md:flex-col bg-[#E3F0EB] rounded-l-lg w-full md:w-1/4"}>*/}
            {/*    <button className={"flex justify-start items-center bg-transparent ml-6 mt-4 md:ml-8 md:mt-6 "} style={{color:"#509E82"}} onClick={returnHome}><BsFillArrowLeftCircleFill size={48}/></button>*/}
            {/*    <a className={"flex md:justify-center bg-transparent md:items-center rounded-full w-16 h-16 md:w-32 md:h-32 lg:w-48 lg:h-48 md:mx-auto md:mt-12"} href={"#"}>*/}
            {/*        <img src="../images/phone-generic.jpg" alt={""}/>*/}
            {/*    </a>*/}
            {/*    <p className={"md:mt-10 md:mx-auto text-left leading-loose"} >*/}
            {/*        <span className={"text-base md:text-2xl lg:text-4xl text-black text-left font-bold lg:leading-10"} >{user.props.firstName + ' ' + user.props.lastName}</span>*/}
            {/*        <br/>*/}
            {/*        <span className={"text-base md:text-lg lg:text-xl text-[#494949] text-left "} >{'#'+user.props.id}</span>*/}
            {/*        <br/>*/}
            {/*        <span className={"text-base md:text-xl lg:text-2xl text-[#509E82] underline text-left lg:leading-loose "} >{user.props.email}</span>*/}
            {/*    </p>*/}
            {/*</div>*/}

            <div className={"w-full md:w-1/3 h-full rounded-l-2xl"}>
                <div className={"inline-flex w-full text-3xl md:text-4xl p-4 md:p-6 items-center text-black"}
                     onClick={askBackward}>
                    <IoChevronBackCircle className={"mx-2"}/>
                    <h1>Details</h1>
                </div>
                <img src="../images/phone-generic.jpg" alt=""
                     className={"w-1/2 m-auto md:mx-auto md:my-2 rounded-2xl border-[#3fb78c] border-2"}/>

                <div className={"p-4 w-max mx-auto"}>
                    <p className={"md:m-4 mx-auto text-center md:text-left leading-loose"}>
                    <span
                        className={"text-base md:text-2xl lg:text-4xl text-black text-left font-bold lg:leading-10"}>{user.props.firstName + ' ' + user.props.lastName}</span>
                        <br/>
                        <span
                            className={"text-base md:text-lg lg:text-xl text-[#494949] text-left "}>{'#' + user.props.id}</span>
                        <br/>
                        <span
                            className={"text-base md:text-xl lg:text-2xl text-[#509E82] underline text-left lg:leading-loose "}>{user.props.email}</span>
                    </p>
                </div>
            </div>
            <div
                className={"flex flex-col border-0 md:rounded-r-lg w-full md:w-4/5 h-full bg-white md:bg-auto overflow-auto p-4 md:p-16"}>
                <div className={"md:grid md:grid-cols-2 gap-x-4 mt-6 md:mb-6 "}>
                    <div>
                        <label className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                            First Name</label>
                        <input
                            className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"firstNameInput"}></input>
                    </div>
                    <br className={"block md:hidden"}/>
                    <div>
                        <label className={" text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Last Name</label>
                        <input
                            className={" block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"lastNameInput"}></input>
                    </div>
                </div>
                <div className={"flex flex-col mt-4 w-full"}>
                    <label className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                        Password</label>
                    <input
                        className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                        type="password" id={"passwordInput"}></input>
                </div>
                <div className={"flex flex-col mt-4 w-full"}>
                    <label className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                        Confirm Password</label>
                    <input
                        className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                        type="password" id={"confirmPasswordInput"}></input>
                </div>
                <div className={"flex flex-col mt-4 w-full"}>
                    <label className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                        Email</label>
                    <input
                        className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                        type="text" id={"emailInput"}></input>
                </div>
                <div className={"flex flex-col mt-4 w-full"}>
                    <label className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>* Phone
                        Number</label>
                    <input
                        className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                        type="text" id={"phontNumberInput"}></input>
                </div>
                {/*<div className={"inline mt-4 space-x-6 grid grid-cols-4"}>*/}
                {/*    <label className= {"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>* Payment:</label>*/}

                {/*    <div className={"flex items-center "}>*/}
                {/*        <input className="h-4 w-4 border-gray-300 mr-2 focus:ring-indigo-600" type="radio" name="flexRadio" id="flexRadioPaypal"></input>*/}
                {/*        <label htmlFor="flexRadioPaypal" className='block leading-6'><BsPaypal size={40}/></label>*/}
                {/*    </div>*/}
                {/*    <div className={"flex items-center "}>*/}
                {/*        <input className="h-4 w-4 border-gray-300 mr-4 focus:ring-indigo-600" type="radio" name="flexRadio" id="flexRadioStripe"></input>*/}
                {/*        <label htmlFor="flexRadioStripe" className='block leading-6'><FaCcStripe size={40}/></label>*/}

                {/*    </div>*/}
                {/*    <button className={" flex cursor-pointer bg-[#509E82] text-white  rounded-xl items-center justify-center text-xl font-bold "} >*/}
                {/*        Edit*/}
                {/*    </button>*/}
                {/*</div>*/}
                <button
                    className={"flex w-3/5 lg:w-2/5 h-full mt-6 p-2 md:p-3 mx-auto cursor-pointer bg-[#509E82] text-white  rounded-xl items-center justify-center text-2xl font-bold mb-6"}>
                    Save
                </button>
            </div>
        </div>
    );
}


