import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { logout, setUser } from '../../features/counter/authSlice';
import NavBar from '../../components/Navbar/Nav';
import { Header } from '../../components/Header/Header';
import { AccountSection } from '../../components/AccountSection/AccountSection';
import { Footer } from '../../components/Footer/Footer';

interface Account {
  accountId: string;
  title: string;
  amount: number;
  description: string;
}


const User: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    const fetchUserProfile = async () => {
      const res = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const data = await res.json();
      dispatch(setUser(data));
    };

    const fetchAccounts = async () => {
      const res = await fetch('http://localhost:3001/api/v1/user/accounts', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const { body } = await res.json();
      setAccounts(body);
    };

    fetchUserProfile();
    fetchAccounts();
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
        {accounts.map((account) => (
          <AccountSection
            key={account.accountId}
            id={account.accountId}
            title={account.title}
            amount={`$${account.amount}`}
            description="Available Balance"
          />
        ))}
      </main>
      <Footer />
    </>
  );
};

export default User;
