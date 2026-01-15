import React, { useEffect, useState } from 'react';
import './Topic.css';
import { TopBar } from '../../components/TopBar/TopBar';
import { Sidebar } from '../../components/Sidebar/Sidebar';
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
import avatar1 from '../../assets/avatar1.png';
import topic1 from '../../assets/topic1.jpg';
import { useNavigate } from 'react-router-dom';
import plusIcon from '../../assets/plus-icon.svg';

const Topic: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Publicaciones' | 'Material de Estudio'>('Publicaciones');
  const [topic, setTopic] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [starredFiles, setStarredFiles] = useState<StarredFile[]>([]);

  const topicId = window.location.pathname.split('/').pop() || '1';
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:3001/topics/${topicId}`)
      .then((res) => res.json())
      .then((data) => {
        setTopic(data);
        if (!data || !data.title) {
          setPosts([]);
          return null;
        }
        return fetch(`http://localhost:3001/posts/topic/${encodeURIComponent(data.title)}`);
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
    fetch(`http://localhost:3001/materials/${topicId}`)
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
                ? `http://localhost:3001${file.path}`
                : `http://localhost:3001/uploads/materials/${topicId}/${folder.name}/${file}`
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
  const handleSearchPillClose = () => window.history.back();

  const topicImage = topic?.image
    ? (topic.image.startsWith('http') ? topic.image : `http://localhost:3001${topic.image}`)
    : topic1;

  const topicDescription = topic?.description || 'Aquí encontrarás recursos y publicaciones relacionadas con este tema.';

  return (
    <div className={`topic ${activeTab === 'Material de Estudio' ? 'topic--material-view' : ''}`}>
      <TopBar 
        username="@Khali_1998" 
        avatar={avatar1}
        searchPill={topic?.title || 'Cargando...'}
        onSearchPillClose={handleSearchPillClose}
        searchPlaceholder={topic ? `Busca en ${topic.title}` : ''}
      />

      <Sidebar activeItem={topic?.title || ''} />

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
              <FolderHeader label="Carpetas" buttonText="Nueva carpeta" onButtonClick={() => console.log('Create new folder')} />
              <div className="topic__folders-grid">
                {folders.map((folder: any, index: number) => (
                  <FolderIcon key={index} name={folder.name || folder} onClick={() => console.log(`Open folder: ${folder.name}`)} />
                ))}
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
                      downloadUrl={file.downloadUrl}
                      onDownload={() => console.log(`Download ${file.name}`)}
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
    </div>
  );
};

export default Topic;



