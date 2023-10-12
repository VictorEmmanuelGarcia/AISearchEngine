import React, { useState } from 'react';
import './home.css';
import Search from '../search/Search';

function Home() {
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleOpenLoginModal = () => {
        setShowLoginModal(true);
    };

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    // Handle modal overlay click to close the modal
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            handleCloseLoginModal();
        }
    };

    return (
        <div className="home-container">
            <div className="center-content">
                {/* <h1 className="title">Narrative Association for Linked Content (NALC)</h1>
                <h4 className="subtitle">Stand on the shoulders of giants.</h4>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Describe what papers you are looking for. Type it in detail!"
                    />
                    <button className="search-button">
                        Search
                    </button> 
                </div> */}
                <Search/>
            </div>
        </div>
    );
}

export default Home;