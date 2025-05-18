const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();
const { handleMatchUpload } = require('../controllers/matchController');

router.post('/match', upload.single('resume'), handleMatchUpload);

module.exports = router;
