import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Search.css"

const Search = () => {
    return (
        <div>
            <image src="" alt="insert image here"/>
            <div className="title">
                <h1>
                    Narrative Association for Linked Content (NALC) 
                </h1>
                <h4>
                    Your helpful search buddy for IPAMS.
                </h4>
            </div>
            <div className="input-container">
                <input
                    type="text"
                    id="query"
                />
            </div>
        </div>
    );
};

export default Search;