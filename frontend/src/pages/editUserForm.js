import './editUserForm.css';
import React from "react";
import { IoChevronBackCircle } from "react-icons/io5";

export default function EditUserForm() {
    return (
        <div className={"border-2 flex flex-row w-3/4 h-96 m-auto mt-4 rounded-2xl"}>
            <div className={"w-1/3 h-full rounded-l-2xl bg-[#ebfff3]"}>
                <div className={"inline-flex w-full text-2xl p-4 items-center text-black"}>
                    <IoChevronBackCircle className={"mx-2"}/>
                    <h1>Details</h1>
                </div>
                <img src="../images/phone-generic.jpg" alt=""
                     className={"w-1/2 m-auto rounded-2xl border-[#3fb78c] border-2"}/>
            </div>
            <form action="#" className={"w-2/3 h-full flex flex-col p-5 justify-around"}>
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
                <label htmlFor="givenNameInput" className={"text-lg"}>Given Name:</label>
                <input type="text" id={"givenNameInput"} className={"rounded-2xl border border-[#3fb78c] focus:outline-0 focus-visible:border-[#499177] focus-visible:border-2"}/>
                <label htmlFor="lastNameInput" className={"text-lg"}>Last Name:</label>
                <input type="text" id={"lastNameInput"} className={"rounded-2xl border-2 border-[#3fb78c] focus:outline-0 focus-visible:border-[#499177]"}/>
                <label htmlFor="emailInput" className={"text-lg"}>Email:</label>
                <input type="text" id={"emailInput"} className={"rounded-2xl border-2 border-[#3fb78c] focus:outline-0 focus-visible:border-[#499177]"}/>
                <label htmlFor="phoneInput" className={"text-lg"}>Phone:</label>
                <input type="text" id={"phoneInput"} className={"rounded-2xl border-2 border-[#3fb78c] focus:outline-0 focus-visible:border-[#499177]"}/>
                <label htmlFor="passwordInput" className={"text-lg"}>Password:</label>
                <input type="password" id={"passwordInput"} className={"rounded-2xl border-2 border-[#3fb78c] focus:outline-0 focus-visible:border-[#499177]"}/>
                <div className={"text-xl"}>
                    <input type="checkbox" value={"staff"} name={"role"} id={"staffCheckbox"} className={"text-2xl rounded-2xl border-2 border-[#3fb78c] checked:outline-0 focus-visible:border-[#499177]"}/>
                    <span> </span>
                    <label htmlFor="staffCheckbox">Staff</label>
                    <span> </span>
                    <input type="checkbox" value={"user"} name={"role"} id={"userCheckbox"}/>
                    <span> </span>
                    <label htmlFor="userCheckbox">User</label>
                </div>
                <input className={"place-self-end"} type="submit"/>
            </form>
        </div>

    );
}