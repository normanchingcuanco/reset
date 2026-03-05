const Advisor = require("../models/Advisor");
const Post = require("../models/Post");
const User = require("../models/User");

/* ================= CREATE ADVISOR (ADMIN) ================= */
exports.createAdvisor = async (req, res) => {
  try {
    const {
      userId,
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

    if (!name || !slug || !userId) {
      return res.status(400).json({
        message: "Name, slug, and userId are required."
      });
    }

    const exists = await Advisor.findOne({
      slug: slug.toLowerCase().trim()
    }).select("_id");

    if (exists) {
      return res.status(400).json({
        message: "Advisor slug already exists."
      });
    }

    const advisor = await Advisor.create({
      user: userId,
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

    if (advisor.isActive) {
      await User.findByIdAndUpdate(userId, {
        isAdvisor: true
      });
    }

    res.status(201).json(advisor);

  } catch (error) {
    console.error("Create Advisor Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};


/* ================= GET ALL ADVISORS ================= */
exports.getAllAdvisors = async (req, res) => {
  try {

    const isAdminView = req.query.admin === "true";

    const advisors = isAdminView
      ? await Advisor.find()
          .select("name slug title avatarUrl isActive createdAt")
          .sort({ createdAt: -1 })
      : await Advisor.find({ isActive: true })
          .select("name slug title avatarUrl specialties")
          .sort({ name: 1 });

    res.json(advisors);

  } catch (error) {
    console.error("Get Advisors Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};


/* ================= GET ADVISOR BY SLUG ================= */
exports.getAdvisorBySlug = async (req, res) => {
  try {

    const { slug } = req.params;

    const advisor = await Advisor.findOne({
      slug: slug.toLowerCase().trim()
    }).select(
      "name slug title bio specialties avatarUrl linkedinUrl websiteUrl isActive"
    );

    if (!advisor || !advisor.isActive) {
      return res.status(404).json({ message: "Advisor not found." });
    }

    res.json(advisor);

  } catch (error) {
    console.error("Get Advisor By Slug Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};


/* ================= GET ADVISOR POSTS ================= */
exports.getAdvisorPosts = async (req, res) => {
  try {

    const { slug } = req.params;

    const advisor = await Advisor.findOne({
      slug: slug.toLowerCase().trim(),
      isActive: true
    }).select("_id user");

    if (!advisor) {
      return res.status(404).json({ message: "Advisor not found." });
    }

    const posts = await Post.find({
      $or: [{ advisor: advisor._id }, { author: advisor.user }]
    })
      .select("title author advisor views createdAt")
      .populate("author", "username")
      .populate("advisor", "name slug avatarUrl")
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (error) {
    console.error("Get Advisor Posts Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};


/* ================= UPDATE ADVISOR ================= */
exports.updateAdvisor = async (req, res) => {
  try {

    const advisor = await Advisor.findById(req.params.id);

    if (!advisor) {
      return res.status(404).json({ message: "Advisor not found." });
    }

    advisor.name = req.body.name ?? advisor.name;
    advisor.slug = req.body.slug ?? advisor.slug;
    advisor.title = req.body.title ?? advisor.title;
    advisor.bio = req.body.bio ?? advisor.bio;
    advisor.specialties = req.body.specialties ?? advisor.specialties;
    advisor.avatarUrl = req.body.avatarUrl ?? advisor.avatarUrl;
    advisor.linkedinUrl = req.body.linkedinUrl ?? advisor.linkedinUrl;
    advisor.websiteUrl = req.body.websiteUrl ?? advisor.websiteUrl;

    if (typeof req.body.isActive === "boolean") {
      advisor.isActive = req.body.isActive;

      if (advisor.user) {
        await User.findByIdAndUpdate(advisor.user, {
          isAdvisor: req.body.isActive
        });
      }
    }

    const updated = await advisor.save();
    res.json(updated);

  } catch (error) {
    console.error("Update Advisor Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};


/* ================= DELETE ADVISOR ================= */
exports.deleteAdvisor = async (req, res) => {
  try {

    const advisor = await Advisor.findById(req.params.id);

    if (!advisor) {
      return res.status(404).json({ message: "Advisor not found." });
    }

    await advisor.deleteOne();

    res.json({ message: "Advisor deleted successfully." });

  } catch (error) {
    console.error("Delete Advisor Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};


/* ================= APPLY AS ADVISOR ================= */
exports.applyAdvisor = async (req, res) => {
  try {

    const {
      name,
      slug,
      title,
      bio,
      specialties,
      avatarUrl,
      linkedinUrl,
      websiteUrl
    } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        message: "Name and slug are required."
      });
    }

    const existingAdvisor = await Advisor.findOne({
      user: req.user.id
    }).select("_id");

    if (existingAdvisor) {
      return res.status(400).json({
        message: "You already have an advisor profile."
      });
    }

    const existingSlug = await Advisor.findOne({
      slug: slug.toLowerCase().trim()
    }).select("_id");

    if (existingSlug) {
      return res.status(400).json({
        message: "Slug already exists."
      });
    }

    const advisor = await Advisor.create({
      user: req.user.id,
      name: name.trim(),
      slug: slug.toLowerCase().trim(),
      title: title || "",
      bio: bio || "",
      specialties: Array.isArray(specialties) ? specialties : [],
      avatarUrl: avatarUrl || "",
      linkedinUrl: linkedinUrl || "",
      websiteUrl: websiteUrl || "",
      isActive: false
    });

    res.status(201).json({
      message: "Application submitted successfully.",
      advisor
    });

  } catch (error) {
    console.error("Apply Advisor Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};