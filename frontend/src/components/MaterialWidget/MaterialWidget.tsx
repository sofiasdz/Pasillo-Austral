import React from 'react';
import './MaterialWidget.css';
import folderIcon from '../../assets/folder-icon.svg';

export interface MaterialFolder {
  id: string;
  name: string;
  onClick?: () => void;
}

export interface MaterialWidgetProps {
  folders?: MaterialFolder[];
  onFolderClick?: (folder: MaterialFolder) => void;
  onSeeMore?: () => void;
}

export const MaterialWidget: React.FC<MaterialWidgetProps> = ({
  folders = [],
  onFolderClick,
  onSeeMore,
}) => {
  return (
    <div className="material-widget">
      <h3 className="material-widget__title">Material de Estudio</h3>
      <div className="material-widget__folders">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="material-widget__folder"
            onClick={() => {
              onFolderClick?.(folder);
              folder.onClick?.();
            }}
            role="button"
            tabIndex={0}
          >
            <img src={folderIcon} alt="" className="material-widget__folder-icon" />
            <p className="material-widget__folder-name">{folder.name}</p>
          </div>
        ))}
        {onSeeMore && (
          <div className="material-widget__see-more" onClick={onSeeMore} role="button" tabIndex={0}>
            <p className="material-widget__see-more-text">Ver mas</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialWidget;

