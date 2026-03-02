const Post = require("../models/Post");

/* ================= CREATE POST ================= */
exports.createPost = async (req, res) => {
  try {
    const { title, content, advisor } = req.body;

    const newPost = new Post({
      title,
      content,
      author: req.user.id,
      advisor: advisor || null
    });

    const savedPost = await newPost.save();

    const populatedPost = await Post.findById(savedPost._id)
      .populate("author", "username email")
      .populate("advisor");

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};


/* ================= GET ALL POSTS ================= */
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "username email")
            .sort({ createdAt: -1 });

        res.json(posts);

    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};


/* ================= GET SINGLE POST ================= */
exports.getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("author", "username email");

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        res.json(post);

    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};


/* ================= UPDATE POST ================= */
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Only author or admin can update
        if (post.author.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: "Not authorized." });
        }

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;

        const updatedPost = await post.save();
        res.json(updatedPost);

    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};


/* ================= DELETE POST ================= */
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Author OR Admin can delete
        if (post.author.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: "Not authorized." });
        }

        await post.deleteOne();

        res.json({ message: "Post deleted successfully." });

    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};