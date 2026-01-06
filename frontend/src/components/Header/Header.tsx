import React from 'react';
import './Header.css';
import backIcon from '../../assets/back-icon.svg';

export interface HeaderProps {
  title: string;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
  return (
    <div className="header">
      <button className="header__back-button" onClick={onBack} aria-label="Go back">
        <img src={backIcon} alt="" className="header__back-icon" />
      </button>
      <h1 className="header__title">{title}</h1>
    </div>
  );
};

export default Header;

