import logo from './logo.svg';
import './App.css';
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/login/Login";
import Search from "./screens/search/Search";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Routes>
      <Route path='/' exact element={<Login/>}/>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/search' exact element={<Search/>}/>
    </Routes>
  );
}

export default App;
