import React, { useEffect, useState } from 'react';
import './Home.css';
import { Calendar } from '../../components/Calendar/Calendar';
import { PostCard } from '../../components/PostCard/PostCard';
import { Label } from '../../components/Label/Label';
import { useNavigate } from 'react-router-dom';

import avatar1 from '../../assets/avatar1.png';
import plusIcon from '../../assets/plus-icon.svg';

const Home: React.FC = () => {
  // Calendar data
  const weekDays = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
  const navigate = useNavigate();

  const weeks = [
    [
      { day: 1, isActive: true },
      { day: 2 },
      { day: 3 },
      { day: 4, hasEvents: 2 },
      { day: 5 },
      { day: 6 },
      { day: 7 },
    ],
    [
      { day: 8 },
      { day: 9 },
      { day: 10, hasEvents: 1 },
      { day: 11 },
      { day: 12 },
      { day: 13 },
      { day: 14 },
    ],
    [
      { day: 15 },
      { day: 16, hasEvents: 3 },
      { day: 17 },
      { day: 18 },
      { day: 19 },
      { day: 20 },
      { day: 21 },
    ],
    [
      { day: 22 },
      { day: 23 },
      { day: 24 },
      { day: 25 },
      { day: 26 },
      { day: 28 },
      { day: 0 },
    ],
  ];

  const calendarEvents = [
    { date: '4 Ene', title: 'Final mesa extraordinaria Análisis matemático' },
    { date: '4 Ene', title: 'Final mesa extraordinaria Álgebra II' },
    { date: '10 Ene', title: 'Primer Parcial Investigación Operativa' },
    { date: '16 Ene', title: 'Segundo Parcial Investigación Operativa' },
  ];

  // Posts
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Error fetching posts:', err));
  }, []);

  return (
    <div className="home">
      <div className="home__calendar">
        <Calendar
          month="Enero"
          year={2025}
          weeks={weeks}
          weekDays={weekDays}
          events={calendarEvents}
        />
      </div>

      <div className="home__main">
        <div className="home__header">
          <Label variant="primary">Últimas Publicaciones</Label>
          <button  onClick={() => navigate('/create-post')} className="home__new-post-button">
            <img src={plusIcon} alt="" className="home__new-post-icon" />
            <span className="home__new-post-text">Nueva Publicación</span>
          </button>
        </div>

        <div className="home__posts">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}  // 👈 AHORA SI!
              topic={post.topic}
              userAvatar={avatar1}
              username={post.user || '@anon'}
              date={new Date(post.createdAt).toLocaleString()}
              title={post.title}
              content={post.content}
              tags={post.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

