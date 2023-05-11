/**
 * Reusable DataTable fragment Component
 * @version 1
 * @author [Samar Musthafa](https://git.shefcompsci.org.uk/act22sm)
 * 
 */
/* Module imports */
import React, {useContext} from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineHourglassDisabled } from 'react-icons/md';
import { DataGrid } from '@mui/x-data-grid';
import { BsSearch } from 'react-icons/bs';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import {RiLogoutBoxLine} from 'react-icons/ri';

/* File imports */
import { Notify } from '../Notify';
import {AuthContext} from "../../App";
import {logoutSubmit} from "../Login.js";


export default function DataTable({
    rows,
    cols,
    ops,
    fns,
    title,
    count,
    redirect_urls,
    logout=false
}) {
    /*
    * @param {rows} table rows 
    * @param {cols} table columns 
    * @param {ops} table options like page size, etc 
    * @param {fns} table permitted functions 
    * @param {title} table title 
    * @Deprecated @param {count} table row count 
    * @param {redirect_urls} An object with redirects for edit and add operations 
    * @param {logout} render table provided logout?
    */
    /* Context and navigate */
    const authState = useContext(AuthContext)
    const navigate = useNavigate();

    /* Table rows */
    const [tableRows, setRows] = React.useState(rows);
    /* Per row selector */
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    /* Search for rows */
    const [searchedRows,setSearchedRows] = React.useState(rows);
    /* Keyword searched */
    const [keyword,setKeyword] = React.useState([]);


    /* Handle search clicked */
    const handleSearch = () =>{
        const searchedRows = rows.filter((row) => Object.values(row).some(
            (value) =>   typeof value === "string" && value.toLowerCase().includes(keyword)
        ))
        if(keyword === '') setSearchedRows(rows);
        setSearchedRows(searchedRows);
    };

    /* Table operations trigger. 
    Enable on clicking row */
    const tableOps = () => {
        if(rowSelectionModel) {
            document.getElementById('delete-record').style.color = '#4b72b2';  
            document.getElementById('edit-record').style.color = '#4b72b2';  
            document.getElementById('hide-record').style.color = '#4b72b2';
        } else {
            document.getElementById('delete-record').style.color = 'grey';  
            document.getElementById('edit-record').style.color = 'grey';  
            document.getElementById('hide-record').style.color = 'grey';
        }
    }

    /* Generic add row Method
    navigates to passed url */
    const addRow = () => {
        if(title==='Transaction') {
            Notify.error('Operation not permitted')
        } else {
            const state = {}
            cols.map(col => state[col.field] = '')
            navigate(redirect_urls.modify, {
                state: {
                    ...state,
                    _op: 'add'
                }
            })
        }
    }

    /* Generic edit row Method
    navigates to passed url */
    const editRow = () => {
        if(rowSelectionModel.length) {
            const row = rows.find(e => e.id === rowSelectionModel[0])
            navigate(redirect_urls.modify, {
                state: {
                    ...row,
                    _op: 'edit'
                }
            })
        } else {
            Notify.error('please select a row')
        }
    }

    /* Generic delete row Method
    navigates to passed url */
    const deleteRow = () => {
        if(redirect_urls.delete === null) {
            Notify.error('deletion not permitted')
        } else {
            if(rowSelectionModel.length) {
                fetch(redirect_urls.delete, {
                    method: 'POST',
                    credentials: "include",
                    headers: new Headers({"Content-Type": "application/json"}),
                    body: JSON.stringify({
                        id: rowSelectionModel[0]
                    })
                })
                .then(req => req.json())
                .then((res) => {
                    if(res.response === 'success') {
                        Notify.success('deleted!')
                        setRows(tableRows.filter(r => r.id != rowSelectionModel[0]))
                    } else {
                        Notify.error('error')
                    }
                })
            } else {
                Notify.error('please select a row')
            }
        }
    }

    /* hide row Method
    Hides selected device */
    const hideRow = () => {
        if(redirect_urls.hidden === null) {
            Notify.error('operation not permitted')
        } else {
            if(rowSelectionModel.length) {
                const row = rows.find(e => e.id === rowSelectionModel[0])
                console.log(row.is_hidden)
                fetch('/device/updatedevice', {
                    method: 'POST',
                    credentials: "include",
                    headers: new Headers({"Content-Type": "application/json"}),
                    body: JSON.stringify({
                        id: rowSelectionModel[0],
                        fields:[{
                        is_hidden: !row.is_hidden,
                    }],
                    })
                })
                .then(req => req.json())
                .then((res) => {
                    console.log(res.response)
                    if(res.response === 'success') {
                        Notify.success('Success!')
                        window.location.reload();
                        setRows(tableRows.filter(r => r.id !== rowSelectionModel[0]))
                    } else {
                        Notify.error('error')
                    }
                })
            } else {
                Notify.error('please select a row')
            }
        }
    }

    /* Logout action */
    const logoutUser = () => {
        logoutSubmit().then(_ => {});
        authState.onLogout();
        Notify.success('logged out!')
        navigate("/")
    }

    /* Logout button render on table */
    const renderLogout = () => {
        if(logout) {
            return <div class="sdb-top-control ml-8 rounded-lg bg-[#4b72b2] px-4" onClick={logoutUser}>
                <Tooltip title='Logout'>
                    <IconButton>
                        <RiLogoutBoxLine className={"text-white"} id="table-logout"/>
                    </IconButton>
                </Tooltip>
                <span className={'text-base font-bold text-white'}>Logout</span>
            </div>
        } else {
            return <></>
        }
    }

    /* Main renderer */
    return (
        <div className='flex w-full h-full flex-col'>
            <div className={"flex w-full pt-4 justify-between"}>
                {/* Header */}
                <div className="flex ml-12 w-5/6 font-medium flex-col">
                    {/* Title */}
                    <span className={"text-lg"}>{title} List</span>
                    <span className={"text-sm text-slate-400"}>{tableRows.length} {`${title.toLowerCase()}s`}</span>
                </div>
                <div className={"flex justify-end w-1/6 mr-8"}>
                    {/* Search */}
                    <div className="flex border-2 border-[#4b72b2] rounded-xl w-60 text-4b72b2 text-[#4b72b2] h-9 mr-8">
                        <input className="ml-4 w-40" type="text" placeholder='Search' onChange={(e) =>setKeyword(e.target.value)}></input>
                        <span className="flex justify-center mr-4 mt-2" onClick={handleSearch}><BsSearch /></span>
                    </div>
                    {/* Operations */}
                    <div class="sdb-top-control" onClick={addRow}>
                        <Tooltip title={fns[0]}>
                            <IconButton>
                                <AiOutlinePlusCircle id="add-record" className={'text-[#4b72b2]'}/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div  class="sdb-top-control" onClick={deleteRow}>
                        <Tooltip title={fns[1]}>
                            <IconButton>
                                <AiOutlineDelete id="delete-record" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div class="sdb-top-control" onClick={editRow}>
                        <Tooltip title={fns[2]}>
                            <IconButton>
                                <AiOutlineEdit id="edit-record"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div class="sdb-top-control" onClick={hideRow}>
                        <Tooltip title={fns[3]}>
                            <IconButton>
                                <MdOutlineHourglassDisabled id="hide-record"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    {renderLogout()}
                </div>
            </div>
            <div className="sdb-main-content mt-4 w-full h-full ">
                {/* render table */}
                <DataGrid
                    sx={{
                        height: 'calc(100vh - 8rem)'
                    }}
                    rows={searchedRows}
                    columns={cols}
                    pageSizeOptions={ops && ops.pageSizeOptions || [10, 20, 25]}
                    checkboxSelection={ops && ops.check || false}
                    rowSpacingType={ops && ops.rowSpacingType || ''}
                    showCellVerticalBorder={ops && ops.showVBoreder || false}
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                        tableOps();
                    }}
                    rowSelectionModel={rowSelectionModel}
                />
            </div>
        </div>
    )
}
