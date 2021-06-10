import React from 'react';
import { Link } from 'react-router-dom';
import img from './Image/favicon.png'
import './Header.css'

const Header = () => {
    return (
        <div>
               <nav class="navbar navbar-expand-lg navbar-light bg-success">
                <div class="container-fluid">
                    <a class="navbar-brand text-warning fs-3 fw-bold" href="#fh"><span class="text-danger">Tour</span> Transport</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link to="/home" class="nav-link active text-light">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/destination/:riderName" class="nav-link active text-light">Destination</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/contact" class="nav-link active text-light">Contact</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/blog" class="nav-link active text-light">Blog</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    );
};

export default Header;