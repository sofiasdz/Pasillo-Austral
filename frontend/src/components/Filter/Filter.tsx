import React, { useState, useRef, useEffect } from 'react';
import './Filter.css';
import chevronDown from '../../assets/chevron-down.svg';
import circleFilledIcon from '../../assets/circle-filled-icon.svg';
import circleEmptyIcon from '../../assets/circle-empty-icon.svg';

export interface FilterProps {
  label: string;
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
}

const defaultOptions = ['Popular', 'Nuevos', 'Viejos', 'Mas recientes'];

export const Filter: React.FC<FilterProps> = ({ 
  label, 
  options = defaultOptions,
  value,
  onChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(value || label);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className="filter" ref={filterRef}>
      <div className="filter__content" onClick={handleToggle}>
        <div className="filter__label">{selectedValue}</div>
        <div className={`filter__chevron ${isOpen ? 'filter__chevron--open' : ''}`}>
          <img src={chevronDown} alt="" className="filter__chevron-icon" />
        </div>
      </div>
      {isOpen && (
        <div className="filter__menu">
          {options.map((option, index) => {
            const isSelected = option === selectedValue;
            const isFirst = index === 0;
            const isLast = index === options.length - 1;
            
            return (
              <button
                key={option}
                className={`filter__menu-item ${isFirst ? 'filter__menu-item--first' : ''} ${isLast ? 'filter__menu-item--last' : ''}`}
                onClick={() => handleSelect(option)}
                type="button"
              >
                <img
                  src={isSelected ? circleFilledIcon : circleEmptyIcon}
                  alt=""
                  className="filter__menu-icon"
                />
                <span className="filter__menu-label">{option}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Filter;
