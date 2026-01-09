import React from 'react';
import './FilesHeader.css';

export interface FilesHeaderProps {
  topicName?: string;
}

export const FilesHeader: React.FC<FilesHeaderProps> = ({
  topicName = 'Algebra',
}) => {
  return (
    <div className="files-header">
      <p className="files-header__text">
        Archivos mas descargados de <span className="files-header__topic-name">{topicName}</span>
      </p>
    </div>
  );
};

export default FilesHeader;

