import React from 'react';
import './Sidebar.css';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import homeIcon from '../../assets/home-icon.svg';
import starIcon from '../../assets/star-icon.svg';
import messageIcon from '../../assets/message-icon.svg';
import mathIcon from '../../assets/math-icon.svg';
import formulaIcon from '../../assets/formula-icon.svg';
import programmingIcon from '../../assets/programming-icon.svg';
import physicsIcon from '../../assets/physics-icon.svg';
import chemistryIcon from '../../assets/chemistry-icon.svg';

export interface SidebarProps {
  activeItem?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeItem = 'Home' }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__content">
        <div className="sidebar__nav">
          <div className="sidebar__nav-items">
            <SidebarItem icon={homeIcon} active={activeItem === 'Home'}>
              Home
            </SidebarItem>
            <SidebarItem icon={starIcon} active={activeItem === 'Favoritos'}>
              Favoritos
            </SidebarItem>
          </div>
        </div>

        <div className="sidebar__section">
          <div className="sidebar__section-title">TEMAS</div>
          <div className="sidebar__section-items">
            <SidebarItem icon={messageIcon}>General</SidebarItem>
            <SidebarItem icon={mathIcon}>Algebra I</SidebarItem>
            <SidebarItem icon={formulaIcon}>Análisis Matemático I</SidebarItem>
            <SidebarItem icon={programmingIcon}>Programación I</SidebarItem>
            <SidebarItem icon={physicsIcon}>Física I</SidebarItem>
            <SidebarItem icon={chemistryIcon}>Química</SidebarItem>
          </div>
          <div className="sidebar__section-footer">
            Ver todo
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

