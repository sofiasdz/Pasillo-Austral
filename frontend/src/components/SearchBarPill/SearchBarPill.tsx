import React from 'react';
import './SearchBarPill.css';
import closeIcon from '../../assets/close-icon.svg';

export interface SearchBarPillProps {
  label: string;
  onClose?: () => void;
}

export const SearchBarPill: React.FC<SearchBarPillProps> = ({ 
  label, 
  onClose 
}) => {
  return (
    <div className="search-bar-pill">
      <p className="search-bar-pill__label">{label}</p>
      {onClose && (
        <button 
          className="search-bar-pill__close"
          onClick={onClose}
          aria-label="Close"
        >
          <img src={closeIcon} alt="" className="search-bar-pill__close-icon" />
        </button>
      )}
    </div>
  );
};

export default SearchBarPill;

