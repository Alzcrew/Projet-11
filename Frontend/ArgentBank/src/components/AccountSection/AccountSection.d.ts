import React from 'react';
interface AccountSectionProps {
    title: string;
    amount: string;
    description: string;
    id: string;
    icon?: any;
    onClickIcon?: () => void;
}
export declare const AccountSection: React.FC<AccountSectionProps>;
export {};
