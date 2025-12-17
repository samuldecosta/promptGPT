const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image.controller');

/**
 * GET /api/v1/img/:hash
 * Redirects to the original image URL based on the hash
 */
router.get('/img/:hash', imageController.getImageRedirect);

module.exports = router;
