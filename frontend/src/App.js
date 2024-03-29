/**
 * Router
 * @version 1
 * @author [Samar Musthafa](https://git.shefcompsci.org.uk/act22sm)
 * 
 */

/* Module Imports
React library Components */
/* BrowserRouter */
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {createContext} from "react";
import "@stripe/stripe-js";

/* Component Imports */
import Layout from './fragments/Layout.js';
import StaffLayout from './fragments/StaffLayout.js';
import Register from './pages/Register.js';
import StaffDashboard from './pages/StaffDashboard.js';
import Device from './pages/Device.js';
import CustomDevice from './pages/CustomDevice.js';
import Home from './pages/Home.js';
import Payment from "./pages/Payment";
import PaySuc from "./pages/PaySuc";
import UserAccount from './pages/UserAccount.js';
import UserRecycle from './pages/UserRecycle.js';
import DeviceUpload from './pages/DeviceUpload.js';
import EditDeviceForm from './pages/EditDeviceForm.js';
import AddDeviceForm from './pages/AddDeviceForm.js';
import ViewDeviceReport from './pages/ViewDeviceReport.js';
import EditTransactionForm from './pages/EditTransactionForm.js';
import EditVendorForm from './pages/EditVendorForm';
import Paypal from './pages/Paypal';
import Stripe from './pages/Stripe';
import './App.css';
import EditUserForm from "./pages/EditUserForm.js";
import AdminDashboard from './pages/AdminDashboard.js';
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    /* Router */
    <BrowserRouter>
      <Routes>
        {/* Default User Routes */}
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="device" element={<Device/>}/>
          <Route path="custom-device" element={<CustomDevice/>}/>
          <Route path="payment" element={<Payment/>}/>
          <Route path="payment-success" element={<PaySuc/>}/>
          <Route path="user-account" element={<UserAccount/>}/>
          <Route path="user-device-upload" element={<DeviceUpload/>}/>
          <Route path="user-recycle" element={<UserRecycle/>}/>
          <Route path="add-device-form" element={<AddDeviceForm/>}/>
          <Route path="view-device-report" element={<ViewDeviceReport/>}/>
          <Route path="payment-paypal" element={<Paypal/>}/>
          <Route path="payment-stripe" element={<Stripe/>}/>
          {/* FNF Reqeuests */}
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        {/* staff dashboard pages */}
        <Route path="/staff" element={<StaffLayout/>}>
          <Route path="dashboard" element={<StaffDashboard/>}/>
          <Route path="edit-device-form" element={<EditDeviceForm/>}/>
          <Route path="edit-vendor-form" element={<EditVendorForm/>}/>
          <Route path="edit-transaction-form" element={<EditTransactionForm/>}/>
        </Route>
        {/* Admin Dashboard pages */}
        <Route path="/admin" element={<StaffLayout/>}>
          <Route path="dashboard" element={<AdminDashboard/>}/>
          <Route path="edit-user-form" element={<EditUserForm/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

/* Auth cotext object */
export const AuthContext = createContext({
  isLoggedIn: false,
  firstName: null,
  lastName: null,
  userId: null,
  onLogin: null,
  onLogout: null,
  privilege: null
})
/* Context for current user */
const contextValue = {
  isLoggedIn: false,
  firstName: null,
  lastName: null,
  userId: null,
  onLogin: null,
  onLogout: null,
  privilege: null
}
/* getters and setters of
AuthContext */
export const AuthContextProvider = (props) => {
  /* On login */
  const onLogin = (firstName, lastName, userId, privilege) => {
    /* 
    * @param {firstName} user's first name
    * @param {lastName} user's last name
    * @param {userId} user's id
    * @param {privilege} user's permission as staff/admin/user
    */
    contextValue.firstName = firstName
    contextValue.lastName = lastName
    contextValue.userId = userId
    contextValue.isLoggedIn = true
    contextValue.privilege = privilege;
  }
  /* On logout */
  const onLogout = () => {
    contextValue.firstName = null;
    contextValue.lastName = null;
    contextValue.userId = null;
    contextValue.isLoggedIn = false
    contextValue.privilege = null;
  }
  contextValue.onLogin = onLogin
  contextValue.onLogout = onLogout

  /* Main renderer */
  return (
      <AuthContext.Provider value={contextValue}>
        {props.children}
      </AuthContext.Provider>
  )
}
export default App;