import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { logout } from '../../features/counter/authSlice';
import NavBar from '../../components/Navbar/Nav';
import { Header } from '../../components/Header/Header';
import { AccountSection } from '../../components/AccountSection/AccountSection';
import { Footer } from '../../components/Footer/Footer';

const User: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user); 

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };

  console.log(user)
  return (
    <>
      <NavBar handleLogout={handleLogout} />
      <main className="main bg-dark">
      <Header
  title="Welcome back"
  username={
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : 'Loading...'
  }
/>
        <AccountSection title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
        <AccountSection title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
        <AccountSection title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
      </main>
      <Footer />
    </>
  );
};

export default User;
