import React from 'react';
import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

class Navbar extends React.Component {
  render() {
    return (
        <nav class="navbar fixed-top navi">
            <div class="container-fluid navi">
                <ul class="nav justify-content-end">
                    {/* <div class="dropdown">
                        <a class="btn btn-lg dropdown-toggle whiteTxt" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            John Doe
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Bookmark Papers</a></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><a class="dropdown-item" href="#">Login || Logout</a></li>
                        </ul>
                    </div> */}
                    <li class="nav-item">
                        <button type="button" class="btn whiteTxt">
                            <FontAwesomeIcon icon={faBookmark} size='xl' style={{ marginRight: '5px', color: "#ffea00" }} />
                            Bookmark Paper
                        </button>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="btn whiteTxt">
                            Login || Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>    
    );
  }
}

export default Navbar;
