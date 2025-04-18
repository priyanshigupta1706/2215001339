// API service to handle all API calls
const API_BASE_URL = 'http://20.244.56.144/evaluation-service';

export interface User {
  id: number;
  username: string;
  name?: string;
  postCount?: number;
}

export interface Post {
  id: number;
  userId: number;
  username?: string;
  title?: string;
  content: string;
  timestamp: string;
  commentCount?: number;
}

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  username?: string;
  content: string;
  timestamp: string;
}

// Get all users
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Get posts by user ID
export const getPostsByUserId = async (userId: number): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts for user ${userId}`);
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    return [];
  }
};

// Get comments by post ID
export const getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
    if (!response.ok) {
      throw new Error(`Failed to fetch comments for post ${postId}`);
    }
    const comments = await response.json();
    return comments;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }
};

// Get all posts with comments count
export const getAllPosts = async (): Promise<Post[]> => {
  try {
    // First, get all users
    const users = await getUsers();
    
    // Then, get posts for each user
    const postsPromises = users.map(user => getPostsByUserId(user.id));
    const postsArrays = await Promise.all(postsPromises);
    
    // Flatten the array of arrays and enrich posts with username
    const allPosts = postsArrays.flat().map(post => {
      const user = users.find(u => u.id === post.userId);
      return {
        ...post,
        username: user?.username || 'Unknown User'
      };
    });
    
    // For each post, fetch comment count
    const postsWithCommentCount = await Promise.all(
      allPosts.map(async post => {
        try {
          const comments = await getCommentsByPostId(post.id);
          return {
            ...post,
            commentCount: comments.length
          };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          return {
            ...post,
            commentCount: 0
          };
        }
      })
    );
    
    return postsWithCommentCount;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
};

// Get top users based on post count
export const getTopUsers = async (limit: number = 5): Promise<User[]> => {
  try {
    // Get all users
    const users = await getUsers();
    
    // Get post count for each user
    const usersWithPostCount = await Promise.all(
      users.map(async user => {
        try {
          const posts = await getPostsByUserId(user.id);
          return {
            ...user,
            postCount: posts.length
          };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          return {
            ...user,
            postCount: 0
          };
        }
      })
    );
    
    // Sort by post count and take the top N
    const topUsers = usersWithPostCount
      .sort((a, b) => (b.postCount || 0) - (a.postCount || 0))
      .slice(0, limit);
    
    return topUsers;
  } catch (error) {
    console.error('Error fetching top users:', error);
    return [];
  }
};

// Get trending posts (posts with most comments)
export const getTrendingPosts = async (limit: number = 5): Promise<Post[]> => {
  try {
    // Get all posts with comment count
    const posts = await getAllPosts();
    
    // Sort by comment count and take the top N
    const trendingPosts = posts
      .sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0))
      .slice(0, limit);
    
    return trendingPosts;
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    return [];
  }
};