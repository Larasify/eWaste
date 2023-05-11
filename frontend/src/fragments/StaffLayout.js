/**
 * Staff and admin Layout
 * @version 1
 * @author [Samar Musthafa](https://git.shefcompsci.org.uk/act22sm)
 * 
 */
/* Module imports */
import React from 'react'
import {Outlet} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Box from "@mui/material/Box";
import {Modal} from "@mui/material";

/* File imports */
import {AuthContextProvider} from "../App";
import Login from "./Login";

export default function Layout() {
    /* setters of modal */
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        /* Staff and admin layout */
        <AuthContextProvider>
            <Toaster
            position="bottom-right"/>
            <Modal open={open} onClose={handleClose}>
                <Box>
                    <Login loginModalClose={handleClose}/>
                </Box>
            </Modal>
            {/* Dashboard */}
            <div className={""}>
                <Outlet/>
            </div>
        </AuthContextProvider>
    );
};
