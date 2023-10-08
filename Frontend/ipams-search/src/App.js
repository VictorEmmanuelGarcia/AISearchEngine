import logo from './logo.svg';
import './App.css';
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/login/login.js";
import Search from "./screens/search/Search";
import Home from "./screens/home/home";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Routes>
      <Route path='/' exact element={<Home/>}/>
      <Route path='/search' exact element={<Search/>}/>
    </Routes>
  );
}

export default App;
