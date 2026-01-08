import React from 'react';
import './TopicInfoCard.css';

export interface TopicInfoCardProps {
  image: string;
  name: string;
  description: string | React.ReactNode;
}

export const TopicInfoCard: React.FC<TopicInfoCardProps> = ({
  image,
  name,
  description,
}) => {
  return (
    <div className="topic-info-card">
      <div className="topic-info-card__image-container">
        <img 
          src={
            image.startsWith('http')
              ? image
              : `http://localhost:3001${image}`.replace(/([^:]\/)\/+/g, "$1")
          }
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

