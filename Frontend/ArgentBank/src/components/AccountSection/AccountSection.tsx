import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface AccountSectionProps {
  title: string;
  amount: string;
  description: string;
  id: string;
  icon?: any;
  onClickIcon?: () => void; 
}

export const AccountSection: React.FC<AccountSectionProps> = ({ title, amount, description, id, icon }) => {
  const navigate = useNavigate();

  const handleTransactionClick = () => {
    if (icon === faXmark) {
      navigate('/user');
    } else {
      navigate(`/transactions/${id}`);
    }
  };

  return (
    <div onClick={handleTransactionClick} className="account-clickable">
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">{title}</h3>
          <p className="account-amount">{amount}</p>
          <p className="account-amount-description">{description}</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">
            <FontAwesomeIcon icon={icon || faChevronRight} size='6x' />
          </button>
        </div>
      </section>
    </div>
  );
};
