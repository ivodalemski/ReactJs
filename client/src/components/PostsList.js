import React from "react";
import Post from "./Post";

const PostsList = ({ posts, currentUser, deletePost }) => {
  const renderPosts = () => {
    return posts.map((post) => {
      return (
        <Post
          key={post._id}
          post={post}
          currentUser={currentUser}
          deletePost={deletePost}
        />
      );
    });
  };

  return (
    <div>
      <h1 className="mb-4">All Posts</h1>
      {renderPosts()}
    </div>
  );
};

export default PostsList;
