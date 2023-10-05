import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setUser, logout } from '../../features/counter/authSlice';
import { User as UserType } from '../../features/counter/authSlice';
import { AccountSection } from '../../components/AccountSection/AccountSection';
import NavBar from '../../components/Navbar/Nav';
import { Footer } from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const EditUserPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user) as UserType | null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const res = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });
          const data = await res.json();
          dispatch(setUser(data));
        } catch (error) {
          console.error("Erreur lors de la récupération du profil utilisateur:", error);
        }
      }
    };
    fetchUserProfile();
  }, [dispatch]);

  const handleCancel = () => {
    navigate('/user');
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "") {
      setErrorMessage("Le champ de l'username ne peut pas être vide !");
      return;
    }

    const storedToken = localStorage.getItem('token');
    const res = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName: username })
    });
    const data = await res.json();

    if (data.status === 200) {
      setSuccessMessage("Nom d'utilisateur mis à jour !");
      setErrorMessage(null);
      setTimeout(() => {
        navigate('/user');
      }, 2000);
    } else {
      setErrorMessage("Une erreur s'est produite lors de la mise à jour.");
    }
  };

  return (
    <>
      <NavBar handleLogout={handleLogout} />
      <main className="main bg-dark">
        <h1 className='edit-title'>Edit user info</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>User name:</label>
            <input 
              type="text"  
              className='input-text' 
              placeholder="Nom d'utilisateur" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            First name: <input type="text" className='input-text-disabled' value={user?.body?.firstName || ''} disabled />
          </div>
          <div className="input-container">
            Last name: <input type="text" className='input-text-disabled' value={user?.body?.lastName || ''} disabled />
          </div>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="btn-container">
            <button type="submit" className='submit-btn'>Save</button>
            <button type="button" className='cancel-btn' onClick={handleCancel}>Cancel</button>
          </div>
        </form>
        <AccountSection  id="someId1" title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
        <AccountSection  id="someId2" title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
        <AccountSection  id="someId3" title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
      </main>
      <Footer />
    </>
  );
};

export default EditUserPage;
