import React, { useEffect, useState } from 'react';
import './Topic.css';
import { TopBar } from '../../components/TopBar/TopBar';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Tab } from '../../components/Tab/Tab';
import { Filter } from '../../components/Filter/Filter';
import { TopicInfoCard } from '../../components/TopicInfoCard/TopicInfoCard';
import { PostCard } from '../../components/PostCard/PostCard';
import avatar1 from '../../assets/avatar1.png';
import topic1 from '../../assets/topic1.jpg';
import { useNavigate } from 'react-router-dom';
import plusIcon from '../../assets/plus-icon.svg';

const Topic: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Publicaciones' | 'Material de Estudio'>('Publicaciones');
  const [topic, setTopic] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);



  // Get topic ID from URL
  const topicId = window.location.pathname.split('/').pop() || '1';
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // Fetch topic data
    fetch(`http://localhost:3001/topics/${topicId}`)
      .then((res) => res.json())
      .then((data) => {
        setTopic(data);

        // If no topic found
        if (!data || !data.title) {
          setPosts([]);
          return null;
        }

        // Fetch posts for this topic (using topic title)
        return fetch(`http://localhost:3001/posts?topic=${encodeURIComponent(data.title)}`);
      })
      .then((res) => res ? res.json() : [])
      .then((data) => {
        setPosts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching topic or posts:', err);
        setLoading(false);
      });
  }, [topicId]);

  const handleBack = () => {
    window.history.back();
  };

  const handleSearchPillClose = () => {
    window.history.back();
  };

  const topicImage = topic?.image
    ? (topic.image.startsWith('http') ? topic.image : `http://localhost:3001${topic.image}`)
    : topic1;

  const topicDescription = topic?.description || 'Aquí encontrarás recursos y publicaciones relacionadas con este tema.';

  return (
    <div className="topic">
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
          <Tab 
            label="Publicaciones" 
            active={activeTab === 'Publicaciones'}
            onClick={() => setActiveTab('Publicaciones')}
          />
          <Tab 
            label="Material de Estudio" 
            active={activeTab === 'Material de Estudio'}
            onClick={() => setActiveTab('Material de Estudio')}
          />
        </div>
        <button  onClick={() => navigate('/create-post')} className="topic__new-post-button">
            <img src={plusIcon} alt="" className="home__new-post-icon" />
            <span className="home__new-post-text">Nueva Publicación</span>
          </button>
        </div>

        <div className="topic__filters">
        <div className="topic__filter-wrapper">
  
          <Filter label="Popular" />
        </div>
        </div>

        <div className="topic__main">
          <div className="topic__posts">
            {loading && <p>Cargando publicaciones...</p>}

            {!loading && posts.length === 0 && (
              <p style={{ opacity: 0.6 }}>Todavía no hay publicaciones en este topic 👀</p>
            )}

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
            <TopicInfoCard
              image={topicImage}
              name={topic?.title}
              description={topicDescription}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic;


