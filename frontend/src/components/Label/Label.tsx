import React from 'react';
import './Label.css';

export interface LabelProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary';
  className?: string;
}

export const Label: React.FC<LabelProps> = ({ 
  children, 
  variant = 'default',
  className = '' 
}) => {
  return (
    <div className={`label label--${variant} ${className}`}>
      {children}
    </div>
  );
};

export default Label;

