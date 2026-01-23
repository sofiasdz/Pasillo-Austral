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

  // ✅ Normalizamos replies para evitar undefined
  const replies: CommentData[] = comment.replies ?? [];
  const hasReplies = replies.length > 0;

  const isMaxDepth = depth >= maxDepth;
  const nextDepth = depth + 1;

  const indicatorWidth = Math.min(INDICATOR_WIDTH + depth * 5, 50);
  const contentWidth = `calc(100% - ${indicatorWidth}px)`;
  const marginLeft = depth > 0 ? DEPTH_OFFSET : 0;

  const handleToggleReplies = () => {
    setShowReplies((prev) => !prev);
  };


  const handleReply = () => {
    onReply?.(comment.id);
  };

  const handleSeeMore = () => {
    onSeeMore?.(comment.id);
  };

  return (
    <div
      className={`comment ${className}`}
      style={{ marginLeft: depth > 0 ? `${marginLeft}px` : '0' }}
    >
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
                <span>{comment.likes}</span>
              </button>
              <button className="comment__dislike-button" type="button">
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
                  <img
                    src={chevronDownIcon}
                    alt=""
                    className={`comment__toggle-icon ${
                      showReplies
                        ? ''
                        : 'comment__toggle-icon--rotated'
                    }`}
                  />
                  <span>
                    {showReplies
                      ? `Ocultar respuestas (${replies.length})`
                      : `Ver respuestas (${replies.length})`}
                  </span>
                </button>
              )}

              <button
                className="comment__reply-button"
                onClick={handleReply}
                type="button"
              >
                <span>Responder</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {hasReplies && showReplies && !isMaxDepth && (
        <div className="comment__replies">
          {replies.map((reply) => (
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
        <div
          className="comment__see-more-wrapper"
          style={{ marginLeft: `${marginLeft + DEPTH_OFFSET}px` }}
        >
          <button
            className="comment__see-more"
            onClick={handleSeeMore}
            type="button"
          >
            <span>Más respuestas</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;


