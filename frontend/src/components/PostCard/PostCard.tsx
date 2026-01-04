import React from 'react';
import './PostCard.css';
import { UserInfoCard } from '../UserInfoCard/UserInfoCard';
import { Label } from '../Label/Label';

export interface PostCardProps {
  topic: string;
  userAvatar: string;
  username: string;
  date: string;
  title: string;
  content: string | React.ReactNode;
  tags?: string[];
  showMoreLink?: boolean;
  className?: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  topic,
  userAvatar,
  username,
  date,
  title,
  content,
  tags = [],
  showMoreLink = true,
  className = '',
}) => {
  return (
    <div className={`post-card ${className}`}>
      <div className="post-card__header">
        <div className="post-card__topic-section">
          <div className="post-card__topic">{topic}</div>
          {showMoreLink && (
            <div className="post-card__more">Ver mas</div>
          )}
        </div>
      </div>

      <div className="post-card__user">
        <UserInfoCard 
          avatar={userAvatar}
          username={username}
          date={date}
        />
      </div>

      <div className="post-card__title">
        <p className="post-card__title-text">{title}</p>
      </div>

      <div className="post-card__content">
        {typeof content === 'string' ? (
          <p className="post-card__content-text">{content}</p>
        ) : (
          content
        )}
      </div>

      {tags.length > 0 && (
        <div className="post-card__tags">
          {tags.map((tag, index) => (
            <Label key={index}>{tag}</Label>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;

