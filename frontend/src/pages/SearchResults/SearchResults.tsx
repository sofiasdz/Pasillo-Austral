import React, { useState, useEffect } from 'react';
import './SearchResults.css';
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

        const mappedFiles = (data.materials || []).map((m: any, index: number) => ({
          folder: m.folder || '',
          name: m.file || '',
          fileType: m.file?.includes('.') ? m.file.split('.').pop().toLowerCase() : 'file',
          downloadUrl: m.path,
          key: `${m.folder}-${m.file}-${index}`,
        }));
        setFiles(mappedFiles);

        setComments(data.comments || []);
      })
      .catch((err) => console.error('Error fetching search results:', err))
      .finally(() => setLoading(false));
  }, [searchQuery]);

  const goToTopic = (id: number | string) => navigate(`/topic/${id}`);

  return (
    <div className="search-results">
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
                      id={p.id}
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
                    files.map((file) => (
                      <FileIcon
                        key={file.key}
                        name={file.name}
                        fileType={file.fileType}
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
                        topicName={c.topicName || ''}
                        postTitle={c.postTitle || ''}
                        userAvatar={avatar1}
                        username={c.user}
                        date={c.createdAt}
                        comment={c.content || ''}
                        likes={c.likes || 0}
                        comments={c.replies || 0}
                        timeAgo={c.createdAt}
                        onViewPost={() => navigate(`/post/${c.postId}`)}
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


