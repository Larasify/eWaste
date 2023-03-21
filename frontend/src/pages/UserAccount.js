import React from 'react';
import {BsFillArrowLeftCircleFill, BsPaypal} from "react-icons/bs";
import './UserAccount.css';
import {FaCcStripe} from "react-icons/fa";

const user = {
    props:{
        firstName: 'Harper',
        lastName: 'Perez',
        email:'jijdiew@gmail.com',
        id:'32344',
    }
};

export default function UserAccount(){
    return(

        <div className="user-container text-center">
            <div className="user-info-col">

                <button className='return-btn'><BsFillArrowLeftCircleFill size={48}/></button>
                <button className="user-avatar" style={{width:"200px", height:"200px"}}>
                    <img src="../../../imgs/avatar.png"/>
                </button>
                <p style={{margin:"0 auto",textAlign:"left",lineHeight:2}}>
                <span style={{fontSize:25,color:"black",textAlign:"left",fontWeight:"bold"}}>{user.props.firstName + ' ' + user.props.lastName}</span>
                <br/>
                <span style={{fontSize:18,color:"#494949",textAlign:"left"}}>{'#'+user.props.id}</span>
                <br/>
                <span style={{fontSize:20,color:"#509E82",textDecoration:"underline",textAlign:"left"}}>{user.props.email}</span>
                </p>
            </div>

            <div className="user-edit-col">
                <div className="account-edit-form">
                    <div className="name">
                    <div>
                        <label style={{textAlign:"left"}}>* First Name</label>
                        <input type="text"></input>
                    </div>
                    <div>
                        <label style={{textAlign:"left"}}>* Last Name</label>
                        <input type="text"></input>
                    </div>
                </div>
                <div className="form-input">
                    <label style={{textAlign:"left"}}>* Password</label>
                    <input type="password"></input>
                </div>
                <div className="form-input">
                    <label style={{textAlign:"left"}}>* Confirm Password</label>
                    <input type="password"></input>
                </div>
                <div className="form-input">
                    <label style={{textAlign:"left"}}>* Email</label>
                    <input type="text"></input>
                </div>
                    <div className="form-input">
                    <label style={{textAlign:"left"}}>* Phone Number</label>
                    <input type="text"></input>
                </div>
                <div className="form-input" style={{textAlign:"left",flexDirection:"row"}}>
                    <label style={{textAlign:"left"}}>* Payment:</label>
                    <div className="form-check" style={{marginLeft:"0.5em"}}>
                        <input className="form-check-input" type="radio" name="flexRadio" id="flexRadioPaypal"></input>
                            <label className="form-check-label" For="flexRadioPaypal">
                                <label className='trans-btn'><BsPaypal size={30}/></label>
                            </label>
                    </div>
                    <div className="form-check" style={{marginLeft:"2em"}}>
                        <input className="form-check-input" type="radio" name="flexRadio" id="flexRadioStripe" checked></input>
                            <label className="form-check-label" For="flexRadioStripe">
                                <label className='trans-btn'><FaCcStripe size={30}/></label>
                            </label>
                    </div>
                    <button className={"account-btn"} style={{fontSize:16,width:"7em",marginLeft:"5em"}}>
                        Edit
                    </button>
                </div>
                    <button className={"account-btn d-flex justify-content-center"} style={{fontSize:20,margin:"0.7em auto"}}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}


