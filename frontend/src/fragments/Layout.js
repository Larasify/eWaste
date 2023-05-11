import React, {useContext} from 'react'
import {Outlet} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

import Header from './Header'
import {AuthContextProvider} from "../App";
import {Modal} from "@mui/material";
import Login from "./Login";
import Box from "@mui/material/Box";

export let openLoginWindow;

export default function Layout() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    openLoginWindow = handleOpen;
    return (
        <AuthContextProvider>
            <Toaster 
            position="bottom-left"/>
            <Modal open={open} onClose={handleClose}>
                <Box>
                    <Login loginModalClose={handleClose}/>
                </Box>
            </Modal>
            <div>
                <Header openLoginWindow={handleOpen}/>
            </div>
            <div className={"pt-16 lg:pt-24"}>
                <Outlet/>
            </div>
        </AuthContextProvider>
    );
};
