import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUpdatedTransactions } from '../../features/counter/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPen } from '@fortawesome/free-solid-svg-icons';
import { AppDispatch } from '../../app/store';

interface CollapseTransactionProps {
  date: string;
  description: string;
  amount: string;
  balance: string;
  transactionType: string;
  category: string;
  note: string;
  accountId: string;
  transactionId: string;
}

const CollapseTransaction: React.FC<CollapseTransactionProps> = ({ date, description, amount, balance, transactionType, category, note, accountId, transactionId }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [newCategory, setNewCategory] = useState(category);
  const [newNote, setNewNote] = useState(note);

  const toggleCollapse = () => setIsOpen(!isOpen);
  const handleEditCategory = () => setIsEditingCategory(!isEditingCategory);
  const handleEditNote = () => setIsEditingNote(!isEditingNote);

  const handleUpdate = async () => {
    setIsEditingCategory(false);
    setIsEditingNote(false);

    const payload = { category: newCategory, note: newNote };
    const storedToken = localStorage.getItem('token');

    const response = await fetch(`http://localhost:3001/api/v1/user/accounts/${accountId}/transactions/${transactionId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${storedToken}` },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setNewCategory(newCategory);
      setNewNote(newNote);
      dispatch(fetchUpdatedTransactions(accountId));
    }
  };

  return (
    <div className="transaction-container">
      <div className="transaction-header" onClick={toggleCollapse}>
        <div className='collapse-close-details'>
          <span>{date}</span>
          <span>{description}</span>
          <span>{amount}</span>
          <span>{balance}</span>
        </div>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      {isOpen && (
        <div className="transaction-details">
          <div className='transaction-detail'>
            <span className="label">Transaction Type</span>
            <span>{transactionType}</span>
          </div>
          <div className='transaction-detail'>
            <span className="label">Category</span>
            <div>
              {isEditingCategory ? (
                <>
                  <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                    <option value="food">Food</option>
                    <option value="health">Health</option>
                    <option value="investment">Investment</option>
                    <option value="hobbies">Hobbies</option>
                    <option value="clothes">Clothes</option>
                  </select>
                  <button onClick={handleUpdate}>Confirmer</button>
                </>
              ) : (
                <span>{newCategory}</span>
              )}
              <FontAwesomeIcon icon={faPen} onClick={handleEditCategory} />
            </div>
          </div>
          <div className='transaction-detail'>
            <span className="label">Note</span>
            <div>
              {isEditingNote ? (
                <>
                  <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                  <button onClick={handleUpdate}>Confirmer</button>
                </>
              ) : (
                <span>{newNote}</span>
              )}
              <FontAwesomeIcon icon={faPen} onClick={handleEditNote} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollapseTransaction;
