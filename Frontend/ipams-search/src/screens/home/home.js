import React, { useState } from 'react';
import './home.css';
import Login from '../login/login';

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
            <button className="sign-in-button" onClick={handleOpenLoginModal}>
                Sign In
            </button>
            <div className="center-content">
                <h1 className="title">Narrative Association for Linked Content (NALC)</h1>
                <h4 className="subtitle">Stand on the shoulders of giants.</h4>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Describe what papers you are looking for. Type it in detail!"
                    />
                    <button className="search-button">
                        Search
                    </button>
                </div>
            </div>
            {showLoginModal && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="login-modal">
                        <span className="close" onClick={handleCloseLoginModal}>
                            &times;
                        </span>
                        <Login />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;