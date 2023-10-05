import React from 'react';
import { Link } from 'react-router-dom';
import argentBankLogo from '../../designs/img/argentBankLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff , faGear } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface NavBarProps {
  handleLogout: () => void; 
}

const NavBar: React.FC<NavBarProps> = ({ handleLogout }) => {
  const user = useSelector((state: RootState) => state.auth.user);

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
      <div className='main-nav-container'>
        <Link to="/user" className="main-nav-item">
          {user?.body?.userName || 'Guest'}
          <div className="main-nav-user">
            <FontAwesomeIcon icon={faUser} size='xl' />
          </div>
        </Link>
        <Link to="" className="main-nav-item">
          <FontAwesomeIcon icon={faGear} size='xl' />
        </Link>
        <Link 
          to="/" 
          className='main-nav-item'
          onClick={(e) => {
            e.preventDefault(); 
            handleLogout(); 
          }}
        >
          <FontAwesomeIcon icon={faPowerOff} size='xl' />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
