/**
 * Icontabs fragment Component for dashboard
 * @version 1
 * @author [Samar Musthafa](https://git.shefcompsci.org.uk/act22sm)
 * 
 */
/* Module imports */
import React, {useContext} from 'react'
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
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

/* Local imports */
import './IconTabs.css';
import TabPanel from './TabPanel.js';
import {AuthContext} from "../../App";
import {logoutSubmit} from "../Login.js";
import DataTable from './DataTable';
import { Notify } from '../Notify';

export default function IconTabs() {

    /* Context and nav */
    const authState = useContext(AuthContext)
    const navigate = useNavigate();

    /* Value setter for changes in tab */
    const [value, setValue] = React.useState(0);
    /* Render table loading on requests */
    const [loading, setLoading] = React.useState(true)
    /* device panel data */
    const [deviceData, setDeviceData] = React.useState({cols: [], rows: []})
    /* transaction panel data */
    const [transactionData, setTransactionData] = React.useState({cols: [], rows: []})
    /* vendor panel data */
    const [vendorData, setVendorData] = React.useState({cols: [], rows: []})

    /* on load, get data */
    React.useEffect(() => {
        fetchData();
    }, [loading])

    /* Themed switch for one-click verify */    
    const Android12Switch = styled(Switch)(({  }) => ({
        padding: 8,
        '& .MuiSwitch-track': {
            backgroundColor: 'grey',
            borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            left: 12,
        },
        '&:after': {
            right: 12,
        },
        },
        '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
        backgroundColor: 'white',
        },
    }));
  

    /* Get data */
    const fetchData = () => {
        /* get device list information and make rows and cols */
        fetch('/device/getdevicelist')
        .then(deviceRequest => (deviceRequest).json())
        .then(devices => {
            const deviceList = (devices.device_list).filter(u => !u.is_deleted);
            deviceList.map( u => {
                u.id = u._id
                u.payment_status = u.payment_id ? 'Done' : 'Pending';

            })
            /* set device list information and make rows and cols */
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
                    {field: 'type', headerName: 'Type', flex: 1},
                    {field: 'verified', headerName: 'Verified', width: 150, 
                        renderCell: (params) => {
                            return <div>
                            <Android12Switch
                                checked={params.row.verified}
                                onChange={(e) => {
                                    deviceData.rows.map( d => {
                                        if (d.id === params.row.id) d.verified = !d.verified
                                    })
                                    fetch('/device/verifydevicebyid', { 
                                        method: 'POST',
                                        credentials: "include",
                                        headers: new Headers({"Content-Type": "application/json"}),
                                        body: JSON.stringify({
                                            id: params.row.id,
                                            verified: params.row.verified
                                        })
                                    }).then(req => req.json())
                                    .then(res => {
                                        if(res.response === 'success') {
                                            Notify.success('Changed!')
                                        } else {
                                            Notify.error('Failed!')
                                        }
                                    });
                                }}
                                inputProps={{ 'aria-label': 'controlled' }}
                                />
                        </div>}
                    },
                    {field: 'is_hidden',headerName: 'Hidden',flex:1},
                ],
                rows: deviceList
            });
            /* set transaction list information and make rows and cols */
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
        /* get vendor list information and make rows and cols */
        fetch('/vendor/getvendorlist')
        .then(vendorRequest => (vendorRequest).json())
        .then(vendors => {
            const vendorList = (vendors.vendor_list).filter(u => !u.is_deleted);
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

    /* On tab switch */
    const handleChange = (event, newValue) => {
        fetchData();
        setValue(newValue);
    };

    /* generic table renderer */
    const renderTable = (data, title, urls) => {
        /* 
        * @param {data} rows and columns
        * @param {title} Table title
        * @param {urls} operation urls in datatable
        */
        if (loading) {
            /* Load on fetch */
            return <div className='w-full h-full justify-center items-center flex flex-col mt-8'>
                <CircularProgress sx={{
                    color: '#bb92d7'
                }} />
                <label className='mt-4 lg:mt-8 text-grey'>Fetching Details. Please wait</label>
            </div>
        } else {
            /* Render table */
            return <DataTable 
                rows={data.rows}
                cols={data.cols}
                fns={[`Add ${title}`, `Delete ${title}`, `Edit ${title}`, `Hide ${title} `]}
                title={title}
                count={data.rows.length}
                redirect_urls={{
                    modify: urls.modify,
                    delete: urls.delete,
                    hidden:urls.hidden,
                }}
            /> 
        }
    }

    /* On logout handler */
    const logout = () => {
        logoutSubmit().then(_ => {});
        authState.onLogout();
        Notify.success('logged out!')
        navigate("/")
    }

    /* Main renderer */
    return (
        <div className={'flex w-full h-screen flex-row'}>
            <div className={"flex flex-col w-16 h-full items-center sdb-controls"} style={{backgroundColor: '#ebebeb'}}>
                {/* Left Panel */}
                <div className='flex flex-col h-full mt-12'>
                    {/* Tabs */}
                    <Tabs value={value} onChange={handleChange} aria-label="staff-dashboard" orientation='vertical'>
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
                {/* Logout */}
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
            {/* Tab Panels */}
            <div className='flex flex-col w-full h-full'>
                <div className="h-full">
                    <TabPanel className="h-full max-h-fit" value={value} index={0}>
                        {renderTable(deviceData, 'Device', {
                            modify: '/staff/edit-device-form',
                            delete: '/device/deletedevice',
                            hidden:'',
                        })}
                    </TabPanel>
                    <TabPanel className="h-full max-h-fit" value={value} index={1}>
                        {renderTable(transactionData, 'Transaction', {
                            modify: '/staff/edit-transaction-form',
                            delete: null,
                            hidden:null,
                        })}
                    </TabPanel>
                    <TabPanel className="h-full max-h-fit" value={value} index={2}>
                        {renderTable(vendorData, 'Data-source', {
                            modify: '/staff/edit-vendor-form',
                            delete: '/vendor/deletevendor',
                            hidden:null,
                        })}
                    </TabPanel>
                </div>
            </div>
        </div>
    )
}
