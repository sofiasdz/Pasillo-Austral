import React, { useState } from 'react';
import './TopBar.css';
import logoImage from '../../assets/logo-home.svg';
import searchIcon from '../../assets/search-icon.svg';
import avatarImage from '../../assets/avatar1.png';
import { SearchBarPill } from '../SearchBarPill/SearchBarPill';
import { useLocation, useNavigate } from 'react-router-dom';

export interface TopBarProps {
  username?: string;
  avatar?: string;
  searchPlaceholder?: string;
}

const TOPIC_NAMES: Record<string, string> = {
  "1": "Análisis Matemático I",
  "2": "Programación I",
  "3": "Álgebra I",
  "4": "Quimica I",
  "5": "General",
  "6": "Física I"
};

export const TopBar: React.FC<TopBarProps> = ({ 
  username = '@Khali_1998',
  avatar,
  searchPlaceholder = 'Buscar',
}) => {

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const topicId = pathname.startsWith('/topic/')
    ? pathname.split('/topic/')[1].split('/')[0]
    : undefined;

  const searchPill = topicId ? TOPIC_NAMES[topicId] : undefined;

  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Si está en un topic: sacar pill y navegar con query
    navigate(`/search?q=${encodeURIComponent(newValue)}`);
  };

  const handleClosePill = () => {
    navigate('/search');
  };

  return (
    <div className="topbar">
      <div className="topbar__content">
        <div className="topbar__logo-section">
          <div className="topbar__logo">
            <img src={logoImage} alt="Pasillo Austral Logo" className="topbar__logo-img" />
          </div>
          <div className="topbar__brand">
            <h1 className="topbar__brand-text">Pasillo Austral</h1>
          </div>
        </div>

        <div className="topbar__search">
          <div className="topbar__search-content">
            <div className="topbar__search-input">
              <div className="topbar__search-icon">
                <img src={searchIcon} alt="Search" className="topbar__search-icon-img" />
              </div>

              {searchPill && (
                <SearchBarPill label={searchPill} onClose={handleClosePill} />
              )}

              <input
                type="text"
                className="topbar__search-field"
                value={value}
                onChange={handleChange}
                placeholder={searchPlaceholder}
                autoFocus
              />
            </div>
          </div>
        </div>

        <div className="topbar__user">
          <div className="topbar__user-info">
            <div className="topbar__avatar">
              <img 
                src={avatar || avatarImage} 
                alt={username} 
                className="topbar__avatar-img"
                width={40}
                height={40}
              />
            </div>
            <div className="topbar__username">{username}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

