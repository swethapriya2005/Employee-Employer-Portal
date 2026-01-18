const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");

const router = express.Router();

/* ===== MULTER ===== */
const storage = multer.diskStorage({
  destination: "uploads/resumes",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

/* ===== ATS CHECK ===== */
router.post("/check-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Resume file missing" });
    }

    const { jobTitle, jobDescription } = req.body;
    if (!jobTitle || !jobDescription) {
      return res.status(400).json({ error: "Job details missing" });
    }

    const buffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(buffer);

    const resumeText = pdfData.text.toLowerCase();

    const keywords = jobDescription
      .split(",")
      .map(k => k.trim().toLowerCase())
      .filter(Boolean);

    const matched = keywords.filter(k => resumeText.includes(k));
    const missing = keywords.filter(k => !resumeText.includes(k));

    const score = Math.round((matched.length / keywords.length) * 100);

    fs.unlinkSync(req.file.path); // delete pdf after use

    res.json({ score, matched, missing });

  } catch (err) {
    console.error("ATS ERROR:", err);
    res.status(500).json({ error: "Resume processing failed" });
  }
});

module.exports = router;
