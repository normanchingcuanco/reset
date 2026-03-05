const express = require("express");
const router = express.Router();

const advisorController = require("../controllers/advisorController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// Public
router.get("/", advisorController.getAllAdvisors);
router.get("/:slug", advisorController.getAdvisorBySlug);
router.get("/:slug/posts", advisorController.getAdvisorPosts);

// Public advisor application
router.post("/apply", verifyToken, advisorController.applyAdvisor);;

// Admin
router.post("/", verifyToken, verifyAdmin, advisorController.createAdvisor);
router.put("/:id", verifyToken, verifyAdmin, advisorController.updateAdvisor);
router.delete("/:id", verifyToken, verifyAdmin, advisorController.deleteAdvisor);

module.exports = router;