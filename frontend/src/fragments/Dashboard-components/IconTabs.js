import React from 'react'

import {FiUser} from 'react-icons/fi';
import {HiOutlineDeviceTablet} from 'react-icons/hi';
import {BsReceipt} from 'react-icons/bs';
import {MdSystemUpdateAlt} from 'react-icons/md';
import {RiLogoutBoxLine} from 'react-icons/ri';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import TabPanel from '@mui/lab/TabPanel';
                                              

import './IconTabs.css';
import UserTable from './UserTable';

export default function IconTabs() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div class='sdb-holder'>
            <div class='sdb-left-panel'>
                <div class='sdb-controls'>
                    <Tabs value={value} onChange={handleChange} aria-label="staff-dashboard" orientation='vertical'>
                        <Tab icon={
                            <div class="sdbl-control">
                                <Tooltip title="Users" placement='right' arrow> 
                                    <FiUser/>
                                </Tooltip>
                            </div>  
                        } aria-label="users"/>

                        <Tab icon={
                            <div class="sdbl-control">
                                <Tooltip title="Devices" placement='right' arrow> 
                                    <HiOutlineDeviceTablet/>
                                </Tooltip>
                            </div>  
                        } aria-label="users"/>
                        <Tab icon={
                            <div class="sdbl-control">
                                <Tooltip title="Transactions" placement='right' arrow> 
                                    <BsReceipt/>
                                </Tooltip>
                            </div>  
                        } aria-label="users"/>
                        <Tab icon={
                            <div class="sdbl-control">
                                <Tooltip title="Update Vendors" placement='right' arrow> 
                                    <MdSystemUpdateAlt/>
                                </Tooltip>
                            </div>  
                        } aria-label="users"/>
                    </Tabs>
                </div>
                <div class='sdbl-exit'>
                    <div class="sdbl-logout">
                        <Tooltip title="Logout" placement='right' arrow>
                            <IconButton>      
                                <RiLogoutBoxLine/>  
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div class='sdb-main'>
                <div class="sdb-main-users h-100">
                    {/* <TabPanel value={value} index={0}> */}
                        <UserTable/>
                    {/* </TabPanel> */}
                </div>
            </div>
        </div>
    )
}
