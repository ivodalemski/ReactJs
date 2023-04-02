// src/components/Post.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const Post = ({ post, token, user, setPosts }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.filter((prevPost) => prevPost._id !== post._id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `/api/posts/${post._id}`,
        {
          title: editedTitle,
          content: editedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setIsEditing(false);
        setPosts((prevPosts) =>
          prevPosts.map((prevPost) => {
            if (prevPost._id === post._id) {
              return {
                ...prevPost,
                title: editedTitle,
                content: editedContent,
              };
            } else {
              return prevPost;
            }
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="post">
      {!isEditing ? (
        <>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>By {post.author.username}</p>
          {user && user._id === post.author._id && (
            <div className="post-buttons">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </>
      ) : (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="post-buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
