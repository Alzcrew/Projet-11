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

interface TransactionType {
  accountId: string;
  date: string;
  description: string;
  amount: number;
  balance: string;
  type: string;
  category: string;
  note: string;
}

const User: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [totalBalances, setTotalBalances] = useState<{ [key: string]: number }>({});

  const fetchTransactions = async (accountId: string) => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const res = await fetch(`http://localhost:3001/api/v1/user/accounts/${accountId}/transactions`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      });
      const data = await res.json();
      return data.body;
    }
    return [];
  };

  const calculateTotalBalance = async (accountId: string) => {
    const transactions: TransactionType[] = await fetchTransactions(accountId);
    return transactions.reduce((acc: number, transaction: TransactionType) => acc + transaction.amount, 0);
  };

  useEffect(() => {
    const fetchTotalBalances = async () => {
      const newTotalBalances: { [key: string]: number } = {};
      for (const account of accounts) {
        newTotalBalances[account.accountId] = await calculateTotalBalance(account.accountId);
      }
      setTotalBalances(newTotalBalances);
    };

    fetchTotalBalances();
  }, [accounts]);

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
          username={user?.body?.userName ? user.body.userName : 'Loading...'}
        />
        {accounts.map((account) => (
          <AccountSection
            key={account.accountId}
            id={account.accountId}
            title={account.title}
            amount={`$${totalBalances[account.accountId] || 0}`}
            description="Available Balance"
          />
        ))}
      </main>
      <Footer />
    </>
  );
};

export default User;
