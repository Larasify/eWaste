/**
 * System Layout Component
 * @version 1
 * @author [Samar Musthafa](https://git.shefcompsci.org.uk/act22sm)
 * 
 */
/* Module Imports */
import React, {useContext} from 'react'
import {Outlet} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

/* Local imports */
import Header from './Header'
import {AuthContextProvider} from "../App";
import {Modal} from "@mui/material";
import Login from "./Login";
import Box from "@mui/material/Box";

export let openLoginWindow;

export default function Layout() {
    /* if login modal open */
    const [open, setOpen] = React.useState(false);

    /* Setters */
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    openLoginWindow = handleOpen;
    return (
        /* Modal on Layout */
        <AuthContextProvider>
            <Toaster 
            position="bottom-left"/>
            <Modal open={open} onClose={handleClose}>
                <Box>
                    <Login loginModalClose={handleClose}/>
                </Box>
            </Modal>
            {/* Render content */}
            <div>
                {/* Header */}
                <Header openLoginWindow={handleOpen}/>
            </div>
            {/* Page */}
            <div className={"pt-16 lg:pt-24"}>
                <Outlet/>
            </div>
        </AuthContextProvider>
    );
};
