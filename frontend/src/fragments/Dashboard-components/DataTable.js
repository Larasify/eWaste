import React from 'react'
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {AiOutlineDelete} from 'react-icons/ai';
import {AiOutlineEdit} from 'react-icons/ai';
import {MdOutlineHourglassDisabled} from 'react-icons/md';
import { DataGrid } from '@mui/x-data-grid';
import { BsSearch } from 'react-icons/bs';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


export default function DataTable({
    rows,
    cols,
    ops,
    fns,
    title,
    count
}) {
  return (
    <div className='flex w-full h-full flex-col'>
        <div className={"flex w-full pt-4 justify-between"}>
            <div className="flex ml-12 w-5/6 font-medium flex-col">
                <span className={"text-lg"}>{title} List</span>
                <span className={"text-sm text-slate-400"}>{count} {`${title.toLowerCase()}s`}</span>
            </div>
            <div className={"flex justify-end w-1/6 mr-8"}>
                <div className="flex border-2 border-[#3fb78c] rounded-xl w-60 text-3fb78c text-[#3fb78c] h-9 mr-8">
                    <input className="ml-4 w-40" type="text" placeholder='Search'></input>
                    <span className="flex justify-center mr-4 mt-2"><BsSearch/></span>
                </div>
                <div class="sdb-top-control">
                    <Tooltip title={fns[0]}>
                        <IconButton>                            
                            <AiOutlinePlusCircle/>
                        </IconButton>
                    </Tooltip>
                </div>
                <div class="sdb-top-control">
                    <Tooltip title={fns[1]}>
                        <IconButton>
                            <AiOutlineDelete/>
                        </IconButton>
                    </Tooltip>
                </div>
                <div class="sdb-top-control">
                    <Tooltip title={fns[2]}>
                        <IconButton>
                            <AiOutlineEdit/>
                        </IconButton>
                    </Tooltip>
                </div>
                <div class="sdb-top-control">
                    <Tooltip title={fns[3]}>
                        <IconButton>
                            <MdOutlineHourglassDisabled/>
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
        <div className="sdb-main-content mt-4 w-full h-full ">
            <DataGrid
                autoHeight
                rows={rows}
                columns={cols}
                pageSizeOptions={ops && ops.pageSizeOptions || [10, 20, 25]}
                checkboxSelection={ops && ops.check || true}
                rowSpacingType={ops && ops.rowSpacingType || ''}
                showCellVerticalBorder={ops && ops.showVBoreder || false}
            />
        </div>
    </div>
  )
}
