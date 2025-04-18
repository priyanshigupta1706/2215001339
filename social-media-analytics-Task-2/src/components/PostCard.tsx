import React from 'react';
import { Post } from '../services/api';

interface PostCardProps {
  post: Post;
  isTrending?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isTrending = false }) => {
  return (
    <div className={`post-card ${isTrending ? 'trending' : ''}`}>
      <h3>@{post.username || 'Unknown User'}</h3>
      <p>{post.content}</p>
      <div className="post-meta">
        {post.timestamp && (
          <span>{new Date(post.timestamp).toLocaleString()}</span>
        )}
        <span className={isTrending ? 'highlight' : ''}>
          {post.commentCount || 0} comments
        </span>
      </div>
    </div>
  );
};

export default PostCard;