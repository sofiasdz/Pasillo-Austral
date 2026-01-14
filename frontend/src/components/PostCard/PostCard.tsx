import React from 'react';
import './PostCard.css';
import { UserInfoCard } from '../UserInfoCard/UserInfoCard';
import { Label } from '../Label/Label';
import { useNavigate } from 'react-router-dom';

export interface PostCardProps {
  id?: string;              // <= NEW
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
  id,
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
  const navigate = useNavigate();

  const handleClick = () => {
    if (!id) return;          // safety
    navigate(`/post/${id}`);
  };

  return (
    <div
      className={`post-card ${className}`}
      style={{ cursor: id ? 'pointer' : 'default' }}
      onClick={handleClick}
    >
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
          <div className="post-card__content-text">{content}</div>
        ) : (
          content
        )}
      </div>

      {(tags.length > 0 || showMoreLink) && (
        <div className="post-card__tags">
          <div className="post-card__tags-list">
            {tags.map((tag, index) => (
              <Label key={index}>{tag}</Label>
            ))}
          </div>
          {showMoreLink && (
            <div className="post-card__more">Ver más</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;


