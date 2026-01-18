import React, { useState, useRef } from 'react';
import './AnswerBox.css';
import TextField from '../TextField';
import paperclipIcon from '../../assets/paperclip-icon.svg';
import fileTextIcon from '../../assets/file-text-icon.svg';
import closeGreyIcon from '../../assets/close-grey-icon.svg';

export interface AttachedFile {
  id: string;
  file: File;
  name: string;
}

export interface AnswerBoxProps {
  placeholder?: string;
  onCancel?: () => void;
  onPublish?: (text: string, files?: File[]) => void;
  cancelText?: string;
  publishText?: string;
}

export const AnswerBox: React.FC<AnswerBoxProps> = ({
  placeholder = 'Escribe tu respuesta....',
  onCancel,
  onPublish,
  cancelText = 'Cancelar',
  publishText = 'Publicar',
}) => {
  const [value, setValue] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILES = 5;

  const handleCancel = () => {
    setValue('');
    setAttachedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onCancel?.();
  };

  const handlePublish = () => {
    if (value.trim() || attachedFiles.length > 0) {
      const files = attachedFiles.map((f) => f.file);
      onPublish?.(value, files.length > 0 ? files : undefined);
      setValue('');
      setAttachedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const remainingSlots = MAX_FILES - attachedFiles.length;
      const filesToAdd = newFiles.slice(0, remainingSlots);

      const newAttachedFiles: AttachedFile[] = filesToAdd.map((file) => ({
        id: `${Date.now()}-${Math.random()}`,
        file,
        name: file.name,
      }));

      setAttachedFiles((prev) => [...prev, ...newAttachedFiles]);

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveFile = (fileId: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  return (
    <div className="answer-box">
      <div className="answer-box__field">
        <TextField
          multiline
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="answer-box__textarea"
        />
      </div>

      {attachedFiles.length > 0 && (
        <div className="answer-box__attached-files">
          {attachedFiles.map((attachedFile) => (
            <div key={attachedFile.id} className="answer-box__attached-file">
              <img
                src={fileTextIcon}
                alt=""
                className="answer-box__attached-file-icon"
              />
              <span className="answer-box__attached-file-name">
                {attachedFile.name}
              </span>
              <button
                type="button"
                className="answer-box__attached-file-remove"
                onClick={() => handleRemoveFile(attachedFile.id)}
                aria-label={`Remove ${attachedFile.name}`}
              >
                <img src={closeGreyIcon} alt="Remove" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="answer-box__bottom-row">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="answer-box__file-input"
          accept="*/*"
        />
        <button
          type="button"
          className="answer-box__attach-button"
          onClick={handleAttachClick}
          disabled={attachedFiles.length >= MAX_FILES}
          aria-label="Attach file"
        >
          <img src={paperclipIcon} alt="Attach" />
        </button>

        <div className="answer-box__actions">
          <button
            className="answer-box__cancel"
            onClick={handleCancel}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className="answer-box__publish"
            onClick={handlePublish}
            type="button"
            disabled={!value.trim() && attachedFiles.length === 0}
          >
            {publishText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerBox;

