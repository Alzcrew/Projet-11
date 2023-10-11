import React, { FormEvent, useState } from 'react';
import Modal from 'react-modal';

// Styles
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

// Interface pour le Payload
interface TransactionPayload {
  accountId: string;
  date: string;
  description: string;
  amount: number;
  balance: string;
  type: string;
  category: string;
  note: string;
}

// Props
interface AddTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  accountId: string;
}

// Validation du Payload
const isPayloadValid = (payload: TransactionPayload): boolean => {
  return Object.values(payload).every(value => value !== null && value !== '');
};

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onRequestClose, accountId }) => {
  
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
  setErrorMessage(null);
    const formData = new FormData(e.currentTarget);
    let date = formData.get('date') as string;

    // Convertir la date en format "YYYY-MM-DD"
    const [year, month, day] = date.split('-');
    const convertedDate = `${year}-${month}-${day}`;

    // Création du Payload
    const payload: TransactionPayload = {
      accountId,
      date: convertedDate,
      description: formData.get('description') as string,
      amount: Number(formData.get('amount')),
      balance: formData.get('balance') as string,
      type: formData.get('type') as string,
      category: formData.get('category') as string,
      note: formData.get('note') as string
    };

    // Validation
    if (isPayloadValid(payload)) {
      // Envoie le payload à ton API
      const storedToken = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/v1/user/accounts/${accountId}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.status === 201) {
        setSuccessMessage("Transaction ajoutée avec succès !");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setErrorMessage("Une erreur s'est produite lors de l'ajout de la transaction.");
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs !");
    }
  };


  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className="modal-content">
        <h2>Add a transaction</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className='form-add-transaction'>
          <input type="date" name="date" placeholder="Date" className='input-container input-text'/>
          <input type="text" name="description" placeholder="Description" className='input-container input-text'/>
          <input type="text" name="amount" placeholder="Amount" className='input-container input-text'/>
          <input type="text" name="balance" placeholder="Balance" className='input-container input-text'/>
          <select name="type" className='input-container input-text'>
            <option value="deposit">Dépôt</option>
            <option value="withdrawal">Retrait</option>
          </select>
          <select name="category" className='input-container input-text'>
            <option value="food">Food</option>
            <option value="health">Health</option>
            <option value="investment">Investment</option>
            <option value="hobbies">Hobbies</option>
            <option value="clothes">Clothes</option>
          </select>
          <input type="text" name="note" placeholder="Note" className='input-container input-text'/>
          <button type="submit" className='submit-btn'>Add</button>
        </form>
      </div>
    </Modal>
  );
};

export default AddTransactionModal;
