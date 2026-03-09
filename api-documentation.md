# Class Feed API Documentation

This API is used for the **Class Feed** lab app.

You will use it to:

- log in
- load posts
- create posts
- create comments
- edit your own posts
- edit your own comments

---

# Data Shapes

These are the main kinds of objects you will work with.

## User

```
{
  "username": "jacob"
}
```

## Comment

```
{
  "id": "c_123",
  "postId": "p_123",
  "author": "jacob",
  "text": "nice post",
  "createdAt": 1700000000000
}
```

Sometimes a comment may also have:

```
{
  "updatedAt": 1700000001000
}
```

## Post

```
{
  "id": "p_123",
  "author": "jacob",
  "text": "hello class",
  "createdAt": 1700000000000,
  "commentCount": 1,
  "comments": [
    {
      "id": "c_123",
      "postId": "p_123",
      "author": "alex",
      "text": "welcome",
      "createdAt": 1700000000500
    }
  ]
}
```

Sometimes a post may also have:

```
{
  "updatedAt": 1700000001000
}
```

---

# Endpoints

## 1) Login

Logs a user in and returns a token.

### Endpoint

```
POST /login
```

### Request Body

```
{
  "username": "jacob"
}
```

### Rules for username

- required
- automatically converted to lowercase by the server
- max length: 20
- can only contain:
  - letters `a-z`
  - numbers `0-9`
  - underscore `_`

### Successful Response

Status: `200 OK`

```
{
  "token": "abc123tokenhere",
  "user": {
    "username": "jacob"
  }
}
```

### Axios Example

```
const response = await axios.post("/login", {
  username: "jacob",
});

console.log(response.data.token);
console.log(response.data.user.username);
```

### Common Errors

#### Missing username

Status: `400 Bad Request`

```
{
  "error": "username is required"
}
```

#### Username too long

Status: `400 Bad Request`

```
{
  "error": "username must be <= 20 chars"
}
```

#### Invalid characters

Status: `400 Bad Request`

```
{
  "error": "username can only use a-z, 0-9, underscore"
}
```

---

## 2) Get Feed

Gets the list of posts.

This endpoint requires a bearer token.

### Endpoint

```
GET /feed
```

### Headers Required

```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Optional Query Parameter

You can optionally filter by author(s) using `authors`.

Example URL:

```
/feed?authors=alex,sam
```

That means:

- only posts by `alex` or `sam` will be returned

If you do not include `authors`, all posts are returned.

### Successful Response

Status: `200 OK`

```
{
  "posts": [
    {
      "id": "p_seed_1",
      "author": "jacob",
      "text": "Welcome to the class feed 👋",
      "createdAt": 1700000000000,
      "commentCount": 1,
      "comments": [
        {
          "id": "c_1",
          "postId": "p_seed_1",
          "author": "alex",
          "text": "hello!",
          "createdAt": 1700000000100
        }
      ]
    }
  ]
}
```

### Axios Example (all posts)

```
const response = await axios.get("/feed", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

console.log(response.data.posts);
```

### Axios Example (filter by authors)

```
const response = await axios.get("/feed", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  params: {
    authors: "alex,sam",
  },
});

console.log(response.data.posts);
```

### Common Errors

#### Missing authorization header

Status: `401 Unauthorized`

```
{
  "error": "Missing Authorization header"
}
```

#### Bad authorization format

Status: `401 Unauthorized`

```
{
  "error": "Invalid Authorization header format"
}
```

#### Invalid token

Status: `401 Unauthorized`

```
{
  "error": "Invalid or expired token"
}
```

---

## 3) Create Post

Creates a new post.

This endpoint requires a bearer token.

### Endpoint

```
POST /posts
```

### Headers Required

```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Request Body

```
{
  "text": "hello everyone"
}
```

### Rules for text

- required
- max length: 280 characters

### Successful Response

Status: `201 Created`

```
{
  "post": {
    "id": "p_123",
    "author": "jacob",
    "text": "hello everyone",
    "createdAt": 1700000000000,
    "commentCount": 0,
    "comments": []
  }
}
```

### Axios Example

```
const response = await axios.post(
  "/posts",
  {
    text: "hello everyone",
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

console.log(response.data.post);
```

### Common Errors

#### Empty text

Status: `400 Bad Request`

```
{
  "error": "text is required"
}
```

#### Text too long

Status: `400 Bad Request`

```
{
  "error": "text must be <= 280 chars"
}
```

#### Missing or invalid token

Status: `401 Unauthorized`

```
{
  "error": "Missing Authorization header"
}
```

or

```
{
  "error": "Invalid or expired token"
}
```

---

## 4) Edit Post

Edits an existing post.

You can only edit your **own** posts.

This endpoint requires a bearer token.

### Endpoint

```
PUT /posts/:id
```

Example:

```
PUT /posts/p_123
```

### Headers Required

```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Request Body

```
{
  "text": "updated post text"
}
```

### Successful Response

Status: `200 OK`

```
{
  "post": {
    "id": "p_123",
    "author": "jacob",
    "text": "updated post text",
    "createdAt": 1700000000000,
    "updatedAt": 1700000005000,
    "commentCount": 2,
    "comments": [
      {
        "id": "c_1",
        "postId": "p_123",
        "author": "alex",
        "text": "nice",
        "createdAt": 1700000000100
      }
    ]
  }
}
```

### Axios Example

```
const response = await axios.put(
  `/posts/${postId}`,
  {
    text: "updated post text",
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

console.log(response.data.post);
```

### Common Errors

#### Post not found

Status: `404 Not Found`

```
{
  "error": "post not found"
}
```

#### Trying to edit someone else's post

Status: `403 Forbidden`

```
{
  "error": "you can only edit your own posts"
}
```

#### Invalid text

Status: `400 Bad Request`

```
{
  "error": "text is required"
}
```

or

```
{
  "error": "text must be <= 280 chars"
}
```

---

## 5) Create Comment

Creates a comment on a specific post.

This endpoint requires a bearer token.

### Endpoint

```
POST /posts/:id/comments
```

Example:

```
POST /posts/p_123/comments
```

### Headers Required

```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Request Body

```
{
  "text": "great post"
}
```

### Successful Response

Status: `201 Created`

```
{
  "comment": {
    "id": "c_123",
    "postId": "p_123",
    "author": "jacob",
    "text": "great post",
    "createdAt": 1700000000000
  }
}
```

### Axios Example

```
const response = await axios.post(
  `/posts/${postId}/comments`,
  {
    text: "great post",
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

console.log(response.data.comment);
```

### Common Errors

#### Post not found

Status: `404 Not Found`

```
{
  "error": "post not found"
}
```

#### Invalid text

Status: `400 Bad Request`

```
{
  "error": "text is required"
}
```

or

```
{
  "error": "text must be <= 280 chars"
}
```

#### Missing or invalid token

Status: `401 Unauthorized`

```
{
  "error": "Missing Authorization header"
}
```

or

```
{
  "error": "Invalid or expired token"
}
```

---

## 6) Edit Comment

Edits an existing comment.

You can only edit your **own** comments.

This endpoint requires a bearer token.

### Endpoint

```
PUT /comments/:id
```

Example:

```
PUT /comments/c_123
```

### Headers Required

```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Request Body

```
{
  "text": "updated comment"
}
```

### Successful Response

Status: `200 OK`

```
{
  "comment": {
    "id": "c_123",
    "postId": "p_123",
    "author": "jacob",
    "text": "updated comment",
    "createdAt": 1700000000000,
    "updatedAt": 1700000004000
  }
}
```

### Axios Example

```
const response = await axios.put(
  `/comments/${commentId}`,
  {
    text: "updated comment",
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

console.log(response.data.comment);
```

### Common Errors

#### Comment not found

Status: `404 Not Found`

```
{
  "error": "comment not found"
}
```

#### Trying to edit someone else's comment

Status: `403 Forbidden`

```
{
  "error": "you can only edit your own comments"
}
```

#### Invalid text

Status: `400 Bad Request`

```
{
  "error": "text is required"
}
```

or

```
{
  "error": "text must be <= 280 chars"
}
```

---

# Recommended Axios Pattern

A very common pattern for this lab is:

1. make the request with `await`
2. read the result from `response.data`
3. use `try/catch` for errors
4. show loading state while waiting

Example:

```
try {
  setLoading(true);
  setError("");

  const response = await axios.get("/feed", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  setPosts(response.data.posts);
} catch (err) {
  setError("Something went wrong");
  console.log(err);
} finally {
  setLoading(false);
}
```

---

# Summary of Endpoints

## Public

- `POST /login`

## Protected

- `GET /feed`
- `POST /posts`
- `PUT /posts/:id`
- `POST /posts/:id/comments`
- `PUT /comments/:id`

---

# Quick Reference

## Login

```
POST /login
body: { username }
```

## Get Feed

```
GET /feed
headers: Authorization: Bearer token
optional query params: authors=alex,sam
```

## Create Post

```
POST /posts
headers: Authorization: Bearer token
body: { text }
```

## Edit Post

```
PUT /posts/:id
headers: Authorization: Bearer token
body: { text }
```

## Create Comment

```
POST /posts/:id/comments
headers: Authorization: Bearer token
body: { text }
```

## Edit Comment

```
PUT /comments/:id
headers: Authorization: Bearer token
body: { text }
```
