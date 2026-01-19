
import React from 'react';
import './TopicInfoCard.css';

import topic1 from '../../assets/topic1.jpg';
import topic2 from '../../assets/topic2.jpg';
import topic3 from '../../assets/topic3.jpg';
import topic4 from '../../assets/topic4.jpg';
import topic5 from '../../assets/topic5.jpg';
import topic6 from '../../assets/topic6.jpg';

export interface TopicInfoCardProps {
  image: string; // esto va a ser "topic1", "topic2", etc
  name: string;
  description: string | React.ReactNode;
}

const imageMap: Record<string, string> = {
  topic1,
  topic2,
  topic3,
  topic4,
  topic5,
  topic6,
};

export const TopicInfoCard: React.FC<TopicInfoCardProps> = ({
  image,
  name,
  description,
}) => {
  const resolvedImage = imageMap["topic"+image] ?? imageMap.topic1; // fallback

  return (
    <div className="topic-info-card">
      <div className="topic-info-card__image-container">
        <img
          src={resolvedImage}
          alt={name}
          className="topic-info-card__image"
        />
      </div>

      <div className="topic-info-card__content">
        <div className="topic-info-card__name">
          <p className="topic-info-card__name-text">{name}</p>
        </div>

        <div className="topic-info-card__description">
          {typeof description === 'string' ? (
            <div className="topic-info-card__description-text">{description}</div>
          ) : (
            description
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicInfoCard;

