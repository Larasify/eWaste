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
                <img src="../images/avatar.PNG" alt=""
                     className={"w-1/2 m-auto rounded-2xl border-[#3fb78c] border-2"}/>
            </div>
            <form action="#" className={"w-2/3 h-full flex flex-row"}>
                <div className={"w-1/2 h-full flex flex-col"}>
                    <label htmlFor="givenNameInput">Given name:</label>
                    <input type="text" id={"givenNameInput"}/>
                    <label htmlFor="surnameInput">Surname: </label>
                    <input type="text" id={"surnameInput"}/>
                    <label htmlFor="emailInput">Email: </label>
                    <input type="text" id={"emailInput"}/>
                    <label htmlFor="passwordInput">Password: </label>
                    <input type="password" id={"passwordInput"}/>
                </div>
                <div className={"w-1/2 h-full"}>
                    <input type="radio" id={"staffRadio"} name={"role"} value={"staff"}/>
                    <label htmlFor={"staffRadio"}>Staff</label>
                    <input type="radio" id={"userRadio"} name={"role"} value={"user"}/>
                    <label htmlFor="userRadio">User</label>
                    <input type="submit"/>
                </div>
            </form>
        </div>

    );
}