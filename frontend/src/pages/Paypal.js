/**
 * Paypal Page
 * @version 1
 * @author [Hongyu Pan](https://git.shefcompsci.org.uk/acr21hp)
 *
 */

/* Module Imports
React library Components */
import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import {BsFillCheckCircleFill, BsPaypal} from "react-icons/bs";
import {Notify} from "../fragments/Notify";
export  default  function Paypal() {

    let navigate = useNavigate();
    const location = useLocation();
    const {deviceId,newService,amount,description,payment_id} = location.state;
    const paypal = useRef()


    let paymentId;

    /* Update Service after paying */
    function updateService(){
        fetch('/device/updatedevice', {
                method: 'POST',
                credentials: "include",
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify({
                    id: deviceId,
                    fields:[{
                        service:newService
                    }],
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.response !== 'success') {
                     Notify.error('Something went wrong!');
                }
                // else console.log('update Service')
            })
    }

    /* Add Payments in Database */
    function addPayment() {
        if(newService==="wipe and further retrieve" && payment_id!==null){
            fetch('/device/addpayment', {
                method: 'POST',
                credentials: "include",
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify({
                    id: deviceId,
                    payment_id: paymentId,
                    payment_amount:amount,
                    type:"extended/warraty/payment2",
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.response === 'success') {
                    Notify.success('Payment Successful!')
                    navigate('/user-recycle');
                    console.log('add payment')
                    console.log(paymentId)
                    console.log(typeof paymentId)
                }
                else Notify.error('Something went wrong!');
            })
        }
        else{
            fetch('/device/addpayment', {
                method: 'POST',
                credentials: "include",
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify({
                    id: deviceId,
                    payment_id: paymentId,
                    payment_amount:amount,
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data.response === 'success') {
                    Notify.success('Payment Successful!')
                    navigate('/user-recycle');
                    console.log('add payment')
                }
                else Notify.error('Something went wrong!');
            })
        }

    }

    /* Add Payments in Database */
    useEffect(()=>{
        console.log(window.paypal.Buttons)
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [{
                            description: description,
                            amount: {
                                currency_code: "GBP",
                                value: amount,
                            }
                        }],
                    })
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture()
                    paymentId = order.id;
                    updateService()
                    addPayment()
                },
                onError: (err) => {
                    Notify.error("Sorry,something went wrong! Please try again!")
                }
            }).render(paypal.current)

        /* May render for many times so remove extra components */
        let children = paypal.current.getElementsByTagName("div")
        paypal.current.firstElementChild.removeChild(paypal.current.firstElementChild.lastElementChild)
        paypal.current.firstElementChild.removeChild(paypal.current.firstElementChild.lastElementChild)


        console.log(paypal.current)
    },[])

    return(
        <div className={"flex flex-col md:w-1/2 h-1/2 mx-auto mt-12 md:border md:border-2 md:border-[#509E82] rounded-3xl"}>
            <BsPaypal className={"text-2xl mx-auto  justify-center items-center mt-6"} size={40}/>
            <label className={"flex py-5 w-full text-lg md:text-3xl justify-center items-center font-bold "}>Pay with PayPal</label>

            <div className={"w-1/2 mx-auto justify-center items-center"} >
                <div ref={paypal} ></div>
            </div>
        </div>
    )
}