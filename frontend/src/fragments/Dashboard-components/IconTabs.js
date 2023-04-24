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
                                              

import './IconTabs.css';
import UserTable from './UserTable';
import TabPanel from './TabPanel.js';

export default function IconTabs() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={'flex w-full h-full flex-row'} style={{height: "calc(100vh - 6rem)"}}>
            <div className={"flex flex-col w-16 h-full items-center sdb-controls"} style={{backgroundColor: '#ebebeb'}}>
                <div className='flex flex-col h-full'>
                    <Tabs value={value} onChange={handleChange} aria-label="staff-dashboard" orientation='vertical'>
                        <Tab icon={
                            <div className="text-2xl flex justify-center cursor-pointer mt-4 mb-8 sdb-tab">
                                <Tooltip title="Users" placement='right' arrow> 
                                    <FiUser/>
                                </Tooltip>
                            </div>  
                        } aria-label="users"/>

                        <Tab icon={
                            <div className="text-2xl flex justify-center cursor-pointer mb-8 sdb-tab">
                                <Tooltip title="Devices" placement='right' arrow> 
                                    <HiOutlineDeviceTablet/>
                                </Tooltip>
                            </div>  
                        } aria-label="users"/>
                        <Tab icon={
                            <div className="text-2xl flex justify-center cursor-pointer mb-8 sdb-tab">
                                <Tooltip title="Transactions" placement='right' arrow> 
                                    <BsReceipt/>
                                </Tooltip>
                            </div>  
                        } aria-label="users"/>
                        <Tab icon={
                            <div className="text-2xl flex justify-center cursor-pointer mb-8 sdb-tab">
                                <Tooltip title="Update Vendors" placement='right' arrow> 
                                    <MdSystemUpdateAlt/>
                                </Tooltip>
                            </div>  
                        } aria-label="users"/>
                    </Tabs>
                </div>
                <div className='flex flex-col h-1/6 items-end'>
                    <div className="text-2xl mb-8 flex justify-self-end cursor-pointer">
                        <Tooltip title="Logout" placement='right' arrow>
                            <IconButton>      
                                <RiLogoutBoxLine/>  
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full h-full m-8'>
                <div className="h-full">
                    <TabPanel value={value} index={0}>
                        <UserTable/>
                    </TabPanel>
                </div>
            </div>
        </div>
    )
}
