import React , {useState} from 'react';
import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import Login from '../screens/login/login';


function Navbar() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenLoginModal = () => {
        setShowModal(true);
      };
    
      const handleCloseLoginModal = () => {
        setShowModal(false);
      };

    return (
        <>
            <nav class="navbar fixed-top navi">
                <div class="container-fluid navi">
                    <a class="navbar-brand whiteTxt" href="#"></a>
                    <ul class="nav justify-content-end">
                        <li class="nav-item">
                            <button type="button" class="btn whiteTxt">
                                <FontAwesomeIcon icon={faBookmark} size='xl' style={{ marginRight: '5px', color: "#fecc00" }} />
                                Bookmark Paper
                            </button>
                        </li>
                        <li class="nav-item">
                        <button type="button" class="btn whiteTxt" onClick={handleOpenLoginModal}>
                            Sign In
                        </button>
                        </li>
                    </ul>
                </div>
            </nav> 
            <div className={`modal${showModal ? ' show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
                <div class="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-xxl-down">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div className='position-relative'>
                                <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseLoginModal}></button>
                            </div>
                            <Login handleCloseLoginModal={handleCloseLoginModal}/>
                        </div>
                    </div>
                </div>
            </div>
        </>   
    );
}

export default Navbar;
