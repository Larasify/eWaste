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

export default function IconTabs() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div class='user-holder'>
            <div class='user-main'>
                <div class="user-main-users h-100">
                    {/* <TabPanel value={value} index={0}> */}
                        <UserTable/>
                    {/* </TabPanel> */}
                </div>
            </div>
        </div>
    )
}
