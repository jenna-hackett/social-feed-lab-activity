# Class Feed Lab Instructions

## Overview

In this lab, you will build the main API functionality for a simple **Class Feed** app using **Axios**.

The goal of this lab is to practice:

- making API calls with Axios
- sending request bodies
- sending authorization headers
- using bearer tokens
- handling loading state
- handling error state
- working with GET and POST requests
- organizing API calls into service files

---

# How to Find What You Need To Do

This project already has most of the structure set up for you.

To find the places where you need to write code:

## In VS Code

Open the global search tab and search for:

```
TODO
```

Shortcut:

- **Windows:** `Ctrl + Shift + F`
- **Mac:** `Cmd + Shift + F`

This will show you all the places in the project where work still needs to be done.

Each `TODO` comment explains what should be implemented in that spot.

---

# Suggested Order

You do **not** need to jump around randomly.

Follow this order so things build on each other properly.

## 1) Create the reusable Axios API instance

Start with the service file where the Axios instance should live.
You should create an Axios instance with the app’s base URL.

---

## 2) Create the API service functions

Next, go to the `classFeed` service file.

At minimum, create:

- `login`
- `getFeed`
- `createPost`
- `createComment`

If you have time, add the optional `authors` query parameter to `getFeed`.

---

## 3) Update the Auth Context

Next, go to `AuthContext` and handle the TODO in there.

---

## 4) Implement login

Now go to the login page and implement logging in. This app has no sign up, any username is accepted.

---

## 5) Implement loading the feed

Now go to the feed screen.

There are two TODOs here.

### A) Author filter input

This is for the optional author filtering feature and should be skipped until the basic functionality is complete.

The idea is that when the user types author names, the app should wait a short time before reloading the feed instead of making a request on every single keystroke.

### B) Load the feed

This is one of the main parts of the lab.

It should:

- make sure a token exists
- call the `getFeed` service function
- store the posts in state
- handle loading properly
- handle errors properly

---

## 6) Implement creating a post

Now go to the create post page and implement creating posts.

---

## 7) Implement creating comments

Finally, go to `PostCard` and implement creating comments.

---

# Recommended Completion Order (Short Version)

If you want the shortest version of the order, do this:

1. Axios API instance
2. API service functions
3. AuthContext default auth header
4. Login
5. Feed loading
6. Create post
7. Create comment
8. Author filter debounce

---

# General Tips

## Use your service functions

Don't write your Axios calls directly inside components.

The point of the lab is partly to practice organizing API logic into reusable service files.

## Read `response.data`

Axios responses usually store the useful response body inside:

```
response.data
```

## Use `try / catch / finally`

A very common pattern for this lab is:

- `try` -> make the request
- `catch` -> handle errors
- `finally` -> stop loading / submitting

## Check that the token exists

Before making protected requests, make sure the token is available.

## Show useful error messages

If the server returns an error, try to show something useful instead of just crashing or silently failing.

## Keep it simple

Do not overcomplicate this.  
The goal is just to get comfortable with the request/response flow.

---

# If You Finish Early

If you finish everything with time left, **call me over**.

I can then explain how to add:

- editing posts
- editing comments

That works very similarly to the create flows you already built, but uses different endpoints.

---

# Final Reminder

When you are unsure what to do next:

1. search for `TODO`
2. work through them in order
3. test each step as you go

Do not wait until the very end to test everything.

Build one piece at a time and make sure it works before moving on.

As always, call me over for help at any time if you have questions or need anything.
