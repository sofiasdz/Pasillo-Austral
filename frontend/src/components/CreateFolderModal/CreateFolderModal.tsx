import React, { useState } from 'react';
import './CreateFolderModal.css';
import { TextField } from '../TextField/TextField';
import { Button } from '../Button/Button';
import closeIcon from '../../assets/close-icon.svg';

export interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (folderName: string) => void;
}

export const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [folderName, setFolderName] = useState('');

  if (!isOpen) return null;

  const handleCreate = () => {
    if (folderName.trim()) {
      onCreate(folderName.trim());
      setFolderName('');
      onClose();
    }
  };

  const handleCancel = () => {
    setFolderName('');
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  return (
    <div className="create-folder-modal__overlay" onClick={handleOverlayClick}>
      <div className="create-folder-modal" onClick={(e) => e.stopPropagation()}>
        <div className="create-folder-modal__header">
          <h2 className="create-folder-modal__title">Nueva Carpeta</h2>
          <button
            type="button"
            className="create-folder-modal__close"
            onClick={handleCancel}
            aria-label="Close"
          >
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        <div className="create-folder-modal__content">
          <TextField
            placeholder="Nombre de la carpeta"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCreate();
              } else if (e.key === 'Escape') {
                handleCancel();
              }
            }}
            autoFocus
            multiline={false}
          />
        </div>

        <div className="create-folder-modal__actions">
          <Button variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Crear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderModal;

