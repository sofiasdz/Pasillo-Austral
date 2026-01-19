import React from 'react';
import './PostCardExpanded.css';
import { UserInfoCard } from '../UserInfoCard/UserInfoCard';
import { Label } from '../Label/Label';
import { FileIcon } from '../FileIcon/FileIcon';

export interface PostFile {
  id?: string;
  name: string;
  fileType?: "pdf" | "docx" | "xlsx" | "txt" | "png" | "zip" | "ai";
  downloadUrl?: string;
}

export interface PostCardExpandedProps {
  id?: string;
  topic?: string;
  userAvatar: string;
  username: string;
  date: string;
  title: string;
  content: string | React.ReactNode;
  tags?: string[];
  files?: PostFile[];
  showMoreLink?: boolean;
  className?: string;
}

export const PostCardExpanded: React.FC<PostCardExpandedProps> = ({
  id,
  topic,
  userAvatar,
  username,
  date,
  title,
  content,
  tags = [],
  files = [],
  showMoreLink = true,
  className = '',
}) => {
  return (
    <div className={`post-card-expanded ${className}`}>
      <div className="post-card-expanded__user">
        <UserInfoCard 
          avatar={userAvatar}
          username={username}
          date={date}
        />
      </div>

      <div className="post-card-expanded__title">
        <p className="post-card-expanded__title-text">{title}</p>
      </div>

      <div className="post-card-expanded__content">
        {typeof content === 'string' ? (
          <div className="post-card-expanded__content-text">{content}</div>
        ) : (
          content
        )}
      </div>

      {files.length > 0 && (
        <div className="post-card-expanded__files">
          {files.map((file, index) => (
            <div key={file.id || index} className="post-card-expanded__file-pill">
              <FileIcon
                name={file.name}
                fileType={file.fileType}
              />
            </div>
          ))}
        </div>
      )}

      {(tags.length > 0 || showMoreLink) && (
        <div className="post-card-expanded__tags">
          <div className="post-card-expanded__tags-list">
            {tags.map((tag, index) => (
              <Label key={index}>{tag}</Label>
            ))}
          </div>
          {showMoreLink && (
            <div className="post-card-expanded__more">Ver más</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCardExpanded;

