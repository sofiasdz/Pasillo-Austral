import React, { useState, useRef, useEffect } from 'react';
import './LabelSelector.css';
import closeRoundedIcon from '../../assets/close-rounded-icon.svg';

export interface LabelSelectorProps {
  selectedLabels: string[];
  availableLabels?: string[];
  maxLabels?: number;
  placeholder?: string;
  onChange: (labels: string[]) => void;
}

export const LabelSelector: React.FC<LabelSelectorProps> = ({
  selectedLabels,
  availableLabels = [],
  maxLabels = 10,
  placeholder = 'Agregar Etiquetas',
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRemoveLabel = (labelToRemove: string) => {
    onChange(selectedLabels.filter((label) => label !== labelToRemove));
  };

  const handleAddLabel = (label: string) => {
    const trimmedLabel = label.trim();
    if (
      trimmedLabel &&
      !selectedLabels.includes(trimmedLabel) &&
      selectedLabels.length < maxLabels
    ) {
      onChange([...selectedLabels, trimmedLabel]);
      setInputValue('');
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddLabel(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && selectedLabels.length > 0) {
      handleRemoveLabel(selectedLabels[selectedLabels.length - 1]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(e.target.value.length > 0);
  };

  const filteredAvailableLabels = availableLabels.filter(
    (label) =>
      label.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedLabels.includes(label)
  );

  const getLabelOpacity = (index: number) => {
    return index === 0 ? 0.5 : 0.32;
  };

  return (
    <div className="label-selector" ref={containerRef}>
      <div className="label-selector__container">
        <div className="label-selector__selected-labels">
          {selectedLabels.map((label, index) => (
            <div
              key={label}
              className="label-selector__label"
              style={{
                backgroundColor: `rgba(226, 232, 241, ${getLabelOpacity(index)})`,
              }}
            >
              <span className="label-selector__label-text">{label}</span>
              <button
                className="label-selector__remove"
                onClick={() => handleRemoveLabel(label)}
                type="button"
                aria-label={`Remove ${label}`}
              >
                <img src={closeRoundedIcon} alt="" className="label-selector__remove-icon" />
              </button>
            </div>
          ))}
          <input
            ref={inputRef}
            className="label-selector__input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onFocus={() => setIsOpen(inputValue.length > 0)}
            placeholder={selectedLabels.length === 0 ? placeholder : ''}
            disabled={selectedLabels.length >= maxLabels}
          />
        </div>
      </div>

      {isOpen && filteredAvailableLabels.length > 0 && (
        <div className="label-selector__dropdown">
          {filteredAvailableLabels.slice(0, 5).map((label) => (
            <button
              key={label}
              className="label-selector__option"
              onClick={() => handleAddLabel(label)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="label-selector__count">
        {selectedLabels.length}/{maxLabels} Etiquetas
      </div>
    </div>
  );
};

export default LabelSelector;

