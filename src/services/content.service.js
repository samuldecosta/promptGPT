const axios = require('axios');
const crypto = require('crypto');

const VISTAPRINT_API_BASE_URL = 'https://gallery-content-query.cdn.vpsvc.com/api/v2';

// In-memory URL storage (for POC - use database in production)
const urlStore = new Map();

/**
 * Creates a short hash for a URL and stores it
 * @param {string} longUrl - The long URL to shorten
 * @returns {string} - A short hash
 */
function createShortHash(longUrl) {
  if (!longUrl) return '';
  
  // Check if we already have this URL
  for (const [hash, url] of urlStore.entries()) {
    if (url === longUrl) return hash;
  }
  
  // Create a short hash from the URL
  const hash = crypto.createHash('md5').update(longUrl).digest('hex').substring(0, 8);
  urlStore.set(hash, longUrl);
  
  return hash;
}

/**
 * Retrieves the original URL from a hash
 * @param {string} hash - The short hash
 * @returns {string|null} - The original URL or null
 */
function getOriginalUrl(hash) {
  return urlStore.get(hash) || null;
}

/**
 * Fetches content from Vistaprint Gallery API
 * @param {string} productID - The product ID
 * @param {string} requestor - The requestor identifier
 * @param {number} limit - The limit for results
 * @returns {Promise<Object>} - The raw API response
 */
async function fetchContentFromVistaprint(productID, requestor, limit) {
  try {
    const url = `${VISTAPRINT_API_BASE_URL}/Galleries/${productID}/Culture/en-us/Content`;
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json'
      },
      params: {
        requestor: requestor,
        limit: limit
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`Vistaprint API Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from Vistaprint API');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Request Error: ${error.message}`);
    }
  }
}

/**
 * Normalizes the Vistaprint API response to include only required fields
 * @param {Object} rawData - The raw API response
 * @param {string} baseUrl - Base URL for creating short URLs
 * @returns {Array} - Array of normalized content items
 */
function normalizeContentResponse(rawData, baseUrl = '') {
  const {results} = rawData;
  
  // Check if data exists and has the expected structure
  if (!results || !results.content || !Array.isArray(results.content)) {
    return [];
  }

  return results.content.map(item => {
    const originalUrl = item.previewUrls?.size1x || '';
    
    // Create a short hash for the URL
    const hash = createShortHash(originalUrl);
    
    // Create a short URL using our own endpoint
    const shortUrl = originalUrl && baseUrl 
      ? `${baseUrl}/api/v1/img/${hash}`
      : originalUrl;

    return {
      designId: item.designId || null,
      designConceptId: item.designConceptId || null,
      designConceptName: item.designConceptName || null,
      studioUrl: item.studioUrl || null,
      previewUrl: shortUrl,
      productOptions: item.productOptions || {}
    };
  });
}

/**
 * Main service function to fetch and normalize content
 * @param {string} productID - The product ID
 * @param {string} requestor - The requestor identifier
 * @param {number} limit - The limit for results
 * @param {string} baseUrl - Base URL for creating short URLs
 * @returns {Promise<Object>} - Normalized response
 */
async function getContent(productID, requestor, limit, baseUrl = '') {
  const rawData = await fetchContentFromVistaprint(productID, requestor, limit);
  const normalizedData = normalizeContentResponse(rawData, baseUrl);
  
  return {
    success: true,
    count: normalizedData.length,
    data: normalizedData
  };
}

module.exports = {
  getContent,
  fetchContentFromVistaprint,
  normalizeContentResponse,
  getOriginalUrl
};
