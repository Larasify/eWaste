import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './fragments/Login.js';
import Layout from './fragments/Layout.js';
import Register from './pages/Register.js';
import Device from './pages/Device.js';
import Home from './pages/Home.js';
import Payment from "./pages/Payment";
import PaySuc from "./pages/PaySuc";
import UserAccount from './pages/UserAccount.js';
import UserRecycle from './pages/UserRecycle.js';
import './App.css';
import EditUserForm from "./pages/editUserForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="device" element={<Device/>}/>
          <Route path="payment" element={<Payment/>}/>
          <Route path="paysuc" element={<PaySuc/>}/>
          <Route path="useraccount" element={<UserAccount/>}/>
          <Route path="userrecycle" element={<UserRecycle/>}/>
          <Route path="editUserForm" element={<EditUserForm/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;