import React from 'react';
import './FolderHeader.css';
import plusIcon from '../../assets/plus-blue-icon.svg';

export interface FolderHeaderProps {
  label?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const FolderHeader: React.FC<FolderHeaderProps> = ({
  label = 'Carpetas',
  buttonText = 'Nueva carpeta',
  onButtonClick,
}) => {
  return (
    <div className="folder-header">
      <div className="folder-header__content">
        <p className="folder-header__label">{label}</p>
        <button className="folder-header__button" onClick={onButtonClick} type="button">
          <img src={plusIcon} alt="" className="folder-header__button-icon" />
          <p className="folder-header__button-text">{buttonText}</p>
        </button>
      </div>
    </div>
  );
};

export default FolderHeader;

