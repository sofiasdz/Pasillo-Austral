import React from 'react';
import './UserInfoCard.css';

export interface UserInfoCardProps {
  avatar: string;
  username: string;
  date?: string;
  avatarSize?: number;
}

export const UserInfoCard: React.FC<UserInfoCardProps> = ({ 
  avatar, 
  username, 
  date,
  avatarSize = 40 
}) => {
  return (
    <div className="user-info-card">
      <div className="user-info-card__avatar">
        <img 
          src={avatar} 
          alt={username} 
          className="user-info-card__avatar-img"
          width={avatarSize}
          height={avatarSize}
        />
      </div>
      <div className="user-info-card__info">
        {date && (
          <div className="user-info-card__date">{date}</div>
        )}
        <div className="user-info-card__username">{username}</div>
      </div>
    </div>
  );
};

export default UserInfoCard;

