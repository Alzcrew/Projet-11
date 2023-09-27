import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/main.scss";
import argentBankLogo from '../../designs/img/argentBankLogo.png';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/counter/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from '../../app/store'; 

const SignIn: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();  
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const credentials = {
      username,
      password,
    };
    
    try {
      const action = await dispatch(loginUser(credentials));  // Ajouté les credentials
      const payload = unwrapResult(action); 
      navigate('/User');
    } catch (err) {
      console.error('Failed to login: ', err);
    }
  };
  return (
    <div>
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
        <Link to="/sign-in" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
        </Link>
        </div>
      </nav>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleLogin}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">Sign In</button>
      </form>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default SignIn;