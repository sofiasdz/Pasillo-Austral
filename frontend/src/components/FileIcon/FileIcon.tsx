import React from 'react';
import './FileIcon.css';
import downloadIcon from '../../assets/download-icon.svg';
import filePdf from '../../assets/file-pdf.svg';
import filePng from '../../assets/file-png.svg';
import fileDocx from '../../assets/file-docx.svg';
import fileXlsx from '../../assets/file-xlsx.svg';
import fileTxt from '../../assets/file-txt.svg';
import fileZip from '../../assets/file-zip.svg';
import fileAi from '../../assets/file-ai.svg';

export interface FileIconProps {
  name: string;
  fileType?: 'pdf' | 'docx' | 'xlsx' | 'txt' | 'png' | 'zip' | 'ai';
  downloadUrl?: string;
  onDownload?: () => void;
  onClick?: () => void;
}

const getFileIcon = (fileType?: string): string => {
  switch (fileType) {
    case 'pdf':
      return filePdf;
    case 'png':
      return filePng;
    case 'docx':
      return fileDocx;
    case 'xlsx':
      return fileXlsx;
    case 'txt':
      return fileTxt;
    case 'zip':
      return fileZip;
    case 'ai':
      return fileAi;
    default:
      return filePdf; // Default to PDF icon
  }
};

export const FileIcon: React.FC<FileIconProps> = ({
  name,
  fileType,
  downloadUrl,
  onDownload,
  onClick,
}) => {
  // Extract file type from filename if not provided
  const getFileTypeFromName = (filename: string): string | undefined => {
    const extension = filename.split('.').pop()?.toLowerCase();
    if (['pdf', 'docx', 'xlsx', 'txt', 'png', 'zip', 'ai'].includes(extension || '')) {
      return extension as FileIconProps['fileType'];
    }
    return undefined;
  };

  const resolvedFileType = fileType || getFileTypeFromName(name);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDownload) {
      onDownload();
    } else if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  return (
    <div
      className="file-icon"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <img src={getFileIcon(resolvedFileType)} alt="" className="file-icon__icon" />
      <div className="file-icon__content">
        <p className="file-icon__name">{name}</p>
      </div>
      <button
        className="file-icon__download"
        onClick={handleDownload}
        type="button"
        aria-label={`Download ${name}`}
      >
        <img src={downloadIcon} alt="" className="file-icon__download-icon" />
      </button>
    </div>
  );
};

export default FileIcon;

