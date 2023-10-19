import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Search from "./screens/search/Search";
import Home from "./screens/home/home";
import Navbar from './components/Navbar';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
      <div className='container-fluid'>
        <Navbar/>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          {/* <Route path='/login' exact element={<Login />} /> */}
          <Route path='/search' exact element={<Search />} />
        </Routes>
      </div>
  );
}

export default App;
