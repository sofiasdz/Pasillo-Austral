import React from 'react';
import './Filter.css';
import chevronDown from '../../assets/chevron-down.svg';

export interface FilterProps {
  label: string;
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
}

export const Filter: React.FC<FilterProps> = ({ 
  label, 
  options = [],
  value,
  onChange 
}) => {
  return (
    <div className="filter">
      <div className="filter__content">
        <div className="filter__label">{label}</div>
        <div className="filter__chevron">
          <img src={chevronDown} alt="" className="filter__chevron-icon" />
        </div>
      </div>
    </div>
  );
};

export default Filter;

