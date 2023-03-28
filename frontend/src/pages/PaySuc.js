import React from 'react';
import {BsFillCheckCircleFill, BsPaypal} from "react-icons/bs";
import './PaySuc.css';
import {FaCcStripe} from "react-icons/fa";


export default function Payment(){
    return(
        <div style={{position:"absolute"}}>
            <div className={"suc-container"} style={{position:"absolute",zIndex:"2"}}>
                <div class='success' style={{position:"relative"}}>
                    <BsFillCheckCircleFill size={150} style={{backgroundColor:"white",borderRadius:100,border:"none"}}/>
                    <p style={{marginTop:"0.5em",color:"white"}}>Successful!</p>
                </div>
            </div>

            <div className='pay-container' style={{zIndex:"-1",position:"relative"}}>
            <span className='pay-title'>
                Confirm Payment
            </span>
                <div className='pay-text'>
                    <p>
                        <span>Service:</span>
                        Extend Retrieval
                    </p>
                    <p>
                        <span>Description:</span>
                        A secure link will be emailed to you for a extend time (3-6 months for retrieving data, then
                        deleted)
                    </p>
                    <p className='fee'>
                        <span>Fee:</span>
                        <p>£20</p>
                    </p>
                    <div className="form-input" style={{textAlign: "left", flexDirection: "row"}}>
                        <span style={{fontWeight: 600}}>Payments:</span>
                        <div className="form-check" style={{marginLeft: "1em"}}>
                            <input className="form-check-input" type="radio" name="flexRadio"
                                   id="flexRadioPaypal"></input>
                            <label className="form-check-label" htmlFor="flexRadioPaypal">
                                <label className='trans-btn'><BsPaypal size={30}/></label>
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadio" id="flexRadioStripe"
                                   checked></input>
                            <label className="form-check-label" htmlFor="flexRadioStripe">
                                <label className='trans-btn'><FaCcStripe size={30}/></label>
                            </label>
                        </div>
                    </div>
                </div>
                <button className='round-btn'>Pay</button>

            </div>

        </div>
    )
}


