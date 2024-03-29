/**
 * Transactions page
 * @version 1
 * @author [Samar Musthafa](https://git.shefcompsci.org.uk/act22sm)
 * 
 */

/* Module Imports
React library Components */
import React from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import {IoChevronBackCircle} from "react-icons/io5";
import QRCode from "react-qr-code";

/* Local imports */
import {AuthContext} from "../App";
import { Notify } from '../fragments/Notify';

export default function EditTransactionForm(){
    /* Auth state and nav */
    const authState = React.useContext(AuthContext)
    let navigate = useNavigate();
    /* Data from parent */
    const {state} = useLocation()
    /* QR code generator and saver */
    let [qr, setQR] = React.useState('works');

    /* Go back */
    const askBackward = () => {
        if (window.confirm("Are you sure you want to backward? Your update will be lost. ")) {
            navigate(-1);
        }
    };

    /* Prefetch transaction details */
    const prefetch = () => {
        if(state) {
            document.getElementById('amount').value = state.payment_amount;
            document.getElementById('verified').value = state.verified
            document.getElementById('status').value = state.status;
            document.getElementById('transaction-id').value = state.payment_id;
            document.getElementById('payment-status').value = state.payment_status;
            setQR(state.qr_code);
        }
    }

    /* Kick user from page if not valid permissions */
    React.useEffect(() => {
        if(!authState.isLoggedIn || authState.privilege!='staff') navigate('/')
        prefetch()
    }, [])

    /* Generate QR code with random coupon string */
    const generateQR = () => {
        setQR(Math.random().toString(36).slice(2))
    }

    /* Submit device information to backend */
  const handleSubmit = () => {
    const amount = document.getElementById('amount').value
    const status = document.getElementById('status').value
    const verified = document.getElementById('verified').value
    const paymentStatus = document.getElementById('payment-status').value
    const paymentID = document.getElementById('transaction-id').value
    /* Error if empty */
    if(amount=='' || status ==''|| verified == '' || paymentID == '' || paymentStatus == '') {
        Notify.error('Please fill all fields')
    } else {
        fetch('/device/updatedevice', {
            headers: new Headers({"Content-Type": "application/json"}),
            method: "POST",
            credentials: "include",
            body: JSON.stringify({"id": state.id, "fields": [{ 
                payment_amount: amount, 
                status, 
                verified ,
                qr_code: qr,
                payment_id: paymentID,
                payment_status: paymentStatus
            }]})
        }).then(req => req.json())
        .then(res => {
            if(res.response === 'success') {
                Notify.success('Saved!')
                navigate(-1)
            } else Notify.error('Error. Something went wrong!')
        })
    }
  }

    return (
        <div className={"flex h-full flex-col relative my-4 w-5/6 mx-auto h-5/6 rounded-3xl"}>
            {/* Transaction details */}
            <div className={"flex h-8 w-full text-2xl md:text-4xl p-4 md:p-8 bg-[#4b72b2] items-center text-white rounded-lg"}
                    onClick={askBackward}>
                <IoChevronBackCircle className={"mx-2"}/>
                <span className='ml-2 text-2xl'>Transaction Details</span>
            </div>
            {/* Input information */}
            <div className='flex flex-row mx-8 h-full mt-8'>
                <div className='flex flex-col w-1/2 gap-4'>
                    <div className='flex flex-col'>
                        <label className='text-lg mb-1'>Amount</label>
                        <input id='amount' className='h-12 pl-2 border-[#4b72b2] border-2 rounded-lg' type='text'></input>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-lg mb-1'>Status</label>
                        <input id='status' className='h-12 pl-2 border-[#4b72b2] border-2 rounded-lg' type='text'></input>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-lg mb-1'>Transaction ID</label>
                        <input id='transaction-id' className='h-12 pl-2 border-[#4b72b2] border-2 rounded-lg' type='text'></input>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-lg mb-1'>Payment Status</label>
                        <input id='payment-status' className='h-12 pl-2 border-[#4b72b2] border-2 rounded-lg' type='text'></input>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-lg mb-1'>Verified</label>
                        <select id='verified'
                            className='border-[#4b72b2] border-2 rounded-lg h-12 pl-2 bg-white'>
                            <option value='true'>True</option>
                            <option value='false'>False</option>
                        </select>
                    </div>
                </div>
                {/* Display generated QR code */}
                <div className='flex w-1/2 h-full justify-center items-center mt-24 flex-col'>
                    <QRCode 
                        value={qr}
                        size={160}
                    />
                    <span className='mt-8 text-lg font-bold text-[#4b72b2]'>QR code</span>
                    <span className='text-lg font-bold'>{qr}</span>
                </div>
            </div>
            {/* Controls */}
            <div class='flex w-full gap-16 mt-16 justify-end'>
                <span 
                onClick={generateQR}
                className='cursor-pointer bg-[#4b72b2] py-4 px-16 rounded-xl text-lg font-bold text-white'>
                    Generate new QR code
                </span>
                <span
                onClick={handleSubmit}
                className='cursor-pointer bg-[#4b72b2] py-4 px-16 rounded-xl text-lg font-bold text-white'>
                    Save
                </span>
            </div>
        </div>
    );
}


