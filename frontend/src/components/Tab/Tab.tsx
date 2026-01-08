import React from 'react';
import './Tab.css';

export interface TabProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const Tab: React.FC<TabProps> = ({ 
  label, 
  active = false,
  onClick 
}) => {
  return (
    <div 
      className={`tab ${active ? 'tab--active' : ''}`}
      onClick={onClick}
      role="tab"
      aria-selected={active}
    >
      {label}
    </div>
  );
};

export default Tab;

