import React from 'react';
import './StarredFileItem.css';

export interface StarredFileItemProps {
  name: string;
  url?: string;
  onClick?: () => void;
}

export const StarredFileItem: React.FC<StarredFileItemProps> = ({
  name,
  url,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div
      className="starred-file-item"
      onClick={handleClick}
      role="link"
      tabIndex={0}
    >
      <div className="starred-file-item__bullet">
        <p className="starred-file-item__bullet-text">•</p>
      </div>
      <p className="starred-file-item__name">{name}</p>
    </div>
  );
};

export default StarredFileItem;

