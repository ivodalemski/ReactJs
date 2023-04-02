const express = require("express");
const router = express.Router();
const postController = require("./controllers/postController");
const userController = require("./controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const Post = require("../models/postModel");

// Public routes
router.post("/register", userController.register);
router.post("/login", userController.login);

// Private routes
router.post("/posts", postController.create);
router.get("/posts", postController.getAll);
router.get("/posts/:id", postController.getOne);
router.put("/posts/:id", postController.update);
router.delete("/posts/:id", postController.delete);

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this post." });
    }
    await post.remove();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
