import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Search.css"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState([]);
    const [chatHistory, setHistory] = useState([]);

    const categoryMappings = {
        "14": "Education Science and Teacher Training",
        "18": "Fine and Applied Arts",
        "22": "Humanities",
        "26": "Religion and Theology",
        "30": "Social and Behavioral Sciences",
        "34": "Business Administration and Related",
        "38": "Law and Jurisprudence",
        "42": "Natural Science",
        "46": "Mathematics",
        "47": "IT-Related Disciplines",
        "50": "Medical and Allied",
        "52": "Trade, Craft and Industrial",
        "54": "Engineering and Tech",
        "58": "Architecture and Town Planning",
        "62": "Agriculture, Forestry, Fisheries",
        "66": "Home Economics",
        "78": "Service Trades",
        "84": "Mass Communication and Documentation",
        "89": "Other Disciplines",
        "90": "Maritime",
        "00": "General",
    }

    const handleSearch = () => {
        // Perform a query here (replace with your actual query logic)
        axios.get('http://127.0.0.1:8000/search/?query=${query}')
            .then(apiResponse => {
                const newChatHistory = [
                    ...chatHistory,
                    { id: 'user', message: query },
                    { id: 'bot', message: apiResponse.data },
                ];

                const updatedResponseData = apiResponse.data.map(item => ({
                    ...item,
                    psc_ed: categoryMappings[item.psc_ed] || item.psc_ed, // Replace if found in mappings, else keep the original value
                }));
                  
                setResponse(updatedResponseData);
                setHistory(newChatHistory);
                setQuery('');
            })
            .catch(error => {
                console.error(error);
        });
    };

     // Function to handle input changes and update the state
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };


    return (
        <div className="container">
            {chatHistory.length === 0 && (
                <div className="title-logo-container" id="cont">
                    <image src="" alt="insert image here"/>
                    <h1 className="textCenter">Narrative Association for Linked Content (NALC)</h1>
                    <h4 className="textCenter">Stand on the shoulders of giants.</h4>
                </div>
            )}
            <br/>
            <div class="input-group mb-3" id="input">
                <input type="text" className="form-control" placeholder="Describe what papers you are looking for. Type it in detail! " aria-label="Recipient's username" aria-describedby="button-addon2" value={query} onChange={handleInputChange}/> 
                <button class="btn btn-primary btn-lg" type="button" id="button-addon2" onClick={handleSearch}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>            
            </div>
            {/* Chat container with chat history */}
            <div className="chat-container">
                {chatHistory.map((message, index) => (
                <div key={index} className={`chat-message ${message.id}`}>
                    {message.id === 'bot' ? (
                    <div>
                        {/* Bot's response message */}
                        <p>Here are the search results:</p>
                        {/* Display the tabular response */}
                        <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Abstract</th>
                                <th>Year</th>
                                <th>PSCED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {message.message.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.abstract}</td>
                                <td>{item.year}</td>
                                <td>{item.psc_ed}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    ) : (
                    message.message
                    )}
                </div>
                ))}
            </div>
            <br/>
        </div>
    );
};

export default Search;