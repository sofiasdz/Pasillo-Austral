import React from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import './ToastContainer.css';

export type ToastVariant = 'success' | 'error';

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  if (toasts.length === 0) return null;

  const container = (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          variant={toast.variant}
          onClose={() => onClose(toast.id)}
        />
      ))}
    </div>
  );

  return createPortal(container, document.body);
};

export default ToastContainer;

