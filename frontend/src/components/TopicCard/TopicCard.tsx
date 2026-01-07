import React from 'react';
import './TopicCard.css';
import peopleIcon from '../../assets/people-icon.svg';

export interface TopicCardProps {
  image: string;
  name: string;
  description: string;
  members: number;
  onClick?: () => void;
  className?: string;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  image,
  name,
  description,
  members,
  onClick,
  className = '',
}) => {
  return (
    <div 
      className={`topic-card ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="topic-card__image-container">
        <img 
         src={
          image.startsWith('http')
            ? image
            : `http://localhost:3001${image}`.replace(/([^:]\/)\/+/g, "$1")
        }
          alt={name} 
          className="topic-card__image"
        />
      </div>
      <div className="topic-card__content">
        <div className="topic-card__body">
          <div className="topic-card__members">
            <div className="topic-card__members-icon">
              <img src={peopleIcon} alt="" className="topic-card__members-icon-img" />
            </div>
            <div className="topic-card__members-count">
              {members} {members === 1 ? 'miembro' : 'miembros'}
            </div>
          </div>
          <div className="topic-card__name">
            <p className="topic-card__name-text">{name}</p>
          </div>
          <div className="topic-card__description">
            <p className="topic-card__description-text">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;

