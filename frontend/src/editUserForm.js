import './editUserForm.css';
import logo from './imgs/logo.png'

export default function editUserForm() {
    return (
        <nav className={"w-full h-16 md:h-24 bg-gradient-to-r from-[#c7efd7] to-[#ebfff3]"}><div className={"w-full h-full bg-bottom bg-[url('./imgs/grass.png')]"}>
            <img src={logo} alt="" className={"inset-y-0 left-0 h-full"}/>
        </div></nav>
    )
}