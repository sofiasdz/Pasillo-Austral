import React from 'react';
import './TextField.css';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
  multiline?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  rows?: number;
}

export const TextField: React.FC<TextFieldProps> = ({ 
  label,
  required = false, 
  error,
  id,
  className = '',
  value,
  multiline = false,
  maxLength,
  showCharCount = false,
  rows = 4,
  onChange,
  ...props 
}) => {
  const inputId = id || `field-${label?.toLowerCase().replace(/\s+/g, '-') || 'input'}`;
  const currentValue = value?.toString() || '';
  const charCount = currentValue.length;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (maxLength && e.target.value.length > maxLength) {
      return;
    }
    if (onChange) {
      onChange(e as React.ChangeEvent<HTMLInputElement>);
    }
  };

  if (multiline) {
    return (
      <div className={`text-field text-field--multiline ${className}`}>
        {label && (
          <label htmlFor={inputId} className="text-field__label">
            {label}
            {required && <span className="text-field__required">*</span>}
          </label>
        )}
        <div className="text-field__container">
          <textarea
            id={inputId}
            className={`text-field__input text-field__textarea ${error ? 'text-field__input--error' : ''}`}
            value={value}
            onChange={handleChange}
            rows={rows}
            maxLength={maxLength}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        </div>
        {showCharCount && maxLength && (
          <div className="text-field__char-count">
            {charCount}/{maxLength} caracteres
          </div>
        )}
        {error && <span className="text-field__error">{error}</span>}
      </div>
    );
  }

  return (
    <div className={`text-field ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-field__label">
          {label}
          {required && <span className="text-field__required">*</span>}
        </label>
      )}
      <div className="text-field__container">
        <input
          id={inputId}
          className={`text-field__input ${error ? 'text-field__input--error' : ''}`}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />
      </div>
      {showCharCount && maxLength && (
        <div className="text-field__char-count">
          {charCount}/{maxLength} caracteres
        </div>
      )}
      {error && <span className="text-field__error">{error}</span>}
    </div>
  );
};

export default TextField;
