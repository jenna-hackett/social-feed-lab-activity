import api from "./api";

// Login function that takes a username and returns the user data from the server.
export const login = async (username: string) => {
  const response = await api.post("/login", { username });
  return response.data;
};

// Get Feed function that takes an optional array of authors and returns the feed data from the server.
export const getFeed = async (authors?: string[]) => {
  const response = await api.get("/feed", {
    params: authors ? { authors } : {},
  });
  return response.data;
};

// Create Post function that takes the text of the post and sends it to the server to create a new post.
export async function createPost(text: string) {
  const response = await api.post("/posts", { text });
  return response.data;
}

// Create Comment function that takes the post ID and the text of the comment and sends it to the server to create a new comment on the specified post.
export async function createComment(postId: string, text: string) {
  const response = await api.post(`/posts/${postId}/comments`, { text });
  return response.data;
}
