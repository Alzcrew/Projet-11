import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { setUser, logout, updateUsername } from '../../features/counter/authSlice';
import { AccountSection } from '../../components/AccountSection/AccountSection';
import NavBar from '../../components/Navbar/Nav';
import { Footer } from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

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

const EditUserPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [totalBalances, setTotalBalances] = useState<{ [key: string]: number }>({});
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const res = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });
        const data = await res.json();
        dispatch(setUser(data));
      }
    };
    fetchUserProfile();
  }, [dispatch]);

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
    const fetchAccounts = async () => {
      const storedToken = localStorage.getItem('token');
      const res = await fetch('http://localhost:3001/api/v1/user/accounts', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const { body } = await res.json();
      setAccounts(body);
    };

    fetchAccounts();
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

    dispatch(updateUsername(username))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          setSuccessMessage("Nom d'utilisateur mis à jour !");
          setErrorMessage(null);
          setTimeout(() => {
            navigate('/user');
          }, 2000);
        }
      })
      .catch((error) => {
        setErrorMessage("Une erreur s'est produite lors de la mise à jour.");
      });
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

export default EditUserPage;
