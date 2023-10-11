import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AccountSection } from '../../components/AccountSection/AccountSection';
import NavBar from '../../components/Navbar/Nav';
import { logout } from '../../features/counter/authSlice';
import { Footer } from '../../components/Footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import CollapseTransaction from '../../components/CollapseTransaction/Collapse-transaction';
import AddTransactionModal from '../../components/ModalAddTransaction/Modal-add';
import DeleteTransactionModal from '../../components/ModalDeleteTransaction/Modal-delete';

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

interface Account {
  accountId: string;
  title: string;
  amount: number;
  description: string;
}

const AccountTransaction: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { accountId } = useParams();
  const account = accounts.find(acc => acc.accountId === accountId);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };

  const handleXmarkClick = () => {
    navigate('/user');
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };
  
  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const res = await fetch(`http://localhost:3001/api/v1/user/accounts/${accountId}/transactions`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          },
        });
        const data = await res.json();
        setTransactions(data.body);
      }
    };

    const fetchAccounts = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const res = await fetch(`http://localhost:3001/api/v1/user/accounts`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          },
        });
        const data = await res.json();
        setAccounts(data.body);
      }
    };

    fetchTransactions();
    fetchAccounts();
  }, [accountId]);

  return (
    <>
      <NavBar handleLogout={handleLogout} />
      <main className="main bg-dark">
        <div className="account-detail-container">
          {account && (
            <AccountSection
              id={account.accountId}
              title={account.title}
              amount={`$${account.amount}`}
              description="Available Balance"
              icon={faXmark}
              onClickIcon={handleXmarkClick}
            />
          )}
        </div>
        <div className="add-delete-transaction">
          <div className="add-transaction">
            <FontAwesomeIcon icon={faPlus} size='2x' onClick={openAddModal} />
          </div>
          <div className="delete-transaction">
            <FontAwesomeIcon icon={faTrash} size='xl' onClick={openDeleteModal} />
          </div>
        </div>
        <div className="categories-container">
          <span>Date</span>
          <span>Description</span>
          <span>Amount</span>
          <span>Balance</span>
        </div>
        <div className="collapses-container">
          {transactions.map((transaction, index) => (
            <CollapseTransaction
              accountId={transaction.accountId}
              key={index}
              date={transaction.date}
              description={transaction.description}
              amount={`$${transaction.amount}`}
              balance={transaction.balance}
              transactionType={transaction.type}
              category={transaction.category}
              note={transaction.note}
            />
          ))}
        </div>
      </main>
      <Footer />
      {accountId && <AddTransactionModal isOpen={showAddModal} onRequestClose={() => setShowAddModal(false)} accountId={accountId} />}
      <DeleteTransactionModal isOpen={showDeleteModal} onRequestClose={() => setShowDeleteModal(false)} />
    </>
  );
};

export default AccountTransaction;
