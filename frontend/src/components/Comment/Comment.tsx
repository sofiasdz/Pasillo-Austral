import React, { useState } from 'react';
import './Comment.css';
import { UserInfoCard } from '../UserInfoCard/UserInfoCard';
import chevronDownIcon from '../../assets/chevron-down.svg';
import { Label } from '../Label/Label';

export interface CommentData {
  id: string;
  userAvatar: string;
  username: string;
  date: string;
  content: string;
  likes: number;
  dislikes: number;
  replies?: CommentData[];
  badge?: string;
  badgeColor?: string;
  badgeBgColor?: string;
}

export interface CommentProps {
  comment: CommentData;
  depth?: number;
  maxDepth?: number;
  onReply?: (commentId: string) => void;
  onSeeMore?: (commentId: string) => void;
  className?: string;
}

const MAX_DEPTH = 10;
const INDICATOR_WIDTH = 5;
const DEPTH_OFFSET = 40;

export const Comment: React.FC<CommentProps> = ({
  comment,
  depth = 0,
  maxDepth = MAX_DEPTH,
  onReply,
  onSeeMore,
  className = '',
}) => {
  const [showReplies, setShowReplies] = useState(true);
  const hasReplies = comment.replies && comment.replies.length > 0;
  const isMaxDepth = depth >= maxDepth;
  const nextDepth = depth + 1;

  const indicatorWidth = Math.min(INDICATOR_WIDTH + depth * 5, 50);
  const contentWidth = `calc(100% - ${indicatorWidth}px)`;
  const marginLeft = depth > 0 ? DEPTH_OFFSET : 0;

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleReply = () => {
    onReply?.(comment.id);
  };

  const handleSeeMore = () => {
    onSeeMore?.(comment.id);
  };

  return (
    <div className={`comment ${className}`} style={{ marginLeft: depth > 0 ? `${marginLeft}px` : '0' }}>
      <div className="comment__container">
        <div
          className="comment__indicator"
          style={{ width: `${indicatorWidth}px` }}
        />
        <div className="comment__content" style={{ width: contentWidth }}>
          <div className="comment__user">
            <UserInfoCard
              avatar={comment.userAvatar}
              username={comment.username}
              date={comment.date}
              avatarSize={40}
            />
            {comment.badge && (
              <Label
                variant="primary"
                className="comment__badge"
                style={{
                  backgroundColor: comment.badgeBgColor || 'rgba(164,214,190,0.2)',
                  color: comment.badgeColor || '#2f7e0d',
                  fontSize: '10px',
                  padding: '2px 8px',
                  borderRadius: '23px',
                }}
              >
                {comment.badge}
              </Label>
            )}
          </div>
          <div className="comment__text">
            <p>{comment.content}</p>
          </div>
          <div className="comment__actions">
            <div className="comment__likes">
              <button className="comment__like-button" type="button">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0L8.5 5H13.5L9.5 8L11 13L7 10L3 13L4.5 8L0.5 5H5.5L7 0Z" fill="#808080"/>
                </svg>
                <span>{comment.likes}</span>
              </button>
              <button className="comment__dislike-button" type="button">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14L5.5 9H0.5L4.5 6L3 1L7 4L11 1L9.5 6L13.5 9H8.5L7 14Z" fill="#808080"/>
                </svg>
                <span>{comment.dislikes}</span>
              </button>
            </div>
            <div className="comment__controls">
              {hasReplies && (
                <button
                  className="comment__toggle-replies"
                  onClick={handleToggleReplies}
                  type="button"
                >
                  <img src={chevronDownIcon} alt="" className={`comment__toggle-icon ${showReplies ? '' : 'comment__toggle-icon--rotated'}`} />
                  <span>
                    {showReplies ? `Ocultar respuestas (${comment.replies?.length})` : `Ver respuestas (${comment.replies?.length})`}
                  </span>
                </button>
              )}
              <button className="comment__reply-button" onClick={handleReply} type="button">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 14L7 7L0 0V4L4 7L0 10V14Z" fill="#1682fd"/>
                  <path d="M7 7L14 0V4L10 7L14 10V14L7 7Z" fill="#1682fd"/>
                </svg>
                <span>Responder</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {hasReplies && showReplies && !isMaxDepth && (
        <div className="comment__replies">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              depth={nextDepth}
              maxDepth={maxDepth}
              onReply={onReply}
              onSeeMore={onSeeMore}
            />
          ))}
        </div>
      )}
      {hasReplies && showReplies && isMaxDepth && (
        <div className="comment__see-more-wrapper" style={{ marginLeft: `${marginLeft + DEPTH_OFFSET}px` }}>
          <button className="comment__see-more" onClick={handleSeeMore} type="button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0L9.5 5.5H15L10.5 8.5L12 14L8 11L4 14L5.5 8.5L1 5.5H6.5L8 0Z" fill="#1682fd"/>
            </svg>
            <span>Mas respuestas</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;

