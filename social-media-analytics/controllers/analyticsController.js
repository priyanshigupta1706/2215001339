const { getUsers, getPosts, getCommentsMap } = require('../services/dataService');

function getTopUsers(req, res) {
  const users = getUsers();
  const posts = getPosts();
  const commentsMap = getCommentsMap();

  const userCommentCount = {};

  for (const post of posts) {
    const commentCount = (commentsMap[post.id] || []).length;
    userCommentCount[post.userId] = (userCommentCount[post.userId] || 0) + commentCount;
  }

  const topUsers = users.map(user => ({
    id: user.id,
    name: user.name,
    totalComments: userCommentCount[user.id] || 0
  }))
    .sort((a, b) => b.totalComments - a.totalComments)
    .slice(0, 5);

  res.json(topUsers);
}

function getTopOrLatestPosts(req, res) {
  const type = req.query.type;
  const posts = getPosts();
  const commentsMap = getCommentsMap();

  if (type === 'popular') {
    let maxComments = 0;
    const postCommentsCount = {};

    for (const post of posts) {
      const count = (commentsMap[post.id] || []).length;
      postCommentsCount[post.id] = count;
      if (count > maxComments) maxComments = count;
    }

    const popularPosts = posts.filter(post => postCommentsCount[post.id] === maxComments);
    res.json(popularPosts);
  } else if (type === 'latest') {
    const sorted = [...posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.json(sorted.slice(0, 5));
  } else {
    res.status(400).json({ error: "Invalid type. Use ?type=popular or ?type=latest" });
  }
}

module.exports = {
  getTopUsers,
  getTopOrLatestPosts
};
