const Post = require("../models/Post");
const User = require("../models/User");
const Advisor = require("../models/Advisor");
const mongoose = require("mongoose");

/* ================= CREATE POST ================= */
exports.createPost = async (req, res) => {
  try {
    const { title, content, advisor } = req.body;

    let advisorId = null;

    if (req.user?.isAdmin && advisor) {
      advisorId = advisor;
    }

    if (!advisorId && req.user?.isAdvisor) {
      const userObjectId = new mongoose.Types.ObjectId(req.user.id);

      const advisorProfile = await Advisor.findOne({
        user: userObjectId,
        isActive: true
      }).select("_id");

      if (advisorProfile) {
        advisorId = advisorProfile._id;
      }
    }

    const newPost = new Post({
      title,
      content,
      author: req.user.id,
      advisor: advisorId
    });

    const savedPost = await newPost.save();

    const populatedPost = await Post.findById(savedPost._id)
      .populate("author", "username")
      .populate("advisor", "name slug avatarUrl");

    res.status(201).json(populatedPost);

  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};


/* ================= GET ALL POSTS ================= */
exports.getAllPosts = async (req, res) => {
  try {
    const searchRaw = req.query.search || "";
    const search = searchRaw.trim();

    if (!search) {
      const posts = await Post.find()
        .select("title author advisor views createdAt")
        .populate("author", "username")
        .populate("advisor", "name slug avatarUrl")
        .sort({ createdAt: -1 });

      return res.json(posts);
    }

    const regex = new RegExp(search, "i");

    const matchingUsers = await User.find({ username: regex }).select("_id");
    const userIds = matchingUsers.map((u) => u._id);

    const matchingAdvisors = await Advisor.find({ name: regex }).select("_id");
    const advisorIds = matchingAdvisors.map((a) => a._id);

    const posts = await Post.find({
      $or: [
        { title: regex },
        { author: { $in: userIds } },
        { advisor: { $in: advisorIds } }
      ]
    })
      .select("title author advisor views createdAt")
      .populate("author", "username")
      .populate("advisor", "name slug avatarUrl")
      .sort({ createdAt: -1 });

    return res.json(posts);

  } catch (error) {
    console.error("Get All Posts Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};


/* ================= GET SINGLE POST ================= */
exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username")
      .populate("advisor", "name slug avatarUrl bio specialties");

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.json(post);

  } catch (error) {
    console.error("Get Single Post Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};


/* ================= INCREMENT POST VIEWS ================= */
exports.incrementViews = async (req, res) => {
  try {

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate("author", "username")
      .populate("advisor", "name slug avatarUrl");

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.json(post);

  } catch (error) {
    console.error("Increment Views Error:", error);
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

    if (
      post.author.toString() !== req.user.id &&
      !req.user.isAdmin &&
      !req.user.isAdvisor
    ) {
      return res.status(403).json({ message: "Not authorized." });
    }

    post.title = req.body.title ?? post.title;
    post.content = req.body.content ?? post.content;

    if (req.user.isAdmin && req.body.advisor !== undefined) {
      post.advisor = req.body.advisor || null;
    }

    const updatedPost = await post.save();

    const populatedPost = await Post.findById(updatedPost._id)
      .populate("author", "username")
      .populate("advisor", "name slug avatarUrl");

    res.json(populatedPost);

  } catch (error) {
    console.error("Update Post Error:", error);
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

    if (
      post.author.toString() !== req.user.id &&
      !req.user.isAdmin &&
      !req.user.isAdvisor
    ) {
      return res.status(403).json({ message: "Not authorized." });
    }

    await post.deleteOne();

    res.json({ message: "Post deleted successfully." });

  } catch (error) {
    console.error("Delete Post Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};