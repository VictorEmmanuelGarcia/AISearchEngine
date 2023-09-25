import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import { useContext, useState } from "react";

const Login = () => {
    return (
        <div>
            login page
            <Link to="/search">click</Link>
        </div>
    );
};

export default Login;