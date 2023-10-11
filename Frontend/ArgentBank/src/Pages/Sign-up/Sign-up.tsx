import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import argentBankLogo from '../../designs/img/argentBankLogo.png';
import { Footer } from "../../components/Footer/Footer";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          userName,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setSuccessMessage("Inscription réussie !");
        setErrorMessage(null);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setErrorMessage("Une erreur s'est produite lors de l'inscription.");
      }

    } catch (error) {
      setErrorMessage("Une erreur s'est produite lors de l'inscription.");
    }
  };

  return (
    <div className="container-page-inscription">
      <nav className="sign-in-nav">
        <Link to="/" className="sign-in-nav-logo">
          <img
            className="home-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
      </nav>
      <div className='form-container'>
        <h1>Inscription</h1>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className='inscription-form'>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='input-container input-text'
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input-container input-text'
          />
          <input
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='input-container input-text'
          />
          <input
            type="text"
            placeholder="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='input-container input-text'
          />
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className='input-container input-text'
          />
          <button type="submit" className='cancel-btn'>S'inscrire</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
