const Advisor = require("../models/Advisor");
const Post = require("../models/Post");

/* ================= CREATE ADVISOR (ADMIN) =================
   POST /api/advisors
*/
exports.createAdvisor = async (req, res) => {
  try {
    const {
      name,
      slug,
      title,
      bio,
      specialties,
      avatarUrl,
      linkedinUrl,
      websiteUrl,
      isActive
    } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: "Name and slug are required." });
    }

    const exists = await Advisor.findOne({ slug: slug.toLowerCase().trim() });
    if (exists) {
      return res.status(400).json({ message: "Advisor slug already exists." });
    }

    const advisor = await Advisor.create({
      name: name.trim(),
      slug: slug.toLowerCase().trim(),
      title: title || "",
      bio: bio || "",
      specialties: Array.isArray(specialties) ? specialties : [],
      avatarUrl: avatarUrl || "",
      linkedinUrl: linkedinUrl || "",
      websiteUrl: websiteUrl || "",
      isActive: typeof isActive === "boolean" ? isActive : true
    });

    res.status(201).json(advisor);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

/* ================= GET ALL ADVISORS (PUBLIC) =================
   GET /api/advisors
*/
exports.getAllAdvisors = async (req, res) => {
  try {
    const advisors = await Advisor.find({ isActive: true }).sort({ name: 1 });
    res.json(advisors);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

/* ================= GET ADVISOR BY SLUG (PUBLIC) =================
   GET /api/advisors/:slug
*/
exports.getAdvisorBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const advisor = await Advisor.findOne({ slug: slug.toLowerCase().trim() });
    if (!advisor || !advisor.isActive) {
      return res.status(404).json({ message: "Advisor not found." });
    }

    res.json(advisor);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

/* ================= UPDATE ADVISOR (ADMIN) =================
   PUT /api/advisors/:id
*/
exports.updateAdvisor = async (req, res) => {
  try {
    const updated = await Advisor.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updated) {
      return res.status(404).json({ message: "Advisor not found." });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

/* ================= DELETE ADVISOR (ADMIN) =================
   DELETE /api/advisors/:id
*/
exports.deleteAdvisor = async (req, res) => {
  try {
    const advisor = await Advisor.findById(req.params.id);
    if (!advisor) {
      return res.status(404).json({ message: "Advisor not found." });
    }

    await advisor.deleteOne();
    res.json({ message: "Advisor deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

/* ================= GET ADVISOR POSTS (PUBLIC) =================
   GET /api/advisors/:slug/posts
   NOTE: This assumes you’ll later tag posts with advisorId OR author mapping.
   For now, we’ll return posts authored by a user whose username matches advisor name (fallback),
   but best is to add advisor field to Post later.
*/
exports.getAdvisorPosts = async (req, res) => {
  try {
    const { slug } = req.params;

    const advisor = await Advisor.findOne({
      slug: slug.toLowerCase().trim(),
      isActive: true
    });

    if (!advisor) {
      return res.status(404).json({ message: "Advisor not found." });
    }

    const posts = await Post.find({ advisor: advisor._id })
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error("Get Advisor Posts Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};