const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { verifyToken } = require("../middleware/authMiddleware");

/* ================= PUBLIC ROUTES ================= */

// Get all posts (supports search)
router.get("/", postController.getAllPosts);

// Get single post
router.get("/:id", postController.getSinglePost);

// ✅ NEW: Increment post views
router.put("/:id/view", postController.incrementViews);

/* ================= PROTECTED ROUTES ================= */

// Create post
router.post("/", verifyToken, (req, res, next) => {
  if (!req.user.isAdmin && !req.user.isAdvisor) {
    return res.status(403).json({ message: "Only admins or advisors can create posts." });
  }
  next();
}, postController.createPost);

// Update post
router.put("/:id", verifyToken, postController.updatePost);

// Delete post
router.delete("/:id", verifyToken, postController.deletePost);

module.exports = router;