// Login function that takes a username and returns the user data from the server.
export async function login(username: string) {
  // Simulates a 1-second delay then returns success
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    token: "fake_token_123",
    user: { username },
  };
}

// Get Feed function that retrieves the list of posts from the server. For now, it returns a static list of posts as a placeholder.

// MOCK DATA
let MOCK_POSTS = [
  {
    id: "1",
    author: "Local_Test",
    text: "This is a sample post from the feed.",
    createdAt: Date.now(),
    commentCount: 0,
    comments: [],
  },
  {
    id: "2",
    author: "Local_Test",
    text: "This is a second sample post from the feed.",
    createdAt: Date.now(),
    commentCount: 0,
    comments: [],
  },
  {
    id: "3",
    author: "Local_Test",
    text: "This is a third sample post from the feed.",
    createdAt: Date.now(),
    commentCount: 0,
    comments: [],
  },
  {
    id: "4",
    author: "Local_Test",
    text: "This is a fourth sample post from the feed.",
    createdAt: Date.now(),
    commentCount: 0,
    comments: [],
  },
];

export async function getFeed(authors?: string) {
  // COMMENTED OUT BECAUSE SERVER IS DOWN FOR API.
  //const response = await api.get("/feed", {
  // This passes the authors to the API as a query parameter: /feed?authors=...
  //params: authors ? { authors } : {},
  //});
  //return response.data.posts;

  // MOCK DATA TO ALLOW APP TO FUNCTION WITHOUT API
  return MOCK_POSTS;
}

// Create Post function that takes the text of the post and sends it to the server to create a new post.
export async function createPost(text: string) {
  // COMMENTED OUT BECAUSE SERVER IS DOWN FOR API.
  //const response = await api.post("/posts", { text });
  //return response.data;

  // MOCK FUNCTION TO SIMULATE CREATING A POST WITHOUT API
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const newPost = {
    id: Math.random().toString(36),
    author: "Me",
    text: text,
    createdAt: Date.now(),
    commentCount: 0,
    comments: [],
  };

  MOCK_POSTS = [newPost, ...MOCK_POSTS]; // add the new post to the top of the feed

  return { post: newPost };
}

// Create Comment function that takes the post ID and the text of the comment and sends it to the server to create a new comment on the specified post.
export async function createComment(postId: string, text: string) {
  // const response = await api.post(`/posts/${postId}/comments`, { text });
  return { success: true };
}
