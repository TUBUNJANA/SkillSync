const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadResume } = require("../controllers/resumeController");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("resume"), uploadResume);

module.exports = router;
