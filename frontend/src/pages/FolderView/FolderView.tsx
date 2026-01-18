import React, { useEffect, useState } from 'react';
import './FolderView.css';
import { TopBar } from '../../components/TopBar/TopBar';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { FileIcon } from '../../components/FileIcon/FileIcon';
import { StarredFilesWidget, type StarredFile } from '../../components/StarredFilesWidget/StarredFilesWidget';
import { Button } from '../../components/Button/Button';
import { UploadFilesModal, type UploadedFile } from '../../components/UploadFilesModal/UploadFilesModal';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import avatar1 from '../../assets/avatar1.png';
import plusBlueIcon from '../../assets/plus-blue-icon.svg';

interface FileData {
  id: string;
  name: string;
  fileType?: string;
  downloadUrl?: string;
}

interface FolderViewLocationState {
  folderName: string;
  files: FileData[];
  topicTitle?: string;
}

const FolderView: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as FolderViewLocationState | null;

  const [folderName, setFolderName] = useState<string>(state?.folderName || '');
  const [files, setFiles] = useState<FileData[]>(state?.files || []);
  const [topicTitle, setTopicTitle] = useState<string>(state?.topicTitle || '');
  const [starredFiles, setStarredFiles] = useState<StarredFile[]>([]);
  const [isUploadFilesModalOpen, setIsUploadFilesModalOpen] = useState(false);

  useEffect(() => {
    // If no state passed, fetch from API using URL params
    if (!state && topicId) {
      fetch(`http://localhost:3001/materials/${topicId}`)
        .then((res) => res.json())
        .then((data) => {
          const folderNameFromUrl = decodeURIComponent(window.location.pathname.split('/').pop() || '');
          const folder = data.folders?.find((f: any) => f.name === folderNameFromUrl);
          
          if (folder) {
            setFolderName(folder.name);
            setFiles(
              folder.files.map((file: any) => ({
                id: `${folder.name}-${file.name || file}`,
                name: file.name || file,
                fileType: (file.name || file).split('.').pop(),
                downloadUrl: file.path
                  ? `http://localhost:3001${file.path}`
                  : `http://localhost:3001/uploads/materials/${topicId}/${folder.name}/${file}`
              }))
            );
          }

          // Get topic title
          fetch(`http://localhost:3001/topics/${topicId}`)
            .then((res) => res.json())
            .then((topicData) => {
              setTopicTitle(topicData.title || '');
            })
            .catch((err) => console.error('Error fetching topic:', err));

          setStarredFiles(
            data.starredFiles?.map((f: any) => ({
              id: f.id,
              name: f.name,
              downloadUrl: f.downloadUrl
            })) || []
          );
        })
        .catch((err) => {
          console.error('Error cargando folder:', err);
        });
    } else if (state) {
      setFolderName(state.folderName);
      setFiles(state.files);
      setTopicTitle(state.topicTitle || '');
    }
  }, [topicId, state]);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleNewFile = () => {
    setIsUploadFilesModalOpen(true);
  };

  const handleUploadFiles = async (uploadedFiles: UploadedFile[]) => {
    if (!topicId || !folderName || uploadedFiles.length === 0) return;

    try {
      const formData = new FormData();
      uploadedFiles.forEach((file) => formData.append("files", file.file));

      const res = await fetch(
        `http://localhost:3001/materials/${topicId}/folders/${folderName}/files/multiple`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Error subiendo archivos");
      }

      const data = await res.json();

      // Merge nuevos archivos con los actuales
      const newFiles = data.folder.files.map((f: any) => ({
        id: `${folderName}-${f.name}`,
        name: f.name,
        fileType: f.name.split(".").pop(),
        downloadUrl: `http://localhost:3001${f.path}`,
      }));

      setFiles(newFiles);
      setIsUploadFilesModalOpen(false);
    } catch (err) {
      console.error("Error al subir archivos:", err);
      alert("Hubo un error al subir archivos");
    }
  };


  return (
    <div className="folder-view">
      <TopBar
        username="@Khali_1998"
        avatar={avatar1}
        searchPill={topicTitle || 'Cargando...'}
        onSearchPillClose={() => navigate(`/topic/${topicId}`)}
        searchPlaceholder={topicTitle ? `Busca en ${topicTitle}` : ''}
      />

      <Sidebar activeItem={topicTitle || ''} />

      <div className="folder-view__content">
        <div className="folder-view__header-wrapper">
          <Header title={folderName || 'Cargando...'} onBack={handleBack} />
        </div>

        <div className="folder-view__actions">
          <button
            type="button"
            className="folder-view__new-file-button"
            onClick={handleNewFile}
          >
            <img src={plusBlueIcon} alt="" className="folder-view__new-file-icon" />
            <span className="folder-view__new-file-text">Nuevo archivo</span>
          </button>
        </div>

        <div className="folder-view__main">
          <div className="folder-view__files-list-container">
            <div className="folder-view__files-list">
              {files.map((file) => (
                <FileIcon
                  key={file.id}
                  name={file.name}
                  fileType={file.fileType as any}
                />
              ))}
              {files.length === 0 && (
                <p style={{ opacity: 0.6, padding: '24px' }}>
                  Esta carpeta está vacía
                </p>
              )}
            </div>
          </div>

          <div className="folder-view__info-card">
            <StarredFilesWidget files={starredFiles} />
          </div>
        </div>
      </div>

      <UploadFilesModal
        isOpen={isUploadFilesModalOpen}
        onClose={() => setIsUploadFilesModalOpen(false)}
        onUpload={handleUploadFiles}
        maxFiles={10}
        acceptedFileTypes={['image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/plain', 'application/zip', 'application/postscript']}
        maxFileSize={10}
      />
    </div>
  );
};

export default FolderView;

