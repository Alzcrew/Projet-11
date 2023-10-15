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

const AccountTransaction: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accountId = "" } = useParams();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
  const [allowDelete, setAllowDelete] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };

  const calculateTotalBalance = (transactions: any[]) => {
    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  const handleXmarkClick = () => {
    navigate('/user');
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const openDeleteModal = (transactionId: string, _id?: string) => {
    console.log("openDeleteModal called with transactionId:", transactionId); 
    if (allowDelete) {
      setSelectedTransaction(transactionId);
      setShowDeleteModal(true);
      setAllowDelete(false);
      setDeleteMessage(null);
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setAllowDelete(false);
    setDeleteMessage(null);
  };

  const deleteTransaction = async (transactionId: string) => {
    console.log("deleteTransaction called with ID:", transactionId);
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const res = await fetch(`http://localhost:3001/api/v1/user/accounts/${accountId}/transactions/${transactionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      });
      const data = await res.json(); 
      console.log("API response:", res);
      console.log("API response data:", data); 
      if (res.status === 200) {
        setTransactions(transactions.filter(t => t._id !== transactionId));
      }
    }
  };

  const confirmDeleteTransaction = () => {
    console.log("confirmDeleteTransaction called with selectedTransaction:", selectedTransaction); // Log 3
    if (selectedTransaction) {
      console.log(confirmDeleteTransaction);
      deleteTransaction(selectedTransaction);
      closeDeleteModal();
    }
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

  const totalBalance = calculateTotalBalance(transactions);
  const account = accounts.find(acc => acc.accountId === accountId);

  return (
    <>
      <NavBar handleLogout={handleLogout} />
      <main className="main bg-dark">
        <div className="account-detail-container">
        {account && (
          <AccountSection
            id={account.accountId}
            title={account.title}
            amount={`$${totalBalance}`}
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
            <FontAwesomeIcon icon={faTrash} size='xl' onClick={() => { setDeleteMessage("Choisissez la transaction à supprimer"); setAllowDelete(true); }} />
          </div>
        </div>
        {deleteMessage && <div className="delete-message">{deleteMessage}</div>}
        <div className="categories-container">
          <span>Date</span>
          <span>Description</span>
          <span>Amount</span>
          <span>Balance</span>
        </div>
        <div className="collapses-container">
          {transactions.map((transaction, index) => (
            <div onClick={() => openDeleteModal(transaction._id)} key={index}>
              <CollapseTransaction
                accountId={accountId}
                date={transaction.date}
                description={transaction.description}
                amount={`$${transaction.amount}`}
                balance={transaction.balance}
                transactionType={transaction.type}
                category={transaction.category}
                note={transaction.note}
                transactionId={transaction._id}
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
      {accountId && <AddTransactionModal isOpen={showAddModal} onRequestClose={() => setShowAddModal(false)} accountId={accountId} />}
      <DeleteTransactionModal isOpen={showDeleteModal} onRequestClose={closeDeleteModal} selectedTransaction={selectedTransaction} onDelete={confirmDeleteTransaction} />
    </>
  );
};

export default AccountTransaction;
