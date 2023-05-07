import React from 'react'
import {MdCleaningServices} from 'react-icons/md';

import {FaRecycle} from 'react-icons/fa';
import {AiOutlineCloudUpload} from 'react-icons/ai';
import {BsFillCloudArrowUpFill} from 'react-icons/bs';
import {GridActionsCellItem,} from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import DataTable from './DataTable';
import {Notify} from "../Notify";

export default function IconTabs() {
    let nextId=0;
    let retrievalFee=13;
    let extendFee=10;
    let navigate = useNavigate()
    const [form,setForm] = React.useState({
        id:'',
        modelName:'',
        identification:'',
        service:'',
        fee:'',
        payment:'',
        link:'',
        linkService:'',
        status:'',
    })


    const myRequest = new Request("account/getuserlistings", {
                headers: new Headers({'Content-Type': 'application/json'}),
                method: "POST",
                credentials: "include",
            });

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
                let newData = data['user_list'] || []
                newData = JSON.parse(newData)
                setForm(newData.map((device) => {
                        return {
                            id:nextId++,
                            modelName: device.model,
                            identification: device.identification,
                            service: device.service,
                            fee: retrievalFee,
                            payment: device.payment_amount,
                            link: device.qr_code,
                            linkService: device.datalink,
                            deviceId: device._id,
                            status:device.status,
                            payment_id:device.payment_id,
                            payment2_id:device.hasOwnProperty('payment2_id')?device.payment2_id:'',
                        }
                    }));
            })
    },[]);


    const recycleDevice = (deviceId,status,service,payment_id) => {
        if(status !== 'unconfirmed'){
            Notify.error("Sorry, you have already confirmed recycling!" )
        }
        // TODO: Check the service to wipe
        else if((payment_id === null)&&(service !=='wiping')){
            Notify.error("Sorry, please pay for the service first!" )
        }
        else{
            const updateDeviceBody = {
                "id": deviceId,
                fields:[{"status":"confirmed"}],
            }
            const updateRequest = new Request("/device/updatedevice",{
                headers: new Headers({'Content-Type': 'application/json'}),
                method: "POST",
                body: JSON.stringify(updateDeviceBody),
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


    const dataRetrieval = (deviceId,service,identification,payment_id) => {
        // TODO: Change it back to recycle identification
        // TODO: Check if user pay first and wanna add second retrieval
        if(identification !== 'rare'){
            Notify.error("Sorry, This type cannot add a retrieval!" )
        }
        // TODO: Change the service to wipe
        else if((service !== 'wiping') && (payment_id !== null)){
            Notify.error("Sorry, you have already add a retrieval!" )
        }
        else{
            navigate('/payment', {state:{deviceId:deviceId,newService:'wipe and retrieve',amount:retrievalFee}})
        }
    };

    const extendRetrieval = (deviceId,service,identification,payment_id) => {
        // TODO: Check if the payment if already paid
        // TODO: Change it back to recycle identification
        // TODO: Change wiping to wipe
        if(identification !== 'rare'){
            Notify.error("Sorry, This type cannot add a retrieval!" )
        } else if(service === 'wipe and further retrieve'){
            Notify.error("Sorry, you have already extend this retrieval!" )
        } else if (service === 'wiping'){
            Notify.error("Sorry, please retrieve your data first, and then you can extend it!" )
        }else if(payment_id === null){
            navigate('/payment',{state:{deviceId,newService:'wipe and further retrieve',amount:extendFee+retrievalFee,payment_id:payment_id}})
        } else{
            navigate('/payment',{state:{deviceId,newService:'wipe and further retrieve',amount:extendFee,payment_id:payment_id}})
        }
              };

    const getUserTable = () => {
        //fetch data for this table
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
          flex: 1.2,
        },
        {
          field: 'fee',
          headerName: 'Fee',
          type: 'number',
          flex: 0.8
        },
        {
          field: 'payment',
          headerName: 'Payment',
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
              return <a href={'https://'+params.row.link} className={"underline "}>{"https://"}{params.row.link}</a>;
            }
        },
            {
          field: 'linkService',
          headerName: 'Link for Data Retrieval',
          flex: 2,
          renderCell: (params) => {
              return <a href={'https://'+params.row.linkService} className={"underline "}>{"https://"}{params.row.linkService}</a>;
            }

        },
        {
            field: "actions",
            headerName: 'Action',
            type: "actions",
            width: 80,
            flex:1,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<FaRecycle />}
                label="Confirm Recycling"
                onClick={()=>{recycleDevice(params.row.deviceId,params.row.status,params.row.identification,params.row.service,params.row.payment_id)}}
                showInMenu
              />,
              <GridActionsCellItem
                icon={<AiOutlineCloudUpload />}
                label="Retrieval Data from Device"
                onClick={()=>{dataRetrieval(params.row.deviceId,params.row.service,params.row.identification,params.row.payment_id)}}
                showInMenu
              />,
              <GridActionsCellItem
                icon={<BsFillCloudArrowUpFill />}
                label="Extend the Retrieval"
                onClick={()=>{extendRetrieval(params.row.deviceId,params.row.service,params.row.identification,params.row.payment_id)}}
                showInMenu
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
