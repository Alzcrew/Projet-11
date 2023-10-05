import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { logout, setUser } from '../../features/counter/authSlice'; 
import NavBar from '../../components/Navbar/Nav';
import { Header } from '../../components/Header/Header';
import { AccountSection } from '../../components/AccountSection/AccountSection';
import { Footer } from '../../components/Footer/Footer';
import { User as UserType } from '../../features/counter/authSlice';
import { useNavigate } from 'react-router-dom';


const User: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user) as UserType | null;
  const token = useSelector((state: RootState) => state.auth.token); 
  

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedToken = localStorage.getItem('token');
      console.log(storedToken);
      if (storedToken) {
        try {
          const res = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });
          const data = await res.json();
          console.log(data)
          dispatch(setUser(data));
        } catch (error) {
          console.error("Erreur lors de la récupération du profil utilisateur:", error);
        }
      }
    };
  
    fetchUserProfile();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };


  return (
    <>
      <NavBar handleLogout={handleLogout} />
      <main className="main bg-dark">
        <Header
          title="Welcome back,"
          username={
            user?.body?.firstName && user?.body?.lastName
              ? `${user.body.firstName} ${user.body.lastName}`
              : 'Loading...'
          }
        />
        <AccountSection id="someId1" title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
        <AccountSection id="someId2" title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
        <AccountSection id="someId3" title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
      </main>
      <Footer />
    </>
  );
};

export default User;
