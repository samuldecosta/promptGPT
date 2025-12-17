const contentService = require('../services/content.service');

/**
 * Controller to handle content API requests
 */
async function getContent(req, res, next) {
  try {
    // Extract parameters from query string
    const { productID, requestor, limit } = req.query;

    // Validate required parameters
    if (!productID) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameter: productID'
      });
    }

    if (!requestor) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameter: requestor'
      });
    }

    // Set default limit if not provided
    const contentLimit = limit ? parseInt(limit, 10) : 10;

    // Validate limit is a positive number
    if (isNaN(contentLimit) || contentLimit <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid limit parameter: must be a positive number'
      });
    }

    // Get base URL from request for short URLs
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Fetch and normalize content
    const result = await contentService.getContent(productID, requestor, contentLimit, baseUrl);

    // Return normalized response
    res.json(result);
  } catch (error) {
    console.error('Controller Error:', error.message);
    next(error);
  }
}

module.exports = {
  getContent
};
