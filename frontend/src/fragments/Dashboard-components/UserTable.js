import React from 'react'
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {AiOutlineDelete} from 'react-icons/ai';
import {AiOutlineEdit} from 'react-icons/ai';
import {MdOutlineHourglassDisabled} from 'react-icons/md';
import { DataGrid } from '@mui/x-data-grid';
import { BsSearch } from 'react-icons/bs';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


export default function UserTable() {

    const columns = [
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

    return (
        <div className='flex w-full flex-col'>
            <div className="flex w-full pt-4 justify-between	">
                <div className="flex ml-12 w-5/6 font-medium flex-col">
                    <span className={"text-lg"}>User List</span>
                    <span className={"text-sm text-slate-400"}>1015 users</span>
                </div>
                <div className={"flex justify-end w-1/6 mr-8"}>
                    <div class="sdb-search-box">
                        <input type="text" placeholder='Search'></input>
                        <span><BsSearch/></span>
                    </div>
                    <div class="sdb-top-control">
                        <Tooltip title="Add User">
                            <IconButton>                            
                                <AiOutlinePlusCircle/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div class="sdb-top-control">
                        <Tooltip title="Delete User">
                            <IconButton>
                                <AiOutlineDelete/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div class="sdb-top-control">
                        <Tooltip title="Edit User">
                            <IconButton>
                                <AiOutlineEdit/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div class="sdb-top-control">
                        <Tooltip title="Freeze User Account">
                            <IconButton>
                                <MdOutlineHourglassDisabled/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div class="sdb-main-content mg-t-1 w-100" style={{height: "86%"}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[10]}
                    checkboxSelection={true}
                    rowSpacingType=''
                    showCellVerticalBorder={false}
                />
            </div>
        </div>
    )
}
