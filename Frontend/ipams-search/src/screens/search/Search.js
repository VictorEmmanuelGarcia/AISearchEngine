import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Search.css"

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
        <div>
            {chatHistory.length === 0 && (
                <div className="title-logo-container">
                <image src="" alt="insert image here"/>
                <h1>Narrative Association for Linked Content (NALC)</h1>
                <h4>Your helpful search buddy for IPAMS.</h4>
                </div>
            )}

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

            <div className="user-input-container">
                <input
                type="text"
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Send</button>
            </div>
        </div>
    );
};

export default Search;