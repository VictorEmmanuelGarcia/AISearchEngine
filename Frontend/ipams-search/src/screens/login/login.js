import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser , faLock} from '@fortawesome/free-solid-svg-icons';

const Login = ({ handleCloseLoginModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make a POST request to obtain an authentication token
      const response = await axios.post("http://127.0.0.1:8000/user/obtain-auth-token/", {
        username: username,
        password: password,
      });

      const token = response.data.token;

      // Store the token securely, e.g., in local storage or state management
      // You can use a library like Redux or React Context for state management.

      // Close the modal and show Search
      handleCloseLoginModal();
    } catch (error) {
      // Handle login errors, e.g., display an error message
      console.error("Login failed:", error);
    }
  };

  const handleSignUp = () => {
    console.log("Sign up button clicked");
  };


    return (
        <div className="container align-items-center login-container">               
            <div className="row justify-content-center">
              <p className="fs-2 text-center">Sign In</p>
              <form className="col-md-6">
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <FontAwesomeIcon icon={faUser} />  
                  </span>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <div className="row">
                  <div className="col"/>
                  <div className="col-6 d-grid gap-2">
                    <button type="button" className="btn btn-warning btn-lg" onClick={handleLogin}>
                      Login
                    </button>
                  </div>
                  <div className="col"/>
                </div>
                <br/>
                <div className="row">
                  <div className="col"/>
                  <div className="col-6">
                    <span>Don’t have an account?</span>
                    <a class="btn btn-secondary" href="#" role="button">
                      Sign up through IPAMS here!
                    </a>
                  </div>
                  <div className="col"/>
                </div>
              </form>
            </div>
        </div>
    );
};

export default Login;