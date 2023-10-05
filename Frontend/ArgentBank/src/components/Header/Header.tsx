import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  username: string;
}

export const Header: React.FC<HeaderProps> = ({ title, username }) => {
  const navigate = useNavigate();

  const handleEditNameClick = () => {
    navigate('/edit-username');
  };

  return (
    <div className="header">
      <h1 className='header-title'>
        {title}
        <br />
        {username}
      </h1>
      <button className="edit-button" onClick={handleEditNameClick}>Edit Name</button>
    </div>
  );
};
