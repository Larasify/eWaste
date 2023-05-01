import React, {useContext} from 'react'
import {Outlet} from 'react-router-dom'

import Header from './Header'
import {AuthContextProvider} from "../App";
import {Modal} from "@mui/material";
import Login from "./Login";

export default function Layout() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <AuthContextProvider>
            <Modal open={open} onClose={handleClose}>
                <Login loginModalClose={handleClose}/>
            </Modal>
            <div>
                <Header openLoginWindow={handleOpen}/>
            </div>
            <div>
                <Outlet/>
            </div>
        </AuthContextProvider>
    );
};
