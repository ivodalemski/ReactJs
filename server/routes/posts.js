const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
require("dotenv").config();

// Create a new blog post
router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user._id,
      });

      await post.save();

      res.status(201).json(post);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Get all blog posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific blog post by ID
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a blog post by ID
router.put(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      if (post.author.toString() !== req.user._id.toString()) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      post.title = req.body.title;
      post.content = req.body.content;

      await post.save();

      res.json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Delete a blog post by ID
// @route     DELETE api/posts/:id
// @desc      Delete a post
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if the user is the author of the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});
