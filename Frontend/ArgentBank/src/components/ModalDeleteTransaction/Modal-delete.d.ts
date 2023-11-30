import React from 'react';
interface DeleteTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onDelete: (transactionId: string | null) => void;
    selectedTransaction: string | null;
}
declare const DeleteTransactionModal: React.FC<DeleteTransactionModalProps>;
export default DeleteTransactionModal;
