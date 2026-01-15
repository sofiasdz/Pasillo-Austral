import React, { useState, useEffect } from 'react';
import './SearchResults.css';
import { TopBar } from '../../components/TopBar/TopBar';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { PillTab } from '../../components/PillTab/PillTab';
import { Filter } from '../../components/Filter/Filter';
import { PostCard } from '../../components/PostCard/PostCard';
import { TopicCard } from '../../components/TopicCard/TopicCard';
import { FileIcon } from '../../components/FileIcon/FileIcon';
import { SearchResultComment } from '../../components/SearchResultComment/SearchResultComment';
import avatar1 from '../../assets/avatar1.png';
import topic1 from '../../assets/topic1.jpg';
import topic2 from '../../assets/topic2.jpg';
import topic3 from '../../assets/topic3.jpg';
import topic4 from '../../assets/topic4.jpg';
import topic5 from '../../assets/topic5.jpg';
import topic6 from '../../assets/topic6.jpg';
import { useNavigate, useSearchParams } from 'react-router-dom';

const fallbackImages = [topic1, topic2, topic3, topic4, topic5, topic6];

type TabType = 'Publicaciones' | 'Temas' | 'Material de Estudio' | 'Comentarios';

const SearchResults: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Publicaciones');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const navigate = useNavigate();

  const [posts, setPosts] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleBack = () => window.history.back();

  const handleTabChange = (tab: TabType) => setActiveTab(tab);

  useEffect(() => {
    if (!searchQuery) return;

    setLoading(true);

    fetch(`http://localhost:3001/search?q=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);

        const mappedTopics = (data.topics || []).map((t: any, index: number) => ({
          ...t,
          image: t.image
            ? `/assets/${t.image}`
            : fallbackImages[index % fallbackImages.length],
        }));
        setTopics(mappedTopics);

        // 🔥 APLANAR MATERIALES
        const flattened = (data.materials || []).flatMap((topic: any) =>
          topic.folders.flatMap((folder: any) =>
            folder.files.map((file: any) => ({
              topicId: topic.topicId,
              folder: folder.name,
              name: file.name,
              fileType: file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : 'file',
              downloadUrl: file.url,
            }))
          )
        );

        setFiles(flattened);

        setComments(data.comments || []);
      })
      .catch((err) => console.error('Error fetching search results:', err))
      .finally(() => setLoading(false));
  }, [searchQuery]);

  const goToTopic = (id: number | string) => navigate(`/topic/${id}`);

  return (
    <div className="search-results">
      <TopBar 
        username="@Khali_1998" 
        avatar={avatar1}
        searchQuery={searchQuery}
        searchPlaceholder="Buscar"
      />

      <Sidebar activeItem="Home" />

      <div className="search-results__content">
        <div className="search-results__header-wrapper">
          <Header title="Resultados de búsqueda" onBack={handleBack} />
        </div>

        <div className="search-results__tabs-wrapper">
          <div className="search-results__tabs">
            {['Publicaciones', 'Temas', 'Material de Estudio', 'Comentarios'].map((tab) => (
              <PillTab
                key={tab}
                label={tab}
                active={activeTab === tab}
                onClick={() => handleTabChange(tab as TabType)}
              />
            ))}
          </div>
        </div>

        <div className="search-results__filter-wrapper">
          <Filter label="Popular" />
        </div>

        {loading && (
          <div style={{ padding: 16 }}>Buscando "{searchQuery}"...</div>
        )}

        {!loading && (
          <div className="search-results__main">
            {activeTab === 'Publicaciones' && (
              <div className="search-results__posts">
                {posts.length === 0 ? (
                  <p>No hay publicaciones</p>
                ) : (
                  posts.map((p) => (
                    <PostCard
                      key={p.id}
                      topic={p.topic}
                      userAvatar={avatar1}
                      username={p.user}
                      date={p.createdAt}
                      title={p.title}
                      content={p.content}
                      tags={p.tags}
                      showMoreLink={false}
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === 'Temas' && (
              <div className="search-results__topics">
                <div className="search-results__topics-grid">
                  {topics.length === 0 ? (
                    <p>No hay temas</p>
                  ) : (
                    topics.map((topic) => (
                      <TopicCard
                        key={topic.id}
                        image={topic.image}
                        name={topic.title}
                        description={topic.description}
                        members={topic.membersCount}
                        onClick={() => goToTopic(topic.id)}
                        className=""
                      />
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'Material de Estudio' && (
              <div className="search-results__material">
                <div className="search-results__files-list">
                  {files.length === 0 ? (
                    <p>No hay archivos</p>
                  ) : (
                    files.map((file, index) => (
                      <FileIcon
                        key={`${file.topicId}-${file.name}-${file.folder}-${index}`}
                        name={file.name}
                        fileType={file.fileType}
                        downloadUrl={file.downloadUrl}
                        onDownload={() => console.log(`Download ${file.name}`)}
                      />
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'Comentarios' && (
              <div className="search-results__comments">
                <div className="search-results__comments-list">
                  {comments.length === 0 ? (
                    <p>No hay comentarios</p>
                  ) : (
                    comments.map((c) => (
                      <SearchResultComment
                        key={c.id}
                        topicIcon={avatar1}
                        topicName={c.topic}
                        timeAgo={c.timeAgo || ''}
                        postTitle={c.postTitle}
                        userAvatar={avatar1}
                        username={c.user}
                        date={c.createdAt}
                        comment={c.text}
                        likes={c.likes || 0}
                        comments={c.replies || 0}
                        onViewPost={() => console.log('View post:', c.postId)}
                      />
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;



