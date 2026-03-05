const Post = require("../models/Post");
const User = require("../models/User");
const Advisor = require("../models/Advisor");
const mongoose = require("mongoose");

/* ================= CREATE POST ================= */
exports.createPost = async (req, res) => {
  try {
    const { title, content, advisor } = req.body;

    let advisorId = null;

    // Admin can publish as admin OR on behalf of an advisor
    if (req.user?.isAdmin && advisor) {
      advisorId = advisor; // advisor is an Advisor _id from dropdown
    }

    // Advisors publishing should automatically attach their advisor profile
    if (!advisorId && req.user?.isAdvisor) {
      const userObjectId = new mongoose.Types.ObjectId(req.user.id);

      const advisorProfile = await Advisor.findOne({
        user: userObjectId,
        isActive: true
      });

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
      .populate("author", "username email")
      .populate("advisor");

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};


/* ================= GET ALL POSTS (WITH SEARCH SUPPORT) =================
   GET /api/posts?search=
   Supports searching by:
   - title
   - author username
   - advisor name
*/
exports.getAllPosts = async (req, res) => {
  try {
    const searchRaw = req.query.search || "";
    const search = searchRaw.trim();

    // No search -> return all posts
    if (!search) {
      const posts = await Post.find()
        .populate({ path: "author", select: "username email" })
        .populate({ path: "advisor" })
        .sort({ createdAt: -1 });

      return res.json(posts);
    }

    const regex = new RegExp(search, "i");

    // 1) Find matching authors by username
    const matchingUsers = await User.find({ username: regex }).select("_id");
    const userIds = matchingUsers.map((u) => u._id);

    // 2) Find matching advisors by name
    const matchingAdvisors = await Advisor.find({ name: regex }).select("_id");
    const advisorIds = matchingAdvisors.map((a) => a._id);

    // 3) Find posts by title OR author OR advisor
    const posts = await Post.find({
      $or: [
        { title: regex },
        { author: { $in: userIds } },
        { advisor: { $in: advisorIds } }
      ]
    })
      .populate({ path: "author", select: "username email" })
      .populate({ path: "advisor" })
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
      .populate({
        path: "author",
        select: "username email"
      })
      .populate({
        path: "advisor"
      });

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
      .populate("author", "username email")
      .populate("advisor");

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

    // Only Author, Advisor, or Admin can update
    if (
      post.author.toString() !== req.user.id &&
      !req.user.isAdmin &&
      !req.user.isAdvisor
    ) {
      return res.status(403).json({ message: "Not authorized." });
    }

    // Update fields
    post.title = req.body.title ?? post.title;
    post.content = req.body.content ?? post.content;

    // Only Admin can change advisor assignment
    if (req.user.isAdmin && req.body.advisor !== undefined) {
      post.advisor = req.body.advisor || null;
    }

    const updatedPost = await post.save();

    const populatedPost = await Post.findById(updatedPost._id)
      .populate("author", "username email")
      .populate("advisor");

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

    // Only Author, Advisor, or Admin can delete
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