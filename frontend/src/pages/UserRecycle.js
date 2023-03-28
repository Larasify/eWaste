import React from 'react';
import {BsFillArrowLeftCircleFill, BsPaypal} from "react-icons/bs";
import {FaCcStripe} from "react-icons/fa";
import './UserRecycle.css';
import IconTabs from '../fragments/Useraccount-components/IconTabs';

const user = {
    props:{
        firstName: 'Harper',
        lastName: 'Perez',
        email:'jijdiew@gmail.com',
        id:'32344',
    }
};

export default function UserRecycle(){
    return(
        <div className="user-recycle-container text-center">
            <div className="user-info-col" style={{width:"20%"}}>

                <button className='return-btn'><BsFillArrowLeftCircleFill size={48}/></button>
                <button className="user-avatar" style={{width: "180px", height: "180px"}}>
                    <img src="../../../imgs/avatar.png"/>
                </button>
                <p style={{margin: "0 auto", textAlign: "left", lineHeight: 2}}>
                    <span style={{
                        fontSize: 25,
                        color: "black",
                        textAlign: "left",
                        fontWeight: "bold"
                    }}>{user.props.firstName + ' ' + user.props.lastName}</span>
                    <br/>
                    <span style={{fontSize: 18, color: "#494949", textAlign: "left"}}>{'#' + user.props.id}</span>
                    <br/>
                    <span style={{
                        fontSize: 20,
                        color: "#509E82",
                        textDecoration: "underline",
                        textAlign: "left"
                    }}>{user.props.email}</span>
                </p>
            </div>

            <div className="user-edit-col">
                <IconTabs/>
            </div>
        </div>
    )
}


