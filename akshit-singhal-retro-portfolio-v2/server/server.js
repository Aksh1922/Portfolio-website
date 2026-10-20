require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const contactRoutes = require("./routes/contactRoutes");
const cvRoutes = require("./routes/cvRoutes");

const app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    const allowed = (process.env.CLIENT_URL || "http://localhost:5173").split(",").map(v => v.trim());
    if (!origin || allowed.includes(origin)) return callback(null, true);
    return callback(new Error("Origin is not allowed by CORS"));
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json({ limit: "20kb" }));
app.use("/api/contact", rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: true, legacyHeaders: false }));
app.get("/health", (_req, res) => res.json({ status: "ok", service: "retro-portfolio-api" }));
app.use("/api/contact", contactRoutes);
app.use("/api/cv", cvRoutes);
app.use((req, res) => res.status(404).json({ success: false, message: "API route not found." }));
app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ success: false, message: err.message || "Unexpected server error." });
});

const port = Number(process.env.PORT) || 5000;
async function start() {
  if (process.env.MONGO_URI) {
    try { await mongoose.connect(process.env.MONGO_URI); console.log("MongoDB connected"); }
    catch (error) { console.error("MongoDB connection failed:", error.message); process.exit(1); }
  } else {
    console.warn("MONGO_URI is missing; contact submissions will return 503.");
  }
  app.listen(port, () => console.log(`API listening on ${port}`));
}
start();
