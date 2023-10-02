import React from 'react';
import { Link } from 'react-router-dom';
import argentBankLogo from '../../designs/img/argentBankLogo.png';

interface NavBarProps {
  handleLogout: () => void; 
}

const NavBar: React.FC<NavBarProps> = ({ handleLogout }) => {
  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link to="/user" className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Tony
        </Link>
        <Link 
          to="/" 
          className='main-nav-item'
          onClick={(e) => {
            e.preventDefault(); 
            handleLogout(); 
          }}
        >
          <i className="fa fa-sign-out"></i>
          Sign Out
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
