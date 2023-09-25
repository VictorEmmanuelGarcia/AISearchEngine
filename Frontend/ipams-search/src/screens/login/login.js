import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import { useContext, useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("Logging in with username:", username);
        console.log("Password:", password);
      };
    
      const handleSignUp = () => {
        console.log("Sign up button clicked");
      };

    return (
        <div>
            <image src="" alt="insert image here"/>
            <div className="title">
                <h1>
                    Narrative Association for Linked Content (NALC) 
                    for IPAMS (Intellectual Property Asset Management System)
                </h1>
                <h4>
                    © 2022 - 2024 Wildcats Innovation Lab, Cebu Institute of Technology-University
                    All rights reserved. 
                </h4>
            </div>
            <div className="login-container">
                <form>
                    <div className="input-container">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </div>
                    <div className="input-container">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    <div className="button-container">
                    <button type="button" onClick={handleLogin}>
                        Login
                    </button>
                    <button type="button" onClick={handleSignUp}>
                        Don’t have an account? 
                        Sign up through IPAMS here!
                    </button>
                    </div>
                </form>
                </div>
            <Link to="/search">click</Link>
        </div>
    );
};

export default Login;