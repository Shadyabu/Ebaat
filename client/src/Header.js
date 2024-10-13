import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css'; // Optional, if you want custom styles
import logo from './logo.png';

const Header = () => {
  const ACCOUNT_ADDRESS = 'payments/GC4UW5AKNTANSVJP7A3FDRPGIPMB4H5SX2LRTXNYUUA7R5NB2F4QON72';

  return (
    <header className="container-fluid bg-light py-3">
      <div className="row align-items-center">
        {/* Left side: Logo, Title, Tagline */}
        <div className="col-md-6 d-flex align-items-center">
          <Link to="/" className="d-flex align-items-center">
            <img
              src={logo}
              alt="Logo"
              className="img-fluid"
              style={{ width: '50px', height: '50px', marginRight: '15px' }}
            />
            <div>
              <h1 className="h4 mb-0">Ebaat</h1>
              <p className="mb-0 small">Accessible escrow payments</p>
            </div>
          </Link>
        </div>
        
        {/* Right side: MyAccount */}
        <div className="col-md-6 d-flex justify-content-md-end justify-content-center">
          <a href={ACCOUNT_ADDRESS} className="btn">
            MyAccount
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
