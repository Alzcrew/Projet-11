import React from 'react';
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
declare const CollapseTransaction: React.FC<CollapseTransactionProps>;
export default CollapseTransaction;
