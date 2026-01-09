import React from 'react';
import './StarredFilesWidget.css';
import starIcon from '../../assets/star-rounded-icon.svg';
import { StarredFileItem } from '../StarredFileItem/StarredFileItem';

export interface StarredFile {
  id: string;
  name: string;
  url?: string;
}

export interface StarredFilesWidgetProps {
  files: StarredFile[];
}

export const StarredFilesWidget: React.FC<StarredFilesWidgetProps> = ({
  files = [],
}) => {
  return (
    <div className="starred-files-widget">
      <div className="starred-files-widget__header">
        <img src={starIcon} alt="" className="starred-files-widget__icon" />
        <p className="starred-files-widget__title">Destacados</p>
      </div>
      <div className="starred-files-widget__content">
        {files.map((file) => (
          <StarredFileItem key={file.id} name={file.name} url={file.url} />
        ))}
        {files.length === 0 && (
          <p className="starred-files-widget__empty">No hay archivos destacados</p>
        )}
      </div>
    </div>
  );
};

export default StarredFilesWidget;

