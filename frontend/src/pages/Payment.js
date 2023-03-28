import React from 'react';
import {BsPaypal} from "react-icons/bs";
import {FaCcStripe} from "react-icons/fa";
import './Payment.css';


export default function Payment(){
    return(
        <div class='pay-container'>
            <span class='pay-title'>
                Confirm Payment
            </span>
            <div class='pay-text'>
                <p>
                    <span>Service:</span>
                     Extend Retrieval
                </p>
                <p>
                    <span>Description:</span>
                    A secure link will be emailed to you for a extend time (3-6 months for retrieving data, then deleted)
                </p>
                <p class='fee'>
                    <span>Fee:</span>
                    <p>£20</p>
                </p>
                <div className="form-input" style={{textAlign: "left", flexDirection: "row"}}>
                    <span style={{fontWeight:600}}>Payments:</span>
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
            <button class='round-btn'>Pay</button>

        </div>
    )
}


