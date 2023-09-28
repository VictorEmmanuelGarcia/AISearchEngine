import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Search.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState([]);
    const [chatHistory, setHistory] = useState([]);

    
    const handleSearch = () => {
        // Perform a query here (replace with your actual query logic)
        const sampleResponse = [
            { id: 1, name: 'Result 1' },
            { id: 2, name: 'Result 2' },
            { id: 3, name: 'Result 3' },
        ];

        // Update chat history with user query and bot response
        const newChatHistory = [
            ...chatHistory,
            { id: 'user', message: query },
            { id: 'bot', message: sampleResponse },
        ];

        setResponse(sampleResponse);
        setHistory(newChatHistory);
        setQuery('');
    };

    const chatMessages = [
        // User query
        {
            id: 'user',
            message: query,
        },
        // Bot response
        {
            id: 'bot',
            message: (
            <div>
                {/* Bot's response message */}
                <p>Here are the search results:</p>
                {/* Display the tabular response */}
                <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {response.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            ),
        },
    ];

    return (
        <div className="container">
            {chatHistory.length === 0 && (
                <div className="title-logo-container" id="cont">
                    <image src="" alt="insert image here"/>
                    <h1 className="textCenter">Narrative Association for Linked Content (NALC)</h1>
                    <h4 className="textCenter">Your helpful search buddy for IPAMS.</h4>
                </div>
            )}
            <br/>
            <div class="input-group mb-3" id="input">
                <input type="text" className="form-control" placeholder="Describe what papers you are looking for. Type it in detail! " aria-label="Recipient's username" aria-describedby="button-addon2"/> 
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
                            <th>ID</th>
                            <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {message.message.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
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