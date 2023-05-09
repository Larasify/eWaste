import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconTabs from '../fragments/Dashboard-components/IconTabs';
import {AuthContext} from "../App";


import './StaffDashboard.css';

export default function StaffDashboard() {
  const authState = React.useContext(AuthContext)
  const navigate = useNavigate()
  
  React.useEffect(() => {
    if(!authState.isLoggedIn || authState.privilege!='staff') navigate('/')
  }, [])

  return (
    <div className='w-full h-full'>
        <IconTabs/>
    </div>
  )
}
