import React, { useState, useRef } from 'react';
import './UploadFile.css';

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
}

export interface UploadFileProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in MB
}

export const UploadFile: React.FC<UploadFileProps> = ({
  files,
  onFilesChange,
  maxFiles = 10,
  acceptedFileTypes = [],
  maxFileSize = 10,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  };

  const processFiles = (newFiles: File[]) => {
    const validFiles: UploadedFile[] = [];

    newFiles.forEach((file) => {
      // Check file count limit
      if (files.length + validFiles.length >= maxFiles) {
        return;
      }

      // Check file type
      if (
        acceptedFileTypes.length > 0 &&
        !acceptedFileTypes.includes(file.type)
      ) {
        return;
      }

      // Check file size (convert MB to bytes)
      if (file.size > maxFileSize * 1024 * 1024) {
        return;
      }

      validFiles.push({
        id: `${Date.now()}-${Math.random()}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
      });
    });

    if (validFiles.length > 0) {
      onFilesChange([...files, ...validFiles]);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (fileId: string) => {
    onFilesChange(files.filter((f) => f.id !== fileId));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="upload-file">
      <div
        className={`upload-file__dropzone ${isDragging ? 'upload-file__dropzone--dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFileTypes.join(',')}
          onChange={handleFileInputChange}
          className="upload-file__input"
        />
        <div className="upload-file__content">
          <div className="upload-file__icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 32V16M24 16L18 22M24 16L30 22"
                stroke="#497fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 36H40C41.1046 36 42 35.1046 42 34V14C42 12.8954 41.1046 12 40 12H8C6.89543 12 6 12.8954 6 14V34C6 35.1046 6.89543 36 8 36Z"
                stroke="#497fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="upload-file__text">
            Arrastra y suelta archivos aquí o haz clic para seleccionar
          </p>
          <p className="upload-file__hint">
            Máximo {maxFiles} archivos. Tamaño máximo por archivo: {maxFileSize}MB
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="upload-file__list">
          {files.map((uploadedFile) => (
            <div key={uploadedFile.id} className="upload-file__item">
              <div className="upload-file__item-info">
                <div className="upload-file__item-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                      stroke="#575757"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 2V8H20"
                      stroke="#575757"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="upload-file__item-details">
                  <p className="upload-file__item-name">{uploadedFile.name}</p>
                  <p className="upload-file__item-size">
                    {formatFileSize(uploadedFile.size)}
                  </p>
                </div>
              </div>
              <button
                className="upload-file__remove"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(uploadedFile.id);
                }}
                type="button"
                aria-label={`Remove ${uploadedFile.name}`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="#575757"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadFile;

