import React from 'react';
import './TopBar.css';
import logoImage from '../../assets/logo-home.svg';
import searchIcon from '../../assets/search-icon.svg';
import avatarImage from '../../assets/avatar1.png';
import { SearchBarPill } from '../SearchBarPill/SearchBarPill';

export interface TopBarProps {
  username?: string;
  avatar?: string;
  searchPill?: string;
  onSearchPillClose?: () => void;
  searchPlaceholder?: string;
  searchQuery?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  username = '@Khali_1998',
  avatar,
  searchPill,
  onSearchPillClose,
  searchPlaceholder = 'Buscar',
  searchQuery
}) => {
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

        <button className="topbar__search">
          <div className="topbar__search-content">
            <div className="topbar__search-input">
              <div className="topbar__search-icon">
                <img src={searchIcon} alt="Search" className="topbar__search-icon-img" />
              </div>
              {searchPill && (
                <SearchBarPill label={searchPill} onClose={onSearchPillClose} />
              )}
              {searchQuery ? (
                <p className="topbar__search-query">{searchQuery}</p>
              ) : (
                <p className="topbar__search-placeholder">{searchPlaceholder}</p>
              )}
            </div>
          </div>
        </button>

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

