import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './fragments/Login.js';
import Layout from './fragments/Layout.js';
import Register from './pages/Register.js';
import StaffDashboard from './pages/StaffDashboard.js';
import Device from './pages/Device.js';
import Home from './pages/Home.js';
import Payment from "./pages/Payment";
import PaySuc from "./pages/PaySuc";
import UserAccount from './pages/UserAccount.js';
import UserRecycle from './pages/UserRecycle.js';
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
          <Route path="user-recycle" element={<UserRecycle/>}/>
          <Route path="edit-user-form" element={<EditUserForm/>}/>
          <Route path="staff-dashboard" element={<StaffDashboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export const AuthContext = createContext()
const contextValue = {
  isLoggedIn: false,
  firstName: "Ivan",
  lastName: "Tse",
  onLogin: null,
  onLogout: null
}
export const AuthContextProvider = (props) => {
  const onLogin = (firstName, lastName) => {
    contextValue.firstName = firstName
    contextValue.lastName = lastName
    contextValue.isLoggedIn = true
  }
  const onLogout = () => {
    contextValue.firstName = null;
    contextValue.lastName = null;
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