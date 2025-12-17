const contentService = require('../services/content.service');

/**
 * Controller to handle image redirect requests
 */
async function getImageRedirect(req, res, next) {
  try {
    const { hash } = req.params;

    if (!hash) {
      return res.status(400).json({
        success: false,
        error: 'Missing image hash'
      });
    }

    // Get original URL from hash
    const originalUrl = contentService.getOriginalUrl(hash);

    if (!originalUrl) {
      return res.status(404).json({
        success: false,
        error: 'Image not found'
      });
    }

    // Redirect to original URL
    res.redirect(originalUrl);
  } catch (error) {
    console.error('Image Controller Error:', error.message);
    next(error);
  }
}

module.exports = {
  getImageRedirect
};
