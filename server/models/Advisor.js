const mongoose = require("mongoose");

const advisorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    /* LINK ADVISOR TO USER ACCOUNT */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    title: { type: String, default: "", trim: true },
    bio: { type: String, default: "" },

    specialties: {
      type: [String],
      default: []
    },

    avatarUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    websiteUrl: { type: String, default: "" },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Advisor", advisorSchema);