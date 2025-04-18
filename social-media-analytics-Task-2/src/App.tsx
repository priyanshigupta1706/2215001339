import React, { useState, useEffect } from 'react';
import './App.css';
import { getTopUsers, getTrendingPosts, getAllPosts, User, Post } from './services/api';
import Loading from './components/Loading';
import Error from './components/Error';
import UserCard from './components/UserCard';
import PostCard from './components/PostCard';

function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch data based on active tab to minimize unnecessary requests
        if (activeTab === 'top-users' || activeTab === 'feed') {
          const topUsersData = await getTopUsers(5);
          setTopUsers(topUsersData);
        }
        
        if (activeTab === 'trending' || activeTab === 'feed') {
          const trendingPostsData = await getTrendingPosts(5);
          setTrendingPosts(trendingPostsData);
        }
        
        if (activeTab === 'feed') {
          const allPosts = await getAllPosts();
          // Sort by timestamp (newest first)
          const sortedPosts = [...allPosts].sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          setPosts(sortedPosts);
        }
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [activeTab]);

  return (
    <div className="app">
      <header className="header">
        <h1>Social Media Analytics</h1>
        <nav>
          <button 
            className={activeTab === 'feed' ? 'active' : ''} 
            onClick={() => setActiveTab('feed')}
          >
            Feed
          </button>
          <button 
            className={activeTab === 'top-users' ? 'active' : ''} 
            onClick={() => setActiveTab('top-users')}
          >
            Top Users
          </button>
          <button 
            className={activeTab === 'trending' ? 'active' : ''} 
            onClick={() => setActiveTab('trending')}
          >
            Trending Posts
          </button>
        </nav>
      </header>

      <main>
        {/* Loading and Error States */}
        {isLoading && <Loading />}
        
        {error && <Error message={error} onRetry={() => setActiveTab(activeTab)} />}
        
        {/* Feed Section */}
        {!isLoading && !error && activeTab === 'feed' && (
          <section className="feed-section">
            <h2>Feed</h2>
            {posts.length > 0 ? (
              <div className="post-list">
                {posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <p className="no-data">No posts available at the moment.</p>
            )}
          </section>
        )}

        {/* Top Users Section */}
        {!isLoading && !error && activeTab === 'top-users' && (
          <section className="top-users-section">
            <h2>Top Users</h2>
            {topUsers.length > 0 ? (
              <div className="user-list">
                {topUsers.map((user, index) => (
                  <UserCard key={user.id} user={user} rank={index + 1} />
                ))}
              </div>
            ) : (
              <p className="no-data">No user data available at the moment.</p>
            )}
          </section>
        )}

        {/* Trending Posts Section */}
        {!isLoading && !error && activeTab === 'trending' && (
          <section className="trending-section">
            <h2>Trending Posts</h2>
            {trendingPosts.length > 0 ? (
              <div className="post-list">
                {trendingPosts.map(post => (
                  <PostCard key={post.id} post={post} isTrending={true} />
                ))}
              </div>
            ) : (
              <p className="no-data">No trending posts available at the moment.</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;