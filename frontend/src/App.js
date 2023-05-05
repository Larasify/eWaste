import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Layout from './fragments/Layout.js';
import StaffLayout from './fragments/StaffLayout.js';
import Register from './pages/Register.js';
import StaffDashboard from './pages/StaffDashboard.js';
import Device from './pages/Device.js';
import Home from './pages/Home.js';
import Payment from "./pages/Payment";
import PaySuc from "./pages/PaySuc";
import UserAccount from './pages/UserAccount.js';
import UserRecycle from './pages/UserRecycle.js';

import DeviceUpload from './pages/DeviceUpload.js';
import EditDeviceForm from './pages/EditDeviceForm.js';
import AddDeviceForm from './pages/AddDeviceForm.js';
import ViewDeviceReport from './pages/ViewDeviceReport.js';
import './App.css';
import EditUserForm from "./pages/editUserForm";
import {createContext} from "react";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="device" element={<Device/>}/>
          <Route path="payment" element={<Payment/>}/>
          <Route path="payment-success" element={<PaySuc/>}/>
          <Route path="user-account" element={<UserAccount/>}/>
          <Route path="user-device-upload" element={<DeviceUpload/>}/>
          <Route path="user-recycle" element={<UserRecycle/>}/>
          <Route path="edit-user-form" element={<EditUserForm/>}/>
          <Route path="add-device-form" element={<AddDeviceForm/>}/>
          <Route path="edit-device-form" element={<EditDeviceForm/>}/>
          <Route path="view-device-report" element={<ViewDeviceReport/>}/>
        </Route>
        <Route path="/staff" element={<StaffLayout/>}>
          <Route path="dashboard" element={<StaffDashboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export const AuthContext = createContext({
  isLoggedIn: false,
  firstName: null,
  lastName: null,
  userId: null,
  onLogin: null,
  onLogout: null
})
const contextValue = {
  isLoggedIn: false,
  firstName: null,
  lastName: null,
  userId: null,
  onLogin: null,
  onLogout: null
}
export const AuthContextProvider = (props) => {
  const onLogin = (firstName, lastName, userId) => {
    contextValue.firstName = firstName
    contextValue.lastName = lastName
    contextValue.userId = userId
    contextValue.isLoggedIn = true
  }
  const onLogout = () => {
    contextValue.firstName = null;
    contextValue.lastName = null;
    contextValue.userId = null;
    contextValue.isLoggedIn = false
  }
  contextValue.onLogin = onLogin
  contextValue.onLogout = onLogout

  return (
      <AuthContext.Provider value={contextValue}>
        {props.children}
      </AuthContext.Provider>
  )
}
export default App;