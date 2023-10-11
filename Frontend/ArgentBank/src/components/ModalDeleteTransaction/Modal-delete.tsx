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

interface AddTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
  }

  const DeleteTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onRequestClose }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
        <div className="modal-content">
        <h2>Supprimer une transaction</h2>
        <p>Êtes-vous sûr de vouloir supprimer cette transaction?</p>
        <button type="button" className='submit-btn'>Oui</button>
        <button type="button" className='submit-btn'>Non</button>
      </div>
    </Modal>
  );
};

export default DeleteTransactionModal;
