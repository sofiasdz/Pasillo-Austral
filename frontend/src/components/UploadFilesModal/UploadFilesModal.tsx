import React, { useState } from 'react';
import './UploadFilesModal.css';
import { UploadFile, type UploadedFile } from '../UploadFile/UploadFile';
import { Button } from '../Button/Button';
import closeIcon from '../../assets/close-icon.svg';

export interface UploadFilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: UploadedFile[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in MB
}

export const UploadFilesModal: React.FC<UploadFilesModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  maxFiles = 10,
  acceptedFileTypes = [],
  maxFileSize = 10,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  if (!isOpen) return null;

  const handleUpload = () => {
    if (uploadedFiles.length > 0) {
      onUpload(uploadedFiles);
      setUploadedFiles([]);
      onClose();
    }
  };

  const handleCancel = () => {
    setUploadedFiles([]);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  return (
    <div className="upload-files-modal__overlay" onClick={handleOverlayClick}>
      <div className="upload-files-modal" onClick={(e) => e.stopPropagation()}>
        <div className="upload-files-modal__header">
          <h2 className="upload-files-modal__title">Subir Archivos</h2>
          <button
            type="button"
            className="upload-files-modal__close"
            onClick={handleCancel}
            aria-label="Close"
          >
            <img src={closeIcon} alt="Close" />
          </button>
        </div>

        <div className="upload-files-modal__content">
          <UploadFile
            files={uploadedFiles}
            onFilesChange={setUploadedFiles}
            maxFiles={maxFiles}
            acceptedFileTypes={acceptedFileTypes}
            maxFileSize={maxFileSize}
          />
        </div>

        <div className="upload-files-modal__actions">
          <Button variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Subir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadFilesModal;

