import React, { useEffect, useState } from 'react';
import './Topic.css';
import { Header } from '../../components/Header/Header';
import { Tab } from '../../components/Tab/Tab';
import { Filter } from '../../components/Filter/Filter';
import { TopicInfoCard } from '../../components/TopicInfoCard/TopicInfoCard';
import { PostCard } from '../../components/PostCard/PostCard';
import { FolderHeader } from '../../components/FolderHeader/FolderHeader';
import { FolderIcon } from '../../components/FolderIcon/FolderIcon';
import { FileIcon } from '../../components/FileIcon/FileIcon';
import { FilesHeader } from '../../components/FilesHeader/FilesHeader';
import { StarredFilesWidget, type StarredFile } from '../../components/StarredFilesWidget/StarredFilesWidget';
import { CreateFolderModal } from '../../components/CreateFolderModal/CreateFolderModal';
import avatar1 from '../../assets/avatar1.png';
import { useNavigate } from 'react-router-dom';
import plusIcon from '../../assets/plus-icon.svg';
import { useToast } from '../../hooks/useToast';

import topic1 from '../../assets/topic1.jpg';
import topic2 from '../../assets/topic2.jpg';
import topic3 from '../../assets/topic3.jpg';
import topic4 from '../../assets/topic4.jpg';
import topic5 from '../../assets/topic5.jpg';
import topic6 from '../../assets/topic6.jpg';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const Topic: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Publicaciones' | 'Material de Estudio'>('Publicaciones');
  const [topic, setTopic] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [starredFiles, setStarredFiles] = useState<StarredFile[]>([]);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleSuccess = () => {
    showSuccess('¡Carpeta creada con éxito!');
  };

  const handleError = () => {
    showError('Hubo un error al crear carpeta');
  };

  const topicId = window.location.pathname.split('/').pop() || '1';
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    fetch(`${API_URL}/topics/${topicId}`)
      .then((res) => res.json())
      .then((data) => {
        setTopic(data);
        if (!data || !data.title) {
          setPosts([]);
          return null;
        }
        return fetch(`${API_URL}/posts/topic/${encodeURIComponent(data.title)}`);
      })
      .then((res) => (res ? res.json() : []))
      .then((data) => {
        setPosts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching topic or posts:', err);
        setLoading(false);
      });

    // Material de estudio
    fetch(`${API_URL}/materials/${topicId}`)
      .then((res) => res.json())
      .then((data) => {
        setFolders(data.folders || []);

        const allFiles =
          data.folders?.flatMap((folder: any) =>
            folder.files.map((file: any) => ({
              id: `${folder.name}-${file.name || file}`,
              name: file.name || file,
              fileType: (file.name || file).split('.').pop(),
              downloadUrl: file.path
                ? `${API_URL}${file.path}`
                : `${API_URL}/uploads/materials/${topicId}/${folder.name}/${file}`
            }))
          ) || [];

        setFiles(allFiles);

        setStarredFiles(
          data.starredFiles?.map((f: any) => ({
            id: f.id,
            name: f.name,
            downloadUrl: f.downloadUrl
          })) || []
        );
      })
      .catch((err) => {
        console.error('Error cargando material de estudio:', err);
        setFolders([]);
        setFiles([]);
        setStarredFiles([]);
      });
  }, [topicId]);

  const handleBack = () => window.history.back();
  //const handleSearchPillClose = () => window.history.back();
  const topicImages: Record<string, string> = {
    "1": topic1,
    "2": topic2,
    "3": topic3,
    "4": topic4,
    "5": topic5,
    "6": topic6,
  };
  
  const topicImage =
    topic?.image && topic.image.startsWith("/")
      ? `${API_URL}${topic.image}`
      : topic?.image ||
        topicImages[topicId] ||
        topic1;
  

  const topicDescription = topic?.description || 'Aquí encontrarás recursos y publicaciones relacionadas con este tema.';

  return (
    <div className={`topic ${activeTab === 'Material de Estudio' ? 'topic--material-view' : ''}`}>
      <div className="topic__content">
        <div className="topic__header-wrapper">
          <Header title={topic?.title || 'Cargando...'} onBack={handleBack} />
        </div>

        <div className="topic__header">
          <div className="topic__tabs">
            <Tab label="Publicaciones" active={activeTab === 'Publicaciones'} onClick={() => setActiveTab('Publicaciones')} />
            <Tab label="Material de Estudio" active={activeTab === 'Material de Estudio'} onClick={() => setActiveTab('Material de Estudio')} />
          </div>
          {activeTab === 'Publicaciones' && (
          <button onClick={() => navigate('/create-post')} className="topic__new-post-button">
            <img src={plusIcon} alt="" className="home__new-post-icon" />
            <span className="home__new-post-text">Nueva Publicación</span>
          </button>
          )}
        </div>
          

        {activeTab === 'Publicaciones' && (
          <>
            <div className="topic__filters">
              <div className="topic__filter-wrapper"><Filter label="Popular" /></div>
            </div>

            <div className="topic__main">
              <div className="topic__posts">
                {loading && <p>Cargando publicaciones...</p>}
                {!loading && posts.length === 0 && <p style={{ opacity: 0.6 }}>Todavía no hay publicaciones 👀</p>}
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}  // 👈 AHORA SI!
                    topic={topic?.title}
                    userAvatar={post.userAvatar || avatar1}
                    username={post.userUsername}
                    date={new Date(post.createdAt).toLocaleString()}
                    title={post.title}
                    content={post.content}
                    tags={post.tags || []}
                    showMoreLink={true}
                    className="post-card"

                  />
                ))}
              </div>

              <div className="topic__info-card">
                <TopicInfoCard image={topicImage} name={topic?.title} description={topicDescription} />
              </div>
            </div>
          </>
        )}

        {activeTab === 'Material de Estudio' && (
          <>
            <div className="topic__material-section">
              <FolderHeader 
                label="Carpetas" 
                buttonText="Nueva carpeta" 
                onButtonClick={() => setIsCreateFolderModalOpen(true)} 
              />
              <div className="topic__folders-grid">
                {folders.map((folder: any, index: number) => {
                  const folderFiles = folder.files?.map((file: any) => ({
                    id: `${folder.name}-${file.name || file}`,
                    name: file.name || file,
                    fileType: (file.name || file).split('.').pop(),
                    downloadUrl: file.path
                      ? `${API_URL}${file.path}`
                      : `${API_URL}/uploads/materials/${topicId}/${folder.name}/${file}`
                  })) || [];

                  return (
                    <FolderIcon
                      key={index}
                      name={folder.name || folder}
                      onClick={() => {
                        navigate(`/topic/${topicId}/folder/${encodeURIComponent(folder.name || folder)}`, {
                          state: {
                            folderName: folder.name || folder,
                            files: folderFiles,
                            topicTitle: topic?.title || ''
                          }
                        });
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="topic__files-section-wrapper">
              <div className="topic__filter-wrapper topic__filter-wrapper--material"><Filter label="Popular" /></div>
              <FilesHeader topicName={topic?.title || 'Algebra'} />
            </div>

            <div className="topic__main">
              <div className="topic__files-list-container">
                <div className="topic__files-list">
                  {files.map((file) => (
                    <FileIcon
                      key={file.id}
                      name={file.name}
                      fileType={file.fileType}
                     
                    />
                  ))}
                </div>
              </div>

              <div className="topic__info-card topic__info-card--material">
                <StarredFilesWidget files={starredFiles} />
              </div>
            </div>
          </>
        )}
      </div>
      <CreateFolderModal
  isOpen={isCreateFolderModalOpen}
  onClose={() => setIsCreateFolderModalOpen(false)}
  onCreate={async (folderName) => {
    console.log('Creating folder:', folderName);

    try {
      const res = await fetch(`${API_URL}/materials/${topicId}/folders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderName }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || "Error creando carpeta");
        handleError();
        return;
      }

      // Carpeta creada OK → refrescar estado local
      const updated = await fetch(`${API_URL}/materials/${topicId}`).then((r) => r.json());
      setFolders(updated.folders || []);
      handleSuccess();

      setIsCreateFolderModalOpen(false);
    } catch (err) {
      console.error("Error creando carpeta:", err);
      handleError();
    }
  }}
/>

    
    </div>
  );
};

export default Topic;



