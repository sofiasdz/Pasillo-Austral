import React from 'react';
import './SidebarItem.css';

export interface SidebarItemProps {
  icon?: string;
  iconAlt?: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  iconAlt = '',
  children, 
  active = false,
  onClick 
}) => {
  return (
    <div 
      className={`sidebar-item ${active ? 'sidebar-item--active' : ''}`}
      onClick={onClick}
    >
      {icon && (
        <div className="sidebar-item__icon">
          <img src={icon} alt={iconAlt} className="sidebar-item__icon-img" />
        </div>
      )}
      <div className="sidebar-item__content">
        <div className="sidebar-item__text">{children}</div>
      </div>
    </div>
  );
};

export default SidebarItem;

