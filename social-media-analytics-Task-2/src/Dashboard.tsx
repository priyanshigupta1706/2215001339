import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, Home, TrendingUp, Users, Search, MessageSquare, Heart, Share2, Menu, X } from 'lucide-react';

// Types
interface User {
  id: number;
  name: string;
  username: string;
  postCount: number;
  avatar: string;
}

interface Comment {
  id: number;
  userId: number;
  username: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: number;
  userId: number;
  username: string;
  userAvatar: string;
  content: string;
  imageUrl: string;
  commentCount: number;
  likeCount: number;
  timestamp: string;
  comments?: Comment[];
}

const SocialMediaDashboard = () => {
  // State
  const [activeTab, setActiveTab] = useState<'topUsers' | 'trendingPosts' | 'feed'>('topUsers');
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Fetch data from your API
  useEffect(() => {
    // These would be actual API calls to your backend
    fetchTopUsers();
    fetchTrendingPosts();
    fetchFeed();
    
    // Set up interval for real-time feed updates
    const interval = setInterval(() => {
      fetchFeed();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  const fetchTopUsers = async () => {
    try {
      // Replace with actual API call
      // const response = await fetch('http://localhost:3000/api/top-users');
      // const data = await response.json();
      // setTopUsers(data);
      
      // Mocked data for demo
      setTopUsers([
        { id: 1, name: 'Sarah Johnson', username: '@sarahj', postCount: 138, avatar: '/api/placeholder/100/100' },
        { id: 2, name: 'Mike Chen', username: '@mikechen', postCount: 127, avatar: '/api/placeholder/100/100' },
        { id: 3, name: 'Priya Patel', username: '@priyap', postCount: 115, avatar: '/api/placeholder/100/100' },
        { id: 4, name: 'James Wilson', username: '@jwilson', postCount: 102, avatar: '/api/placeholder/100/100' },
        { id: 5, name: 'Emma Rodriguez', username: '@emmar', postCount: 94, avatar: '/api/placeholder/100/100' },
      ]);
    } catch (error) {
      console.error('Error fetching top users:', error);
    }
  };
  
  const fetchTrendingPosts = async () => {
    try {
      // Replace with actual API call
      // const response = await fetch('http://localhost:3000/api/trending-posts');
      // const data = await response.json();
      // setTrendingPosts(data);
      
      // Mocked data for demo
      setTrendingPosts([
        {
          id: 1,
          userId: 2,
          username: 'Mike Chen',
          userAvatar: '/api/placeholder/100/100',
          content: 'Just launched our new feature! Check it out and let me know what you think #innovation #tech',
          imageUrl: '/api/placeholder/600/400',
          commentCount: 253,
          likeCount: 1204,
          timestamp: '2025-04-17T14:23:00Z',
          comments: [
            { id: 1, userId: 3, username: 'Priya Patel', content: 'This is amazing! Can\'t wait to try it', timestamp: '2025-04-17T14:45:00Z' },
            { id: 2, userId: 1, username: 'Sarah Johnson', content: 'Great work team!', timestamp: '2025-04-17T15:12:00Z' }
          ]
        },
        {
          id: 2,
          userId: 1,
          username: 'Sarah Johnson',
          userAvatar: '/api/placeholder/100/100',
          content: 'Our annual conference is coming up next month! Early bird tickets available now #conference #networking',
          imageUrl: '/api/placeholder/600/400',
          commentCount: 253,
          likeCount: 892,
          timestamp: '2025-04-17T11:32:00Z',
          comments: [
            { id: 3, userId: 4, username: 'James Wilson', content: 'Already got my ticket!', timestamp: '2025-04-17T11:45:00Z' },
            { id: 4, userId: 5, username: 'Emma Rodriguez', content: 'Will there be virtual attendance options?', timestamp: '2025-04-17T12:18:00Z' }
          ]
        },
      ]);
    } catch (error) {
      console.error('Error fetching trending posts:', error);
    }
  };
  
  const fetchFeed = async () => {
    try {
      // Replace with actual API call
      // const response = await fetch('http://localhost:3000/api/feed');
      // const data = await response.json();
      // setFeedPosts(data);
      
      // Mocked data for demo
      setFeedPosts([
        {
          id: 3,
          userId: 3,
          username: 'Priya Patel',
          userAvatar: '/api/placeholder/100/100',
          content: 'Just finished the latest sprint. Team did an amazing job! #agile #development',
          imageUrl: '/api/placeholder/600/400',
          commentCount: 78,
          likeCount: 345,
          timestamp: '2025-04-18T09:12:00Z'
        },
        {
          id: 4,
          userId: 5,
          username: 'Emma Rodriguez',
          userAvatar: '/api/placeholder/100/100',
          content: 'Check out our new office space! #newbeginnings',
          imageUrl: '/api/placeholder/600/400',
          commentCount: 45,
          likeCount: 231,
          timestamp: '2025-04-18T08:03:00Z'
        },
        {
          id: 5,
          userId: 4,
          username: 'James Wilson',
          userAvatar: '/api/placeholder/100/100',
          content: 'Great meeting with the customers today. Lots of positive feedback on the new features! #customerexperience',
          imageUrl: '/api/placeholder/600/400',
          commentCount: 32,
          likeCount: 176,
          timestamp: '2025-04-17T17:45:00Z'
        },
        {
          id: 6,
          userId: 2,
          username: 'Mike Chen',
          userAvatar: '/api/placeholder/100/100',
          content: 'Working on some exciting new AI features #machinelearning #innovation',
          imageUrl: '/api/placeholder/600/400',
          commentCount: 56,
          likeCount: 289,
          timestamp: '2025-04-17T15:37:00Z'
        },
      ]);
    } catch (error) {
      console.error('Error fetching feed:', error);
    }
  };
  
  // Format timestamp
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button className="md:hidden p-2" onClick={toggleMenu}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-xl font-bold text-blue-600">SocialAnalytics</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <button 
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${activeTab === 'topUsers' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('topUsers')}
              >
                <Users size={18} />
                <span>Top Users</span>
              </button>
              
              <button 
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${activeTab === 'trendingPosts' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('trendingPosts')}
              >
                <TrendingUp size={18} />
                <span>Trending Posts</span>
              </button>
              
              <button 
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${activeTab === 'feed' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('feed')}
              >
                <Home size={18} />
                <span>Feed</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 lg:w-64"
                />
                <Search size={16} className="absolute left-3 top-2.5 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-2">
              <button 
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${activeTab === 'topUsers' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}
                onClick={() => {
                  setActiveTab('topUsers');
                  setIsMenuOpen(false);
                }}
              >
                <Users size={18} />
                <span>Top Users</span>
              </button>
              
              <button 
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${activeTab === 'trendingPosts' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}
                onClick={() => {
                  setActiveTab('trendingPosts');
                  setIsMenuOpen(false);
                }}
              >
                <TrendingUp size={18} />
                <span>Trending Posts</span>
              </button>
              
              <button 
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${activeTab === 'feed' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}
                onClick={() => {
                  setActiveTab('feed');
                  setIsMenuOpen(false);
                }}
              >
                <Home size={18} />
                <span>Feed</span>
              </button>

              <div className="relative mt-2">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <Search size={16} className="absolute left-3 top-2.5 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeTab === 'topUsers' && 'Top Users'}
            {activeTab === 'trendingPosts' && 'Trending Posts'}
            {activeTab === 'feed' && 'Latest Feed'}
          </h2>
          <p className="text-gray-600 mt-1">
            {activeTab === 'topUsers' && 'Users with the highest number of posts'}
            {activeTab === 'trendingPosts' && 'Posts with maximum engagement'}
            {activeTab === 'feed' && 'Real-time updates from your network'}
          </p>
        </div>
        
        {/* Top Users View */}
        {activeTab === 'topUsers' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Post Count by User</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topUsers}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="username" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="postCount" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Top 5 Most Active Users</h3>
              </div>
              <div className="divide-y">
                {topUsers.map((user, index) => (
                  <div key={user.id} className="flex items-center p-4 hover:bg-gray-50">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                        #{index + 1}
                      </div>
                    </div>
                    <div className="flex-shrink-0 mr-4">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold">{user.name}</h4>
                      <p className="text-gray-600 text-sm">{user.username}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
                        {user.postCount} posts
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Trending Posts View */}
        {activeTab === 'trendingPosts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Posts with Maximum Comments</h3>
                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  Trending Now
                </div>
              </div>
              
              <div className="space-y-6">
                {trendingPosts.map(post => (
                  <div key={post.id} className="border rounded-lg overflow-hidden">
                    <div className="p-4 flex items-center">
                      <img
                        src={post.userAvatar}
                        alt={post.username}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="font-semibold">{post.username}</h4>
                        <p className="text-gray-500 text-sm">{formatDate(post.timestamp)}</p>
                      </div>
                    </div>
                    
                    <div className="px-4 pb-3">
                      <p className="text-gray-800 mb-3">{post.content}</p>
                      <img
                        src={post.imageUrl}
                        alt="Post content"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="px-4 py-3 border-t flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center text-gray-600">
                          <Heart size={18} className="mr-1" />
                          <span>{post.likeCount}</span>
                        </div>
                        <div className="flex items-center text-gray-600 font-semibold">
                          <MessageSquare size={18} className="mr-1" />
                          <span>{post.commentCount}</span>
                        </div>
                      </div>
                      <button className="text-gray-600">
                        <Share2 size={18} />
                      </button>
                    </div>
                    
                    {post.comments && (
                      <div className="bg-gray-50 px-4 py-3 border-t">
                        <h5 className="font-medium text-gray-700 mb-2">Recent Comments</h5>
                        <div className="space-y-3">
                          {post.comments.map(comment => (
                            <div key={comment.id} className="flex">
                              <div className="font-medium mr-2">{comment.username}:</div>
                              <div className="text-gray-700">{comment.content}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Feed View */}
        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {feedPosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4 flex items-center">
                    <img
                      src={post.userAvatar}
                      alt={post.username}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-semibold">{post.username}</h4>
                      <p className="text-gray-500 text-sm">{formatDate(post.timestamp)}</p>
                    </div>
                  </div>
                  
                  <div className="px-4 pb-3">
                    <p className="text-gray-800 mb-3">{post.content}</p>
                    <img
                      src={post.imageUrl}
                      alt="Post content"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="px-4 py-3 border-t flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center text-gray-600 hover:text-blue-600">
                        <Heart size={18} className="mr-1" />
                        <span>{post.likeCount}</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-blue-600">
                        <MessageSquare size={18} className="mr-1" />
                        <span>{post.commentCount}</span>
                      </button>
                    </div>
                    <button className="text-gray-600 hover:text-blue-600">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow p-4 sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Popular Hashtags</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600">#innovation</span>
                    <span className="text-gray-500 text-sm">1.2k posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600">#tech</span>
                    <span className="text-gray-500 text-sm">945 posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600">#development</span>
                    <span className="text-gray-500 text-sm">823 posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600">#agile</span>
                    <span className="text-gray-500 text-sm">712 posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600">#conference</span>
                    <span className="text-gray-500 text-sm">598 posts</span>
                  </div>
                </div>
                
                <div className="border-t mt-4 pt-4">
                  <h3 className="font-semibold text-lg mb-4">Suggested Users</h3>
                  <div className="space-y-3">
                    {topUsers.slice(0, 3).map(user => (
                      <div key={user.id} className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div className="flex-grow">
                          <div className="font-medium text-sm">{user.name}</div>
                          <div className="text-gray-500 text-xs">{user.username}</div>
                        </div>
                        <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                          Follow
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">© 2025 SocialAnalytics. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SocialMediaDashboard;


