import React, { useState } from 'react';
import './AnswerBox.css';
import TextField from '../TextField';

export interface AnswerBoxProps {
  placeholder?: string;
  onCancel?: () => void;
  onPublish?: (text: string) => void;
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

  const handleCancel = () => {
    setValue('');
    onCancel?.();
  };

  const handlePublish = () => {
    if (value.trim()) {
      onPublish?.(value);
      setValue('');
    }
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
          disabled={!value.trim()}
        >
          {publishText}
        </button>
      </div>
    </div>
  );
};

export default AnswerBox;

