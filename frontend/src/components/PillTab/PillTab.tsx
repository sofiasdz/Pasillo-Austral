import React from 'react';
import './PillTab.css';

export interface PillTabProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const PillTab: React.FC<PillTabProps> = ({
  label,
  active = false,
  onClick,
}) => {
  return (
    <button
      className={`pill-tab ${active ? 'pill-tab--active' : ''}`}
      onClick={onClick}
      type="button"
      role="tab"
      aria-selected={active}
    >
      {label}
    </button>
  );
};

export default PillTab;

