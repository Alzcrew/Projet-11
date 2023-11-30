import React from 'react';
interface AddTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    accountId: string;
}
declare const AddTransactionModal: React.FC<AddTransactionModalProps>;
export default AddTransactionModal;
