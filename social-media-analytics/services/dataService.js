const axios = require('axios');

const BASE_URL = 'http://20.244.56.144/evaluation-service';

let users = [];
let posts = [];
let commentsMap = {}; // { postId: [comments] }

async function fetchData() {
  users = (await axios.get(`${BASE_URL}/users`)).data;

  posts = [];
  commentsMap = {};

  for (const user of users) {
    try {
      const userPosts = (await axios.get(`${BASE_URL}/users/${user.id}/posts`)).data;
      posts.push(...userPosts);

      for (const post of userPosts) {
        const postComments = (await axios.get(`${BASE_URL}/posts/${post.id}/comments`)).data;
        commentsMap[post.id] = postComments;
      }
    } catch (err) {
      console.error(`Error fetching posts/comments for user ${user.id}:`, err.message);
    }
  }
}

function getUsers() {
  return users;
}

function getPosts() {
  return posts;
}

function getCommentsMap() {
  return commentsMap;
}

module.exports = {
  fetchData,
  getUsers,
  getPosts,
  getCommentsMap
};
