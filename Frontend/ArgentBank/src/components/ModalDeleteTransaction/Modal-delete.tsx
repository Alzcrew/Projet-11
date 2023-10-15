import React from 'react';
import Modal from 'react-modal';

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

interface DeleteTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onDelete: (transactionId: string | null) => void;  
  selectedTransaction: string | null;
}

const DeleteTransactionModal: React.FC<DeleteTransactionModalProps> = ({ isOpen, onRequestClose, onDelete, selectedTransaction }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className="modal-content">
        <h2>Supprimer une transaction</h2>
        <p>Êtes-vous sûr de vouloir supprimer cette transaction?</p>
        <button type="button" className='submit-btn' onClick={() => onDelete(selectedTransaction)}>Oui</button>
        <button type="button" className='submit-btn' onClick={onRequestClose}>Non</button>
      </div>
    </Modal>
  );
};

export default DeleteTransactionModal;
