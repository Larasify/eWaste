/**
 * Staff Dashboard
 * @version 1
 * @author [Samar Musthafa](https://git.shefcompsci.org.uk/act22sm)
 * 
 */

/* Module Imports
React library Components */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconTabs from '../fragments/Dashboard-components/IconTabs';
/* Local imports */
import {AuthContext} from "../App";
import './StaffDashboard.css';

/* Main component renderer */
export default function StaffDashboard() {
  /* Auth state Handler */
  const authState = React.useContext(AuthContext)
  const navigate = useNavigate()
  
  /* Send unprivileged and null users back */
  React.useEffect(() => {
    if(!authState.isLoggedIn || authState.privilege!='staff') navigate('/')
  }, [])

  return (
    /* IconTabs Component of Dashboard */
    <div className='w-full h-full'>
        <IconTabs/>
    </div>
  )
}
