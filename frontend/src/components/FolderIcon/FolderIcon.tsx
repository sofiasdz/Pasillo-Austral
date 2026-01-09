import React from 'react';
import './FolderIcon.css';
import folderIcon from '../../assets/folder-icon.svg';

export interface FolderIconProps {
  name: string;
  onClick?: () => void;
}

export const FolderIcon: React.FC<FolderIconProps> = ({
  name,
  onClick,
}) => {
  return (
    <div
      className="folder-icon"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <img src={folderIcon} alt="" className="folder-icon__icon" />
      <div className="folder-icon__content">
        <p className="folder-icon__name">{name}</p>
      </div>
    </div>
  );
};

export default FolderIcon;

