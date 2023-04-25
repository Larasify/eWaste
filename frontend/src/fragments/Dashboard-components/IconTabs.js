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
import TabPanel from './TabPanel.js';
import DataTable from './DataTable';

export default function IconTabs() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getUserTable = () => {
        //fetch data for this table
        const cols =  [
            { field: 'name', headerName: 'Name', flex: 2},
            { field: 'address', headerName: 'Address', flex: 2,},
            {
              field: 'email',
              headerName: 'Email',
              flex: 2,
            },
            {
              field: 'orders',
              headerName: 'Orders',
              type: 'number',
              flex: 1
            },
            {
              field: 'status',
              headerName: 'Account Status',
              flex: 1
            }
        ];
        const rows = [
            { id: 1, name: 'Alakazam', address: '16 High Street', email: "aspdoas@gmail.com", orders: 2, status: 'Enabled' },
            { id: 2, name: 'Alakazam', address: '16 High Street', email: "fhfgs@gmail.com", orders: 2, status: 'Enabled'  },
            { id: 3, name: 'Alakazam', address: '16 High Street', email: "xcvxcv@gmail.com", orders: 2, status: 'Enabled' },
            { id: 4, name: 'Alakazam', address: '16 High Street', email: "aspdoas@gmail.com", orders: 2, status: 'Enabled' },
            { id: 5, name: 'Alakazam', address: '16 High Street', email: "asd@gmail.com", orders: 10, status: 'Enabled' },
            { id: 6, name: 'Alakazam', address: '16 High Street', email: "aspdoas@gmail.com", orders: 2, status: 'Enabled' },
            { id: 7, name: 'Alakazam', address: '16 High Street', email: "wew@gmail.com", orders: 4, status: 'Enabled' },
            { id: 8, name: 'Alakazam', address: '16 High Street', email: "aspdoas@gmail.com", orders: 2, status: 'Enabled' },
            { id: 9, name: 'Alakazam', address: '16 High Street', email: "ere@gmail.com", orders: 2, status: 'Enabled' },
            { id: 21, name: 'Alakazam', address: '16 High Street', email: "aspdoas@gmail.com", orders: 2, status: 'Enabled' },
            { id: 22, name: 'Alakazam', address: '16 High Street', email: "fhfgs@gmail.com", orders: 2, status: 'Enabled' },
            { id: 23, name: 'Alakazam', address: '16 High Street', email: "xcvxcv@gmail.com", orders: 2, status: 'Enabled' },
            { id: 24, name: 'Alakazam', address: '16 High Street', email: "aspdoas@gmail.com", orders: 2, status: 'Enabled' },
            { id: 25, name: 'Alakazam', address: '16 High Street', email: "asd@gmail.com", orders: 10, status: 'Enabled' },
            { id: 26, name: 'Alakazam', address: '16 High Street', email: "aspdoas@gmail.com", orders: 2, status: 'Enabled' },
            { id: 27, name: 'Alakazam', address: '16 High Street', email: "wew@gmail.com", orders: 4, status: 'Enabled' },
            { id: 28, name: 'Alakazam', address: '16 High Street', email: "aspdoas@gmail.com", orders: 2, status: 'Enabled' },
            { id: 29, name: 'Alakazam', address: '16 High Street', email: "ere@gmail.com", orders: 2, status: 'Enabled' },
            { id: 11, name: 'Alakazam', address: '16 High Street', email: "aspdoas@gmail.com", orders: 2, status: 'Enabled' },
            { id: 12, name: 'Alakazam', address: '16 High Street', email: "fhfgs@gmail.com", orders: 2, status: 'Enabled' },
            { id: 13, name: 'Alakazam', address: '16 High Street', email: "xcvxcv@gmail.com", orders: 2, status: 'Enabled' },
            { id: 14, name: 'Alakazam', address: '16 High Street', email: "aspdoas@gmail.com", orders: 2, status: 'Enabled' },
            { id: 15, name: 'Alakazam', address: '16 High Street', email: "asd@gmail.com", orders: 10, status: 'Enabled' },
            { id: 16, name: 'Alakazam', address: '16 High Street', email: "aspdoas@gmail.com", orders: 2, status: 'Enabled' },
            { id: 17, name: 'Alakazam', address: '16 High Street', email: "wew@gmail.com", orders: 4, status: 'Enabled' },
            { id: 18, name: 'Alakazam', address: '16 High Street', email: "aspdoas@gmail.com", orders: 2, status: 'Enabled' },
            { id: 19, name: 'Alakazam', address: '16 High Street', email: "ere@gmail.com", orders: 2, status: 'Enabled' },
        ];
        return {
            cols,
            rows
        }
    }

    const userData = getUserTable();

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
            <div className='flex flex-col w-full h-full'>
                <div className="h-full">
                    <TabPanel className="h-full max-h-fit overflow-y-scroll" value={value} index={0}>
                        <DataTable 
                            rows={userData.rows}
                            cols={userData.cols}
                            fns={["Add User", "Delete User", "Edit User", "Freeze User Account"]}
                            title="User"
                            count={1024}
                        />
                    </TabPanel>
                    <TabPanel className="h-full max-h-fit overflow-y-scroll" value={value} index={1}>
                        <DataTable 
                            rows={userData.rows}
                            cols={userData.cols}
                            fns={["Add Device", "Delete Device", "Edit Device", "Freeze Device Record"]}
                            title="Device"
                            count={220}
                        />
                    </TabPanel>
                    <TabPanel className="h-full max-h-fit overflow-y-scroll" value={value} index={2}>
                        <DataTable 
                            rows={userData.rows}
                            cols={userData.cols}
                            fns={["Add Transaction", "Delete Transaction", "Edit Transaction", "Freeze Transaction Record"]}
                            title="Transaction"
                            count={4404}
                        />
                    </TabPanel>
                    <TabPanel className="h-full max-h-fit overflow-y-scroll" value={value} index={3}>
                        <DataTable 
                            rows={userData.rows}
                            cols={userData.cols}
                            fns={["Add Datasource", "Delete Datasource", "Edit Datasource", "Freeze Datasource Entry"]}
                            title="Datasource"
                            count={55509}
                        />
                    </TabPanel>
                </div>
            </div>
        </div>
    )
}
