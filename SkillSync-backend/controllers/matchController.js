const fs = require('fs');
const pdfParse = require('pdf-parse');
const { getMatchResult } = require('../services/matchService');

const handleMatchUpload = async (req, res) => {
    console.log('Received request to handle match upload');
    const resumeFile = req.file;             // PDF resume file (single file)
    const jobText = req.body.job;           // Job description as plain text

    if (!resumeFile || !jobText) {
        return res.status(400).json({
            success: false,
            message: 'Resume PDF and job description text are required.',
        });
    }

    try {
        // Extract text from the resume PDF
        const resumeBuffer = fs.readFileSync(resumeFile.path);
        const resumeText = (await pdfParse(resumeBuffer)).text;

        // Call Python gRPC service with resume and job description text
        const result = await getMatchResult(resumeText, jobText);

        res.json({
            success: true,
            similarity: result.similarity,
            missing_skills: result.missing_skills,
            course_recommendations: result.course_recommendations,
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to extract resume or call matching service.',
        });
    }
};

module.exports = { handleMatchUpload };
