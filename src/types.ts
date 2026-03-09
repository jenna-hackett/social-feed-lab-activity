export type User = {
  username: string;
};

export type Comment = {
  id: string;
  postId: string;
  author: string;
  text: string;
  createdAt: number;
};

export type Post = {
  id: string;
  author: string;
  text: string;
  createdAt: number;
  commentCount: number;
  comments: Comment[];
};
