require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

// NEW
const pageRoutes = require("./routes/pageRoutes");
const advisorRoutes = require("./routes/advisorRoutes");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(compression());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// NEW
app.use("/api/pages", pageRoutes);
app.use("/api/advisors", advisorRoutes);

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("RESET Blog API Running");
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});