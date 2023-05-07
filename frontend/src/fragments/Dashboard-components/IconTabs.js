import React, {useContext} from 'react'
import {FiUser} from 'react-icons/fi';
import {HiOutlineDeviceTablet} from 'react-icons/hi';
import {BsReceipt} from 'react-icons/bs';
import {MdSystemUpdateAlt} from 'react-icons/md';
import {RiLogoutBoxLine} from 'react-icons/ri';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from "react-router-dom";
import Tab from '@mui/material/Tab';

import './IconTabs.css';
import TabPanel from './TabPanel.js';
import {AuthContext} from "../../App";
import {logoutSubmit} from "../Login.js";
import DataTable from './DataTable';
import { Notify } from '../Notify';

export default function IconTabs() {

    const authState = useContext(AuthContext)
    const navigate = useNavigate();

    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = React.useState(true)
    const [userData, setUserData] = React.useState({cols: [], rows: []})
    const [deviceData, setDeviceData] = React.useState({cols: [], rows: []})
    const [transactionData, setTransactionData] = React.useState({cols: [], rows: []})
    const [vendorData, setVendorData] = React.useState({cols: [], rows: []})

    React.useEffect(() => {
        fetchData();
    }, [loading])

    const fetchData = () => {
        fetch('/user/getuserlist')
        .then(userRequest => (userRequest).json())
        .then(users => {
            const userList = (users.user_list).filter(u => !u.is_deleted);
            userList.map( u => u.id = u._id)
            setUserData({
                cols: [
                    {field: 'first_name', headerName: 'First Name', flex: 2},
                    {field: 'last_name', headerName: 'Last Name', flex: 2},
                    {field: 'phone_no', headerName: 'Phone Number', flex: 2},
                    {field: 'email', headerName: 'Email', flex: 2},
                    {field: 'privilege', headerName: 'Privilege', flex: 1},
                ],
                rows: userList
            });
        });
        fetch('/device/getdevicelist')
        .then(deviceRequest => (deviceRequest).json())
        .then(devices => {
            const deviceList = (JSON.parse(devices.device_list)).filter(u => !u.is_deleted);
            deviceList.map( u => {
                u.id = u._id
                u.payment_status = u.payment_id ? 'Done' : 'Pending';
            })
            setDeviceData({
                cols: [
                    {field: 'model', headerName: 'Model Name', flex: 2},
                    {field: 'brand', headerName: 'Brand Name', flex: 2},
                    {field: 'color', headerName: 'Color', flex: 1},
                    {field: 'datalink', headerName: 'Data Link', flex: 2},
                    {field: 'description', headerName: 'Description', flex: 2},
                    {field: 'identification', headerName: 'Identification', flex: 1},
                    {field: 'memory_storage', headerName: 'Memory Storage', flex: 1},
                    {field: 'operating_system', headerName: 'Operating System', flex: 1},
                    {field: 'service', headerName: 'Service', flex: 1},
                    {field: 'status', headerName: 'Status', flex: 1},
                    {field: 'verified', headerName: 'Verified', flex: 1},
                ],
                rows: deviceList
            });
            setTransactionData({
                cols: [
                    {field: 'id', headerName: 'Device ID', flex: 2},
                    {field: 'payment_amount', headerName: 'Amount', flex: 2},
                    {field: 'payment_id', headerName: 'Transaction ID', flex: 1},
                    {field: 'qr_code', headerName: 'Discount QR Code', flex: 2},
                    {field: 'user_id', headerName: 'User ID', flex: 2},
                    {field: 'vendor_id', headerName: 'Vendor ID', flex: 1},
                    {field: 'verified', headerName: 'Verified', flex: 1},
                    {field: 'payment_status', headerName: 'Payment Status', flex: 1},
                ],
                rows: deviceList
            });
        });
        fetch('/vendor/getvendorlist')
        .then(vendorRequest => (vendorRequest).json())
        .then(vendors => {
            const vendorList = (JSON.parse(vendors.vendor_list)).filter(u => !u.is_deleted);
            vendorList.map( u => u.id = u._id)
            setVendorData({
                cols: [
                    {field: 'model_name', headerName: 'Model Name', flex: 2},
                    {field: 'brand', headerName: 'Brand Name', flex: 2},
                    {field: 'sale_price', headerName: 'Launch price', flex: 1},
                    {field: 'size', headerName: 'Dimensions', flex: 2},
                    {field: 'storage', headerName: 'Storage', flex: 2},
                ],
                rows: vendorList
            });
            setLoading(false);
        });
    }

    const handleChange = (event, newValue) => {
        fetchData();
        setValue(newValue);
    };

    const renderTable = (data, title, urls) => {
        if (loading) {
            return <div className='w-full h-full justify-center items-center flex flex-col mt-8'>
                <CircularProgress sx={{
                    color: '#bb92d7'
                }} />
                <label className='mt-4 lg:mt-8 text-grey'>Fetching Details. Please wait</label>
            </div>
        } else {
            return <DataTable 
                rows={data.rows}
                cols={data.cols}
                fns={[`Add ${title}`, `Delete ${title}`, `Edit ${title}`, `Freeze ${title} Record`]}
                title={title}
                count={data.rows.length}
                redirect_urls={{
                    modify: urls.modify,
                    delete: urls.delete
                }}
            /> 
        }
    }

    const logout = () => {
        logoutSubmit().then(_ => {});
        authState.onLogout();
        Notify.success('logged out!')
        navigate("/")
    }

    return (
        <div className={'flex w-full h-screen flex-row'}>
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
                        <Tooltip title="Logout" placement='right' arrow onClick={logout}>
                            <IconButton>      
                                <RiLogoutBoxLine/>  
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full h-full'>
                <div className="h-full">
                    <TabPanel className="h-full max-h-fit" value={value} index={0}>
                        {renderTable(userData, 'User', {
                            modify: '/staff/edit-user-form',
                            delete: '/user/deleteuser'
                        })}
                    </TabPanel>
                    <TabPanel className="h-full max-h-fit" value={value} index={1}>
                        {renderTable(deviceData, 'Device', {
                            modify: '/staff/edit-device-form',
                            delete: '/device/deletedevice'
                        })}
                    </TabPanel>
                    <TabPanel className="h-full max-h-fit" value={value} index={2}>
                        {renderTable(transactionData, 'Transaction', {
                            modify: '/staff/edit-transaction-form',
                            delete: null
                        })}
                    </TabPanel>
                    <TabPanel className="h-full max-h-fit" value={value} index={3}>
                        {renderTable(vendorData, 'Data-source', {
                            modify: '/staff/edit-vendor-form',
                            delete: '/vendor/deletevendor'
                        })}
                    </TabPanel>
                </div>
            </div>
        </div>
    )
}
