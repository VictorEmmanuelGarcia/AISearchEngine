import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Search.css"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane , faBookmark , faLockOpen , faFolderPlus} from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState([]);
    const [chatHistory, setHistory] = useState([]);
    const [indivPaper, setIndivPaper] = useState({});

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
        // Clear previous chat history and response data
        setHistory([]);
        setResponse(null);

        // Perform a new query here (replace with your actual query logic)
        axios
          .get(`http://127.0.0.1:8000/search/?query=${query}`)
          .then((apiResponse) => {
            const updatedResponseData = apiResponse.data.map((item) => ({
              ...item,
              psc_ed: categoryMappings[item.psc_ed] || item.psc_ed, // Replace if found in mappings, else keep the original value
            }));
      
            const newChatHistory = [
              { id: 'user', message: query },
              { id: 'bot', message: updatedResponseData },
            ];
      
            setResponse(updatedResponseData);
            setHistory(newChatHistory);
            setQuery('');
          })
          .catch((error) => {
            console.error(error);
          });
      };
      

    const openModal = (id) => {      
        // Make the Axios GET request
        axios.get(`http://127.0.0.1:8000/research-papers/${id}/`)
          .then((response) => {
            const data = response.data;
            setIndivPaper(data);
            console.log(indivPaper);
          })
          .catch((error) => {
            // Handle any errors that occur during the GET request
            console.error('Error:', error);
          });
      };

    return (
        <div className="container cont">
            {chatHistory.length === 0 && (
                <div className="title-logo-container" id="cont">
                    <image src="" alt="insert image here"/>
                    <h1 className="textCenter">Narrative Association for Linked Content (NALC)</h1>
                    <h4 className="textCenter">Stand on the shoulders of giants.</h4>
                </div>
            )}
            <br/>
            <div class="input-group mb-3" id="input">
                <input type="text" className="form-control" placeholder="Describe what papers you are looking for. Type it in detail! " aria-label="Recipient's username" aria-describedby="button-addon2" onChange={ (e) => setQuery(e.target.value) }/> 
                <button class="btn btn-warning btn-lg" type="button" id="button-addon2" onClick={handleSearch}>
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
                        <p className="textCenter">Here are the search results:</p>
                        {/* Display the tabular response */}
                        <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Abstract</th>
                                <th>Year</th>
                                <th>PSCED</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {message.message.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.abstract.slice(0, 250)}...</td>
                                <td>{item.year}</td>
                                <td>{item.psc_ed}</td>
                                <td>
                                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal"  onClick={() => openModal(item.id)}>
                                    View
                                </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-xl">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">{indivPaper.title}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                                        <div class="offcanvas-header">
                                            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Bookmark</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div class="offcanvas-body">
                                            <div className="row">
                                                <div className="col">
                                                    Choose Folders
                                                </div>
                                                <div className="col">
                                                    <button class="btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                                        <FontAwesomeIcon icon={faFolderPlus} style={{ marginRight: '5px', color: "#ffea00" }} />
                                                        Add New Folder
                                                    </button>
                                                </div>
                                                <div class="collapse" id="collapseExample">
                                                    <div class="card card-body">
                                                        <div class="form-floating mb-3">
                                                            <input type="text" class="form-control" id="floatingInput" placeholder="Enter Folder Name"/>
                                                            <label for="floatingInput">Folder Name</label>
                                                        </div>
                                                        <button class="btn btn-warning" type="button">
                                                            Add Folder
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-floating mb-3">
                                                <input type="text" class="form-control" id="floatingInput" placeholder="Enter Folder Name"/>
                                                <label for="floatingInput">Search Foolder</label>
                                            </div>
                                            <button class="btn btn-warning" data-bs-dismiss="offcanvas" type="button">
                                                Save and Close
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <p class="fs-6">Author: {indivPaper.author}</p>
                                        </div>
                                        <div className="col-6">
                                            <p class="fs-6">PSCED: {categoryMappings[indivPaper.psc_ed] || indivPaper.psc_ed}</p>
                                        </div>
                                        <div className="col">
                                            <p class="fs-6">Year: {indivPaper.year}</p>
                                        </div>
                                    </div>
                                    <p class="fs-6">Abstract:</p>
                                    <div class="d-flex justify-content-start">{indivPaper.abstract}</div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                                        <FontAwesomeIcon icon={faBookmark} style={{ marginRight: '5px', color: "#ffea00" }} />
                                        Bookmark Paper
                                    </button>
                                    <button type="button" class="btn">
                                        <FontAwesomeIcon icon={faLockOpen} style={{marginRight: '5px', color: "#ffea00",}} />
                                        Request Access
                                    </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ) : (
                    <p className="textCenter">Your Search: {message.message}</p>
                    )}
                </div>
                ))}
            </div>
            <br/>
        </div>
    );
};

export default Search;