import React from 'react';
import './Toast.css';
import checkIcon from '../../assets/check-icon.svg';
import errorIcon from '../../assets/error-icon.svg';
import closeIcon from '../../assets/toast-close-icon.svg';

export type ToastVariant = 'success' | 'error';

export interface ToastProps {
  message: string;
  variant: ToastVariant;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, variant, onClose }) => {
  const icon = variant === 'success' ? checkIcon : errorIcon;

  return (
    <div className={`toast toast--${variant}`}>
      <div className="toast__icon">
        <img src={icon} alt={variant === 'success' ? 'Success' : 'Error'} className="toast__icon-img" />
      </div>
      <p className="toast__message">{message}</p>
      <button
        className="toast__close"
        onClick={onClose}
        type="button"
        aria-label="Close toast"
      >
        <img src={closeIcon} alt="Close" className="toast__close-icon" />
      </button>
    </div>
  );
};

export default Toast;

