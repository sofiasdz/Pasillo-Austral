import React, { useEffect, useState } from 'react';
import './Topics.css';
import { TopBar } from '../../components/TopBar/TopBar';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Header } from '../../components/Header/Header';
import { Filter } from '../../components/Filter/Filter';
import { TopicCard } from '../../components/TopicCard/TopicCard';
import { useNavigate } from 'react-router-dom';
import avatar1 from '../../assets/avatar1.png';

import topic1 from '../../assets/topic1.jpg';
import topic2 from '../../assets/topic2.jpg';
import topic3 from '../../assets/topic3.jpg';
import topic4 from '../../assets/topic4.jpg';
import topic5 from '../../assets/topic5.jpg';
import topic6 from '../../assets/topic6.jpg';

const fallbackImages = [topic1, topic2, topic3, topic4, topic5, topic6];

const Topics: React.FC = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/topics')
      .then((res) => res.json())
      .then((data) => {
        const withImages = data.map((t: any, index: number) => ({
          ...t,
          image: t.image
            ? `/assets/${t.image}`
            : fallbackImages[index % fallbackImages.length],
        }));
        setTopics(withImages);
      })
      .catch((err) => console.error('Error fetching topics:', err));
  }, []);

  const handleBack = () => window.history.back();

  const goToTopic = (id: number | string) => {
    navigate(`/topic/${id}`);
  };

  return (
    <div className="topics">
      <TopBar username="@Khali_1998" avatar={avatar1} />
      <Sidebar activeItem="Temas" />

      <div className="topics__content">
        <div className="topics__header-wrapper">
          <Header title="Temas" onBack={handleBack} />
        </div>

        <div className="topics__filter-wrapper">
          <Filter label="Popular" />
        </div>

        <div className="topics__grid">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              image={topic.image}
              name={topic.title}
              description={topic.description}
              members={topic.membersCount}
              onClick={() => goToTopic(topic.id)}   // 👈 CLICK NAVEGA
              className=""
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Topics;
