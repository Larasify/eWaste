import React from 'react'
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {AiOutlineDelete} from 'react-icons/ai';
import {AiOutlineEdit} from 'react-icons/ai';
import {MdOutlineHourglassDisabled} from 'react-icons/md';
import { DataGrid } from '@mui/x-data-grid';
import { BsSearch } from 'react-icons/bs';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import './UserTable.css';

export default function UserTable() {

    const currentDevice = {
    props:{
        modelName:'iphone',
        identification:'current',
        service:'data wiping',
        fee:10,
        payments:1233,
        link:'wer232fr.html',
        operation:'',
        }
    };

    const recycleDevice = {
    props:{
        modelName:'iphone',
        identification:'current',
        service:'data wiping',
        fee:10,
        payments:1233,
        link:'wer232fr.html',
        operation:'',
        }
    };



    const columns = [
        { field: 'modelName', headerName: 'Model', flex: 1},
        { field: 'identification', headerName: 'Identification', flex: 1},
        {
          field: 'service',
          headerName: 'Service',
          flex: 2,
        },
        {
          field: 'payments',
          headerName: 'Payments',
          type: 'number',
          flex: 1
        },
        {
          field: 'link',
          headerName: 'Link/QRcode',
          flex: 1
        },
        {
          field: 'operation',
          headerName: 'Operation',
          flex: 1
        }
    ];
    const rows = [
        { id: 1, modelName:'iphone', identification:'current', service:'data wiping'+'(£'+currentDevice.props.fee+')', fee:10, payments:1233, link:'wer232fr.html', operation:'' },
        { id: 2, modelName:'iphone', identification:'current', service:'data wiping', fee:10, payments:1233, link:'wer232fr.html', operation:''  },
        { id: 3, modelName:'iphone', identification:'current', service:'data wiping', fee:10, payments:1233, link:'wer232fr.html', operation:'' },
        { id: 4, modelName:'iphone', identification:'current', service:'data wiping', fee:10, payments:1233, link:'wer232fr.html', operation:'' },
        { id: 5, modelName:'iphone', identification:'current', service:'data wiping', fee:10, payments:1233, link:'wer232fr.html', operation:'' },
     ];

    return (
        <>
            <div class="user-main-topbar">
                <div class="user-main-title">
                    <span>My Recycle</span>
                    <span>4 devices</span>
                </div>
                <div class="justify-right mg-r-2" style={{marginLeft:"7rem"}}>
                    <div class="user-search-box">
                        <input type="text" placeholder='Search'></input>
                        <span><BsSearch/></span>
                    </div>
                    {/*<div class="user-top-control">*/}
                    {/*    <Tooltip title="Add User">*/}
                    {/*        <IconButton>                            */}
                    {/*            <AiOutlinePlusCircle/>*/}
                    {/*        </IconButton>*/}
                    {/*    </Tooltip>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div class="user-main-content mg-t-1 w-100" style={{height: "86%"}}>
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
        </>
    )
}
