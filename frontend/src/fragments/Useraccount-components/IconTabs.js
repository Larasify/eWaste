/**
 * IconTabs for User-Recycle Page
 * @version 1
 * @author [Hongyu Pan](https://git.shefcompsci.org.uk/acr21hp)
 *
 */

/* Module Imports
React library Components */
import React from 'react'

import {FaRecycle} from 'react-icons/fa';
import {AiOutlineCloudUpload} from 'react-icons/ai';
import {BsFillCloudArrowUpFill} from 'react-icons/bs';
import {GridActionsCellItem,} from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import QRCode from "react-qr-code";

/* Local imports */
import DataTable, {updateRecycleDevicesRow} from './DataTable';
import {Notify} from "../Notify";


export default function IconTabs() {
    let nextId=0;
    let navigate = useNavigate()
    let price;
    let serviceFee = 13;
    let furtherFee = 10;
    const [form, setForm] = React.useState([]);

    /* Get all devices of a user */
    const myRequest = new Request("account/getuserlistings", {
        headers: new Headers({'Content-Type': 'application/json'}),
        method: "POST",
        credentials: "include",
    });

    /* Render the table */
    React.useEffect (() => {
        fetch(myRequest)
            .then((response) => {
                    if (response.status === 200) {
                        return response.json()
                    } else {
                        Notify.error("error on fetching device data: " + response.statusText)
                    }
                }
            )
            .then(data => {
                let newDataJson = data['user_list'] || []
                let newData = JSON.parse(newDataJson)
                let device;
                console.log(newData)
                newData = newData.filter((device)=> {
                    if(device.is_hidden === false)
                        return device
                })
                console.log(newData)
                const newRows = newData.map((device) => ({
                    id: nextId++,
                    modelName: device.model,
                    identification: device.identification,
                    payment: device.hasOwnProperty('payment2_amount')
                        ? (device.payment_amount + device.payment2_amount) : device.payment_amount,
                    link: device.qr_code,
                    linkService: device.datalink,
                    deviceId: device._id,
                    status: device.status,
                    service: device.service,
                    payment2_id: device.hasOwnProperty('payment2_id') ? device.payment2_id : '',
                    payment_id: device.payment_id,
                    verified:device.verified,
                    qr_code:device.qr_code,
                }));
                setForm(newRows);
                console.log(newRows)
                updateRecycleDevicesRow(newRows);
            })
    },[]);

    /* Confirm recycling logic*/
    const recycleDevice = (deviceId,status,identification,service,payment_id,verified) => {
        console.log(verified)
        if(status !== 'Submitted for Review'){
            Notify.error("Sorry, you have already confirmed recycling!" )
        }

        else if((payment_id === null)&&(service !=='wipe')){
            Notify.error("Sorry, please pay for the service first!" )
        }
        else if(verified === false){
            Notify.error("Sorry! This device needs to verify first!")
        }
        else{
            const updateRequest = new Request("/device/updatedevice",{
                headers: new Headers({'Content-Type': 'application/json'}),
                method: "POST",
                body: JSON.stringify({"id": deviceId, fields: [{"status": "confirmed"}]}),
                credentials: "include"
            });
            fetch(updateRequest).then((response) => {
                // Check HTTP status
                if (response.status === 200) {
                    return response.json();
                } else {
                    Notify.error(`Update device info (HTTP) failed: ${response.status}: ${response.statusText}`);
                }
            }).then((data) => {
                // Check update response message
                if (data['response'] === "success") {
                    Notify.success(`Successful!`)
                    window.location.reload();
                } else {
                    Notify.error(`Update device info failed: ${data['message']}`)
                }
            });
        }
    };

    /* Add retrieval logic */
    const dataRetrieval = (deviceId,service,identification,payment_id) => {

        if(identification !== 'recycle'){
            Notify.error("Sorry, This type cannot add a retrieval!" )
        }

        else if((service !== 'wipe') && (payment_id !== null)){
            Notify.error("Sorry, you have already add a retrieval!" )
        }
        else{
            navigate('/payment', {state:{deviceId:deviceId,newService:'wipe and retrieve',amount:serviceFee}})
        }
    };

    /* Extend a retrieval */
    const extendRetrieval = (deviceId,service,identification,payment_id) => {
        if(identification !== 'recycle'){
            Notify.error("Sorry, This type cannot add a retrieval!" )
        } else if(service === 'wipe and further retrieve'){
            Notify.error("Sorry, you have already extend this retrieval!" )
        } else if (service === 'wipe'){
            Notify.error("Sorry, please retrieve your data first, and then you can extend it!" )
        }else if(payment_id === null){
            navigate('/payment',{state:{deviceId,newService:'wipe and further retrieve',amount:furtherFee+serviceFee,payment_id:payment_id}})
        } else{
            navigate('/payment',{state:{deviceId,newService:'wipe and further retrieve',amount:furtherFee,payment_id:payment_id}})
        }
    };

    /* Get information */
    const getUserTable = () => {
        /* Fetch data */
        const cols =  [
            { field: 'modelName', headerName: 'Model Name', flex: 1.5},
            { field: 'identification', headerName: 'New', flex: 1,},
            {
                field: 'service',
                headerName: 'Service',
                flex: 1.2,
            },
            {
                field: 'status',
                headerName: 'Status',
                flex: 1,
            },
            {
                field: 'payment',
                headerName: 'Fee',
                type:'number',
                flex: 1
            },
            {
                field: 'link',
                headerName: 'Link for payment',
                flex: 2,
                renderCell: (params) => {
                    // if the url contains 'https://', use the code commented
                    // return <a href={params.row.link} className={"underline "}>{params.row.link}</a>;


                    let link;
                    if(params.row.link !=='') link = "https://" + params.row.link;
                    else link = '';
                    // return <a href={'https://'+params.row.link} className={"underline "}>{link}</a>;
                    return params.row.qr_code!==""?<QRCode
                        value={params.row.qr_code}
                        size={40}
                    />:<label></label>
                }
            },
            {
                field: 'linkService',
                headerName: 'Link for Data Retrieval',
                flex: 2,
                renderCell: (params) => {
                    let linkService;
                    if(params.row.linkService !=='') linkService = "https://" + params.row.linkService;
                    else linkService = '';

                    return <a href={'https://'+params.row.linkService} className={"underline "}>{linkService}</a>;
                }

        },
        {
            field: "actions",
            headerName: 'Action',
            type: "actions",
            width: 80,
            flex:2,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<FaRecycle />}
                label="Confirm Recycling"
                onClick={()=>{
                    recycleDevice(params.row.deviceId,params.row.status,params.row.identification,params.row.service,params.row.payment_id,params.row.verified)}}
              />,
              <GridActionsCellItem
                icon={<AiOutlineCloudUpload />}
                label="Retrieval Data from Device"
                onClick={()=>{ console.log(params.row.verified)
                    dataRetrieval(params.row.deviceId,params.row.service,params.row.identification,params.row.payment_id)}}
              />,
              <GridActionsCellItem
                icon={<BsFillCloudArrowUpFill />}
                label="Extend the Retrieval"
                onClick={()=>{extendRetrieval(params.row.deviceId,params.row.service,params.row.identification,params.row.payment_id)}}
              />
            ]
      }]

        const rows = form;

        return {
            cols,
            rows
        }
    }

    const userData = getUserTable();

    return (
        <div className={'flex w-full h-full flex-row overflow-auto'}>
            <div className={'flex flex-col w-full h-full overflow-auto'}>
                <div className={"h-full overflow-y-scroll overflow-auto"}>
                    <DataTable className="h-full  overflow-auto"
                               rows={userData.rows}
                               cols={userData.cols}
                               title="Device"
                               count={1024}
                    />
                </div>
            </div>
        </div>
    )
}
