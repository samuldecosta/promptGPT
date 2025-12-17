const express = require('express');
const router = express.Router();
const contentController = require('../controllers/content.controller');

/**
 * GET /api/v1/content
 * Query parameters:
 * - productID (required): The product ID
 * - requestor (required): The requestor identifier
 * - limit (optional): Maximum number of results (default: 10)
 */
router.get('/content', contentController.getContent);

module.exports = router;
