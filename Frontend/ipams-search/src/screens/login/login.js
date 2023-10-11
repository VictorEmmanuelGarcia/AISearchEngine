import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"
import { useContext, useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log("Logging in with username:", username);
        console.log("Password:", password);
        navigate("/search");
      };
    
      const handleSignUp = () => {
        console.log("Sign up button clicked");
      };

    return (
        <div className="container align-items-center login-container">
            <div className="row align-items-start mb-4">
                <image src="" alt="insert image here"/>
                <div className="col"></div>
                <div className="col-6">
                    <h2 className="title">
                        Narrative Association for Linked Content (NALC) 
                        for IPAMS <small><i>(Intellectual Property Asset Management System)</i></small>
                    </h2>
                    <p className="title">
                        © 2022 - 2024 Wildcats Innovation Lab, Cebu Institute of Technology-University
                        All rights reserved. 
                    </p>
                </div>
                <div className="col"/>
            </div>
            <div className="row justify-content-center">
                <form className="col-md-6">
                    <div className="input-container text-input mb-4">
                        <input
                        type="text"
                        id="username"
                        className="form-control rounded-pill"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        />
                    </div>
                    <div className="input-container text-input mb-4">
                        <input
                        type="password"
                        id="password"
                        className="form-control rounded-pill"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        />
                    </div>
                    <div className="button-container d-flex justify-content-between mt-6">
                        <button type="button" className="btn btn-warning rounded-pill" onClick={handleLogin}>
                            Login
                        </button>
                        <button type="button" className="btn btn-light rounded-pill small-font-button" onClick={handleSignUp}>
                            Don’t have an account? <br/>
                            Sign up through IPAMS here!
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;