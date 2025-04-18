import React from 'react';
import { User } from '../services/api';

interface UserCardProps {
  user: User;
  rank: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, rank }) => {
  return (
    <div className="user-card">
      <span className="rank">{rank}</span>
      <h3>@{user.username}</h3>
      <span className="posts">{user.postCount || 0} posts</span>
    </div>
  );
};

export default UserCard;