import './editUserForm.css';
import React from "react";
import { IoChevronBackCircle } from "react-icons/io5";
import {useNavigate} from "react-router-dom";

export default function EditUserForm() {
    let navigate = useNavigate();
    const askBackward = () => {
        if (window.confirm("Are you sure you want to backward? Your update will be lost. ")) {
            navigate(-1);
        }
    };

    return (
        <div className={"flex flex-col md:flex-row relative my-4 w-5/6 mx-auto h-5/6 bg-[#ECF4F1] rounded-3xl"}>
            <div className={"w-full md:w-1/3 h-full rounded-l-2xl"}>
                <div className={"inline-flex w-full text-3xl md:text-4xl p-4 md:p-6 items-center text-black"}
                     onClick={askBackward}>
                    <IoChevronBackCircle className={"mx-2"}/>
                    <h1>User Details</h1>
                </div>
                <img src="../images/phone-generic.jpg" alt=""
                     className={"w-2/3 m-auto md:mt-8 md:mx-auto  rounded-2xl border-[#3fb78c] border-2"}/>
            </div>
            {/*<form action="#" className={"w-2/3 h-full flex flex-col p-5"}>*/}
                {/*<div className={"w-1/2 h-full flex flex-col p-5"}>*/}
                {/*    <label htmlFor="givenNameInput">Given name:</label>*/}
                {/*    <input type="text" id={"givenNameInput"}/>*/}
                {/*    <label htmlFor="surnameInput">Surname: </label>*/}
                {/*    <input type="text" id={"surnameInput"}/>*/}
                {/*    <label htmlFor="emailInput">Email: </label>*/}
                {/*    <input type="text" id={"emailInput"}/>*/}
                {/*    <label htmlFor="passwordInput">Password: </label>*/}
                {/*    <input type="password" id={"passwordInput"}/>*/}
                {/*</div>*/}
                {/*<div className={"w-1/2 h-full"}>*/}
                {/*    /!*<input type="radio" id={"staffRadio"} name={"role"} value={"staff"}/>*!/*/}
                {/*    /!*<label htmlFor={"staffRadio"}>Staff</label>*!/*/}
                {/*    /!*<input type="radio" id={"userRadio"} name={"role"} value={"user"}/>*!/*/}
                {/*    /!*<label htmlFor="userRadio">User</label>*!/*/}
                {/*    <input type="submit"/>*/}
                {/*</div>*/}
            {/*    <label htmlFor="givenNameInput">Given Name:</label>*/}
            {/*    <input type="text" id={"givenNameInput"}/>*/}
            {/*    <label htmlFor="lastNameInput">Last Name:</label>*/}
            {/*    <input type="text" id={"lastNameInput"}/>*/}
            {/*    <label htmlFor="emailInput">Email:</label>*/}
            {/*    <input type="text" id={"emailInput"}/>*/}
            {/*    <label htmlFor="phoneInput">Phone:</label>*/}
            {/*    <input type="text" id={"phoneInput"}/>*/}
            {/*    <label htmlFor="passwordInput">Password:</label>*/}
            {/*    <input type="password" id={"passwordInput"}/>*/}
            {/*    <div>*/}
            {/*        <input type="checkbox" value={"staff"} name={"role"} id={"staffCheckbox"}/>*/}
            {/*        <label htmlFor="staffCheckbox">Staff</label>*/}
            {/*        <input type="checkbox" value={"user"} name={"role"} id={"userCheckbox"}/>*/}
            {/*        <label htmlFor="userCheckbox">User</label>*/}
            {/*    </div>*/}
            {/*    <input type="submit"/>*/}
            {/*</form>*/}
            <div className={"flex flex-col border-0 md:rounded-r-lg w-full md:w-4/5 h-full bg-white md:bg-auto overflow-auto p-4 md:p-16"}>
                <div className={"md:grid md:grid-cols-2 gap-x-10 mt-6 md:mb-2 "}>
                    <div>
                        <label htmlFor="firstNameInput" className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                            First Name</label>
                        <input
                            className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"firstNameInput"}></input>
                    </div>
                    <br className={"block md:hidden"}/>
                    <div>
                        <label htmlFor="lastNameInput" className={" text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Last Name</label>
                        <input
                            className={" block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"lastNameInput"}></input>
                    </div>
                </div>
                {/*<div className={"flex flex-col mt-4 w-full"}>*/}
                {/*    <label htmlFor="emailInput" className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>**/}
                {/*        Email</label>*/}
                {/*    <input*/}
                {/*        className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}*/}
                {/*        type="text" id={"emailInput"}></input>*/}
                {/*</div>*/}
                {/*<div className={"flex flex-col mt-4 w-full"}>*/}
                {/*    <label htmlFor="phoneInput" className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>* Phone*/}
                {/*        Number</label>*/}
                {/*    <input*/}
                {/*        className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}*/}
                {/*        type="text" id={"phontNumberInput"}></input>*/}
                {/*</div>*/}
                {/*<div className={"flex flex-col mt-4 w-full"}>*/}
                {/*    <label htmlFor="passwordInput" className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>**/}
                {/*        Password</label>*/}
                {/*    <input*/}
                {/*        className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}*/}
                {/*        type="password" id={"passwordInput"}></input>*/}
                {/*</div>*/}
                <div className={"md:grid md:grid-cols-2 gap-x-10 mt-6 md:mb-2 "}>
                    <div>
                        <label htmlFor="emailInput" className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Email</label>
                        <input
                            className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"emailInput"}></input>
                    </div>
                    <br className={"block md:hidden"}/>
                    <div>
                        <label htmlFor="phoneInput" className={" text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Phone Number</label>
                        <input
                            className={" block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="text" id={"phoneInput"}></input>
                    </div>
                </div>

                <div className={"md:grid md:grid-cols-2 gap-x-10 mt-6 md:mb-6 "}>
                    <div>
                        <label htmlFor="passwordInput" className={"text-left block mb-4 text-xl font-medium text-gray-900 dark:text-white"}>*
                            Password</label>
                        <input
                            className={"block w-full p-2 md:p-3 text-gray-900 border border-[#509E82] border-2 rounded-lg bg-gray-50 sm:text-md focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]"}
                            type="password" id={"passwordInput"}></input>
                    </div>
                </div>
                <div className={"mt-4 flex flex-row space-x-10 mb-6"}>
                    <div className={"flex my-auto items-center "}>
                        <input id="staffCheckbox" className="h-4 w-4 md:h-6 md:w-6 border border-[#509E82] mr-4  border-2 focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]" type="checkbox" value={"staff"}></input>
                        <label htmlFor={"staffCheckbox"} className={"text-left block text-xl font-medium text-gray-900 dark:text-white"}>Staff</label>
                    </div>
                    <br className={"md:hidden"}/>
                    <div className={"flex my-auto items-center"}>
                        <input id="userCheckbox" className="h-4 w-4  md:h-6 md:w-6  border border-[#509E82] border-2 mr-4 focus:outline-0 focus:ring-[#3fb78c] focus:border-[#3fb78c]" type="checkbox" value={"user"}></input>
                        <label htmlFor={"userCheckbox"} className={"text-left block text-xl font-medium text-gray-900 dark:text-white"}>User</label>

                        </div>
                </div>


                <button
                    className={"flex w-2/5 lg:w-2/5 h-full mt-6 p-2 md:p-3 mx-auto cursor-pointer bg-[#509E82] text-white  rounded-full items-center justify-center text-2xl font-bold mb-6"}>
                    Apply
                </button>
            </div>
        </div>

    );
}