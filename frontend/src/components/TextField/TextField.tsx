import React, { useState } from 'react';
import './TextField.css';
import asteriskIcon from '../../assets/asterisk.svg';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
}

export const TextField: React.FC<TextFieldProps> = ({ 
  label, 
  required = false, 
  error,
  id,
  className = '',
  value,
  ...props 
}) => {
  const inputId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.toString().length > 0;
  const showLabel = !hasValue && !isFocused;
  
  return (
    <div className={`text-field ${className}`}>
      <div className="text-field__container">
        {showLabel && (
          <div className="text-field__label-container">
            <span className="text-field__label-text">{label}</span>
            {required && (
              <img 
                src={asteriskIcon} 
                alt="required" 
                className="text-field__required-icon"
                aria-label="required"
              />
            )}
          </div>
        )}
        <input
          id={inputId}
          className={`text-field__input ${error ? 'text-field__input--error' : ''}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          {...props}
        />
      </div>
      {error && <span className="text-field__error">{error}</span>}
    </div>
  );
};

export default TextField;

