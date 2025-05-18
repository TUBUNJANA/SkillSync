const fs = require("fs");
const pdfParse = require("pdf-parse");
const Resume = require("../models/Resume");
const { extractSkills } = require("../services/skillExtractor");

const uploadResume = async (req, res) => {
  try {
    const file = fs.readFileSync(req.file.path);
    const data = await pdfParse(file);
    const skills = extractSkills(data.text);

    const resume = new Resume({
      name: "Candidate",
      email: "test@example.com",
      skills,
    });

    await resume.save();

    res.status(200).json({ message: "Resume uploaded", skills });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Failed to process resume" });
  }
};

module.exports = { uploadResume };
