import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineHourglassDisabled } from 'react-icons/md';
import { DataGrid } from '@mui/x-data-grid';
import { BsSearch } from 'react-icons/bs';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';


export default function DataTable({
    rows,
    cols,
    ops,
    fns,
    title,
    count,
    redirect_urls
}) {

    const navigate = useNavigate();

    const [rowSelected, selectRow] = React.useState(false);
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    
    const tableOps = () => {
        if(rowSelectionModel) {
            document.getElementById('delete-record').style.color = '#4b72b2';  
            document.getElementById('edit-record').style.color = '#4b72b2';  
            document.getElementById('freeze-record').style.color = '#4b72b2';  
        } else {
            document.getElementById('delete-record').style.color = 'grey';  
            document.getElementById('edit-record').style.color = 'grey';  
            document.getElementById('freeze-record').style.color = 'grey';  
        }
    }

    const addRow = () => {
        navigate(redirect_urls.add)
    }

    return (
        <div className='flex w-full h-full flex-col'>
            <div className={"flex w-full pt-4 justify-between"}>
                <div className="flex ml-12 w-5/6 font-medium flex-col">
                    <span className={"text-lg"}>{title} List</span>
                    <span className={"text-sm text-slate-400"}>{count} {`${title.toLowerCase()}s`}</span>
                </div>
                <div className={"flex justify-end w-1/6 mr-8"}>
                    <div className="flex border-2 border-[#4b72b2] rounded-xl w-60 text-4b72b2 text-[#4b72b2] h-9 mr-8">
                        <input className="ml-4 w-40" type="text" placeholder='Search'></input>
                        <span className="flex justify-center mr-4 mt-2"><BsSearch /></span>
                    </div>
                    <div class="sdb-top-control" onClick={addRow}>
                        <Tooltip title={fns[0]}>
                            <IconButton>
                                <AiOutlinePlusCircle id="add-record" className={'text-[#4b72b2]'}/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div  class="sdb-top-control color-grey">
                        <Tooltip title={fns[1]}>
                            <IconButton>
                                <AiOutlineDelete id="delete-record" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div class="sdb-top-control">
                        <Tooltip title={fns[2]}>
                            <IconButton>
                                <AiOutlineEdit id="edit-record"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div class="sdb-top-control">
                        <Tooltip title={fns[3]}>
                            <IconButton>
                                <MdOutlineHourglassDisabled id="freeze-record"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className="sdb-main-content mt-4 w-full h-full ">
                <DataGrid
                    sx={{
                        height: 'calc(100vh - 8rem)'
                    }}
                    rows={rows}
                    columns={cols}
                    pageSizeOptions={ops && ops.pageSizeOptions || [10, 20, 25]}
                    checkboxSelection={ops && ops.check || false}
                    rowSpacingType={ops && ops.rowSpacingType || ''}
                    showCellVerticalBorder={ops && ops.showVBoreder || false}
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                        tableOps();
                        console.log(rowSelectionModel)
                    }}
                    rowSelectionModel={rowSelectionModel}
                />
            </div>
        </div>
    )
}
