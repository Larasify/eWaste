import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Layout from './fragments/Layout.js';
import Register from './pages/Register.js';
import Home from './pages/Home.js';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;