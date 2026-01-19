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
import { Link, useLocation } from "react-router-dom";

export const Sidebar: React.FC = () => {
  const { pathname } = useLocation();

  const isActive = (segment: string) => {
    // para / exacta
    if (segment === "/" && pathname === "/") return true;
    return pathname.startsWith(segment);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__content">
        
        {/* NAV PRINCIPAL */}
        <div className="sidebar__nav">
          <div className="sidebar__nav-items">

            <Link to="/" style={{ textDecoration: 'none' }}>
              <SidebarItem icon={homeIcon} active={isActive("/")}>
                Home
              </SidebarItem>
            </Link>

            <Link to="/favorites" style={{ textDecoration: 'none' }}>
              <SidebarItem icon={starIcon} active={isActive("/favorites")}>
                Favoritos
              </SidebarItem>
            </Link>

          </div>
        </div>

        {/* TEMAS */}
        <div className="sidebar__section">
          <div className="sidebar__section-title">TEMAS</div>
          <div className="sidebar__section-items">

            <Link to="/topic/5" style={{ textDecoration: 'none' }}>
              <SidebarItem icon={messageIcon} active={isActive("/topic/5")}>
                General
              </SidebarItem>
            </Link>

            <Link to="/topic/3" style={{ textDecoration: 'none' }}>
              <SidebarItem icon={mathIcon} active={isActive("/topic/3")}>
                Álgebra I
              </SidebarItem>
            </Link>

            <Link to="/topic/1" style={{ textDecoration: 'none' }}>
              <SidebarItem icon={formulaIcon} active={isActive("/topic/1")}>
                Análisis Matemático I
              </SidebarItem>
            </Link>

            <Link to="/topic/2" style={{ textDecoration: 'none' }}>
              <SidebarItem icon={programmingIcon} active={isActive("/topic/2")}>
                Programación I
              </SidebarItem>
            </Link>

            <Link to="/topic/6" style={{ textDecoration: 'none' }}>
              <SidebarItem icon={physicsIcon} active={isActive("/topic/6")}>
                Física I
              </SidebarItem>
            </Link>

            <Link to="/topic/4" style={{ textDecoration: 'none' }}>
              <SidebarItem icon={chemistryIcon} active={isActive("/topic/4")}>
                Química
              </SidebarItem>
            </Link>

          </div>

          <div className="sidebar__section-footer">
            <Link to="/topics" className="sidebar__footer-link">
              Ver todo
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sidebar;


