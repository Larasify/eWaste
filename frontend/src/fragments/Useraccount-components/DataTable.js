import React, {useEffect} from 'react'
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {AiOutlineDelete} from 'react-icons/ai';
import {AiOutlineEdit} from 'react-icons/ai';
import {MdOutlineHourglassDisabled} from 'react-icons/md';
import { DataGrid } from '@mui/x-data-grid';
import { BsSearch } from 'react-icons/bs';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {useNavigate} from "react-router-dom";


export default function DataTable({
    rows,
    cols,
    ops,
    title,
    count
}) {

    //TODO: Solve the problem of wrong list loading

    const [searchedRows,setSearchedRows] = React.useState(rows);
    const [keyword,setKeyword] = React.useState([]);


    const handleSearch = () =>{
        const searchedRows = rows.filter((row) => Object.values(row).some(
            (value) =>   typeof value === "string" && value.toLowerCase().includes(keyword)
        ))

        if(keyword === '') setSearchedRows(rows);

        setSearchedRows(searchedRows);

    };

    return (
    <div className='flex w-full h-full flex-col'>
        <div className={"flex w-full pt-4 justify-between"}>
            <div className="flex ml-12 w-5/6 font-medium flex-col">
                <span className={"text-lg"}>{title} List</span>
                <span className={"text-sm text-slate-400"}>{rows.length} {`${title.toLowerCase()}(s)`}</span>
            </div>
            <div className={"flex justify-end w-1/6 mr-8"}>
                <div className="flex border-2 border-[#3fb78c] rounded-xl w-60 text-3fb78c text-[#3fb78c] h-9 mr-8">
                    <input className="ml-4 w-40" type="text" placeholder='Search' onChange={(e) =>setKeyword(e.target.value)}></input>
                    <button className="flex justify-center mr-4 mt-2"
                            onClick={handleSearch}
                    ><BsSearch/></button>
                </div>

            </div>
        </div>
        <div className="sdb-main-content mt-4 w-full h-full ">
            <DataGrid
                autoHeight
                rows={searchedRows}
                // rows = {rows}
                columns={cols}
                pageSizeOptions={ops && ops.pageSizeOptions || [10, 20, 25]}
                rowSpacingType={ops && ops.rowSpacingType || ''}
                showCellVerticalBorder={ops && ops.showVBoreder || false}
            />
        </div>
    </div>
  )
}
