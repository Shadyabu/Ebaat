import React from 'react';
import './Header.css'; // optional, if you want custom styles
import logo from './logo.png';


const Header = () => {
  return (
    <header className="container-fluid bg-light py-3">
      <div className="row align-items-center">
        {/* Left side: Logo, Title, Tagline */}
        <div className="col-md-6 d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid"
            style={{ width: '70px', height: '70px', marginRight: '15px' }}
          />
          <div>
            <h1 className="h4 mb-0">Ebaat</h1>
            <p className="mb-0 small">Secure, accessible escrow payments </p>
          </div>
        </div>
        
        {/* Right side: MyAccount */}
        <div className="col-md-6 d-flex justify-content-md-end justify-content-center">
          <a href="" className="btn">
            MyAccount
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
