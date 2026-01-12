import React from 'react';
import './SearchResultComment.css';
import { UserInfoCard } from '../UserInfoCard/UserInfoCard';

export interface SearchResultCommentProps {
  topicIcon?: string;
  topicName: string;
  timeAgo: string;
  postTitle: string;
  userAvatar: string;
  username: string;
  date: string;
  comment: string;
  likes?: number;
  comments?: number;
  onViewPost?: () => void;
}

export const SearchResultComment: React.FC<SearchResultCommentProps> = ({
  topicIcon,
  topicName,
  timeAgo,
  postTitle,
  userAvatar,
  username,
  date,
  comment,
  likes = 0,
  comments = 0,
  onViewPost,
}) => {
  return (
    <div className="search-result-comment">
      <div className="search-result-comment__header">
        <div className="search-result-comment__header-top">
          <div className="search-result-comment__topic">
            {topicIcon && (
              <img
                src={topicIcon}
                alt={topicName}
                className="search-result-comment__topic-icon"
              />
            )}
            <span className="search-result-comment__topic-name">{topicName}</span>
          </div>
          <div className="search-result-comment__separator">
            <span className="search-result-comment__dot">•</span>
            <span className="search-result-comment__time">{timeAgo}</span>
          </div>
        </div>
        <h3 className="search-result-comment__post-title">{postTitle}</h3>
      </div>

      <div className="search-result-comment__card">
        <div className="search-result-comment__user">
          <UserInfoCard
            avatar={userAvatar}
            username={username}
            date={date}
          />
        </div>
        <div className="search-result-comment__content">
          <p className="search-result-comment__text">{comment}</p>
        </div>
      </div>

      <div className="search-result-comment__footer">
        <button
          className="search-result-comment__view-post"
          onClick={onViewPost}
          type="button"
        >
          Ver publicacion entera
        </button>
        <p className="search-result-comment__stats">
          {likes} Likes - {comments} Comentarios
        </p>
      </div>
    </div>
  );
};

export default SearchResultComment;

