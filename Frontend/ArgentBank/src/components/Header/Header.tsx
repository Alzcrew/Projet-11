import React from 'react';

interface HeaderProps {
  title: string;
  username: string;
}

export const Header: React.FC<HeaderProps> = ({ title, username }) => {
  return (
    <div className="header">
      <h1>
        {title}
        <br />
        {username || "Loading..."}
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  );
};
